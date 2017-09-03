import React from 'react'
import glamorous from 'glamorous'
import moize from 'moize'
import { Line, LinePath, Bar } from '@vx/shape'
import { Group } from '@vx/group'
import { curveBasis, curveCatmullRom, curveMonotoneX } from '@vx/curve'
import { withParentSize } from '@vx/responsive'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { GridRows } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { localPoint } from '@vx/event'
import { Motion, spring, presets } from 'react-motion'
import { extent, max, bisector } from 'd3-array'
import shallowEqual from 'fbjs/lib/shallowEqual'

import Delay from 'utils/Delay'
import findPathYatX from 'utils/findPathYAtX'

// memoizing components improves performance from 30fps to 50+fps on 5x throttled cpu
const GridRowsMem = moize.reactSimple(GridRows)
const GroupMem = moize.reactSimple(Group)
const LinePathMem = moize.reactSimple(LinePath)
const AxisLeftMem = moize.reactSimple(AxisLeft)
const AxisBottomMem = moize.reactSimple(AxisBottom)

const bisectDate = bisector(d => new Date(d.date)).left

const colors = ['rgb(107, 157, 255)', 'rgb(252, 137, 159)']

const data = [
  { date: new Date(2017, 3, 1), value: 1 },
  { date: new Date(2017, 4, 1), value: 2 },
  { date: new Date(2017, 5, 1), value: 6 },
  { date: new Date(2017, 6, 1), value: 3 },
  { date: new Date(2017, 7, 1), value: 1 },
  { date: new Date(2017, 8, 1), value: 5 },
]

const data2 = [
  { date: new Date(2017, 3, 1), value: 4 },
  { date: new Date(2017, 4, 1), value: 4 },
  { date: new Date(2017, 5, 1), value: 0 },
  { date: new Date(2017, 6, 1), value: 1.5 },
  { date: new Date(2017, 7, 1), value: 2 },
  { date: new Date(2017, 8, 1), value: 1 },
]

const series = [data, data2]
const allData = series.reduce((acc, arr) => acc.concat(arr), [])

const Container = glamorous('div', { shouldClassNameUpdate: () => false })({
  backgroundColor: 'white'
})

const Tooltip = glamorous('div', { shouldClassNameUpdate: () => false })({
  position: 'absolute',
  backgroundColor: 'white',
  color: 'rgba(25, 29, 34, 0.54)',
  padding: 12,
  fontSize: 14,
  boxShadow: '0 4px 8px 0 rgba(25, 29, 34, 0.1)',
  pointerEvents: 'none',
  borderRadius: 3,
  border: '1px solid rgba(25, 29, 34, 0.12)'
})

const aspectRatio = 0.5
const margin = { top: 10, left: 15, bottom: 30, right: 35 }

const axisLeftTickLabel = (
  <text
    fill="rgb(25, 29, 34)"
    opacity="0.20"
    fontSize={10}
    dy="0.25em"
    textAnchor="middle"
    fontWeight="bold"
  />
)

const axisBottomTickLabel = (
  <text
    fill="rgb(25, 29, 34)"
    opacity="0.20"
    fontSize={10}
    dy="0.25em"
    textAnchor="middle"
    fontWeight="bold"
  />
)

class TrelloGraph extends React.Component {
  state = {
    tooltipOpen: false,
    tooltipLeft: 0,
    tooltipTop: 0,
    tooltipData: null,
    vertLineLeft: 0
  }

  tooltipWidth = 0

  pathRefs = {}

  componentWillMount() {
    this.update()
  }

  componentWillReceiveProps(nextProps) {
    if (!shallowEqual(this.props, nextProps)) {
      console.log('yuh')
      this.update(nextProps)
    }
  }

  update(props = this.props) {
    this.xMax = this.getXMax(props)
    this.yMax = this.getYMax(props)

    this.xScale = this.getXScale(allData, this.x, this.xMax)
    this.yScale = this.getYScale(allData, this.y, this.yMax)

    this.yScaleFormat = this.yScale.tickFormat(3, "0")
  }

  x = d => d.date
  y = d => d.value

  setSvgRef = (ref) => {
    this.svg = ref
  }

  setTooltipRef = (ref) => {
    this.tooltip = ref
    this.tooltipWidth = ref.getBoundingClientRect().width
  }

  setPathRef = (ref) => {
    this.pathRefs[ref.getAttribute('data-index')] = ref
  }

  mouseLeave = event => {
    this.setState({
      tooltipOpen: false
    })
  }

  mouseMove = event => {
    const { x, y } = localPoint(this.svg, event);
    this.tooltipWidth = this.tooltip.getBoundingClientRect().width

    const dataPoints = [data, data2].map((d) => {
      const xDomain = this.xScale.invert(x - margin.left)

      const index = bisectDate(d, xDomain, 1)

      const dLeft = d[index - 1]
      const dRight = d[index]

      const isRightCloser = xDomain - (new Date(dLeft.date)) > (new Date(dRight.date)) - xDomain

      return isRightCloser ? dRight : dLeft
    })

    const xMax = this.getXMax()
    const positionX = x - margin.left
    const positionY = y - margin.top

    const xOffset = 18
    const yOffset = 18

    const positionXWithOffset = positionX + xOffset
    const pastRightSide = positionXWithOffset + this.tooltipWidth > xMax
    const tooltipLeft = pastRightSide ? positionX - this.tooltipWidth - xOffset : positionXWithOffset

    const tooltipTop = positionY - yOffset

    this.setState({
      tooltipOpen: true,
      tooltipData: dataPoints,
      tooltipLeft,
      tooltipTop,
      vertLineLeft: this.xScale(new Date(dataPoints[0].date))
    })
  }

  getXMax(props = this.props) {
    return props.parentWidth - margin.left - margin.right
  }

  getYMax(props = this.props) {
    return (props.parentWidth * aspectRatio) - margin.top - margin.bottom
  }

  getXScale = moize.simple((data, x, xMax) => {
    return scaleTime({
      domain: extent(data, x),
      range: [0, xMax]
    })
  })

  getYScale = moize.simple((data, y, yMax) => {
    return scaleLinear({
      domain: [0, max(data, y)],
      range: [yMax, 0]
    })
  })

  getPathYFromX = (index, x) => {
    // const key = `${index}-${x}`
    const path = this.pathRefs[index]

    return findPathYatX(x, path, index)
  }

  render() {
    const {
      parentWidth,
      parentHeight
    } = this.props

    const {
      tooltipOpen,
      tooltipLeft,
      tooltipData,
      tooltipTop,
      vertLineLeft
    } = this.state

    const width = parentWidth
    const height = parentWidth * aspectRatio

    return (
      <div style={{ position: 'relative' }}>
        <svg width={width} height={height} ref={this.setSvgRef}>
          <rect x={0} y={0} width={width} height={height} fill="white" />
          <GridRowsMem
            top={margin.top}
            left={margin.left}
            scale={this.yScale}
            numTicks={3}
            width={this.xMax}
          />
          <GroupMem top={margin.top} left={margin.left}>
            <Motion
              defaultStyle={{ left: 0, opacity: 0 }}
              style={{ left: spring(vertLineLeft || 0), opacity: spring(tooltipOpen ? .12 : 0) }}
            >
              {style => (
                <Line
                  from={{ x: style.left, y: 0 }}
                  to={{ x: style.left, y: this.yMax }}
                  stroke="rgb(25, 29, 34)"
                  opacity={style.opacity}
                />
              )}
            </Motion>
            {series.map((seriesData, i) => (
              <LinePathMem
                key={i}
                data-index={i}
                data={seriesData}
                xScale={this.xScale}
                yScale={this.yScale}
                x={this.x}
                y={this.y}
                curve={curveBasis}
                stroke={colors[i]}
                strokeLinecap="round"
                innerRef={this.setPathRef}
              />
            ))}
            <Motion
              defaultStyle={{ opacity: 0, x: vertLineLeft }}
              style={{
                opacity: spring(tooltipOpen ? 1 : 0),
                x: spring(vertLineLeft)
              }}
            >
              {style => tooltipData && (
                <g>
                  {tooltipData.map((d, i) => {
                    const y = this.getPathYFromX(i, style.x)

                    return (
                      <g key={i}>
                        <circle
                          cx={style.x}
                          cy={y}
                          r={12}
                          fill={colors[i]}
                          stroke={colors[i]}
                          strokeWidth=".6"
                          fillOpacity={style.opacity / 12}
                          strokeOpacity={style.opacity / 2}
                        />
                        <circle
                          cx={style.x}
                          cy={y}
                          r={4}
                          fill="white"
                          stroke={colors[i]}
                          strokeWidth="1.5"
                          fillOpacity={style.opacity}
                          strokeOpacity={style.opacity}
                        />
                      </g>
                    )
                  })}
                </g>
              )}
            </Motion>
            <rect
              x="0"
              y="0"
              width={this.xMax}
              height={this.yMax}
              fill="transparent"
              onMouseLeave={this.mouseLeave}
              onMouseMove={this.mouseMove}
            />
            <Delay initial={0} value={this.xMax} period={300}>
              {delayed => (
                <Motion defaultStyle={{ x: 0 }} style={{ x: spring(delayed) }}>
                  {style => (
                    <rect
                      x={style.x}
                      y="0"
                      width={Math.max(this.xMax - style.x, 0)}
                      height={this.yMax}
                      fill="white"
                    />
                  )}
                </Motion>
              )}
            </Delay>
          </GroupMem>
          <AxisLeftMem
            top={margin.top}
            left={margin.left}
            scale={this.yScale}
            hideTicks
            hideAxisLine
            numTicks={3}
            stroke="#eaf0f6"
            tickLabelComponent={axisLeftTickLabel}
            tickFormat={this.yScaleFormat}
          />
          <AxisBottomMem
            top={height - margin.bottom}
            left={margin.left}
            scale={this.xScale}
            hideTicks
            stroke="#eaf0f6"
            tickLabelComponent={axisBottomTickLabel}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            top: margin.top,
            left: margin.left,
            width: this.xMax,
            height: this.yMax,
            pointerEvents: 'none'
          }}>
          <Motion
            defaultStyle={{ left: tooltipLeft || 0, top: tooltipTop || 0, opacity: 0 }}
            style={{
              left: spring(tooltipLeft || 0),
              top: spring(tooltipTop || 0),
              opacity: spring(tooltipOpen ? 1 : 0)
            }}
          >
            {style => (
              <Tooltip
                innerRef={this.setTooltipRef}
                style={{
                  top: style.top,
                  left: style.left,
                  opacity: style.opacity
                }}
              >
                <div>
                  <strong>
                    {tooltipData && new Date(tooltipData[0].date).toLocaleDateString()}
                  </strong>
                  {tooltipData && tooltipData.map((d, i) => (
                    <div key={i}>
                      <span
                        style={{
                          display: 'inline-block',
                          borderRadius: '50%',
                          width: 8,
                          height: 8,
                          marginRight: 6,
                          backgroundColor: colors[i]
                        }}
                      />
                      {d.value}
                    </div>
                  ))}
                </div>
              </Tooltip>
            )}
          </Motion>
        </div>
      </div>
    )
  }
}

export default withParentSize(TrelloGraph)
