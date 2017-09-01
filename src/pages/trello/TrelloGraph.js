import React from 'react'
import glamorous from 'glamorous'
import { LinePath } from '@vx/shape'
import { Group } from '@vx/group'
import { curveBasis } from '@vx/curve'
import { withParentSize } from '@vx/responsive'
import { AxisBottom, AxisLeft } from '@vx/axis'
import { GridRows } from '@vx/grid'
import { scaleTime, scaleLinear } from '@vx/scale'
import { extent, max } from 'd3-array'

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

const Container = glamorous.div({
  backgroundColor: 'white'
})

const aspectRatio = 0.5
const margin = { top: 10, left: 15, bottom: 30, right: 50 }

class TrelloGraph extends React.Component {

  render() {
    const { parentWidth, parentHeight } = this.props

    const width = parentWidth
    const height = parentWidth * aspectRatio

    const xMax = width - margin.left - margin.right
    const yMax = height - margin.top - margin.bottom

    const xScale = scaleTime({
      domain: extent(data, d => d.date),
      range: [0, xMax]
    })

    const yScale = scaleLinear({
      domain: [0, max(data, d => d.value)],
      range: [yMax, 0]
    })

    return (
      <svg width={width} height={height}>
        <rect x={0} y={0} width={width} height={height} fill="white" />
        <GridRows
          top={margin.top}
          left={margin.left}
          scale={yScale}
          numTicks={3}
          width={width - margin.left - margin.right}
        />
        <Group top={margin.top} left={margin.left}>
          <LinePath
            data={data}
            xScale={xScale}
            yScale={yScale}
            x={d => d.date}
            y={d => d.value}
            curve={curveBasis}
            stroke="rgb(107, 157, 255)"
            strokeLinecap="round"
          />
          <LinePath
            data={data2}
            xScale={xScale}
            yScale={yScale}
            x={d => d.date}
            y={d => d.value}
            curve={curveBasis}
            stroke="rgb(252, 137, 159)"
            strokeLinecap="round"
          />
        </Group>
        <AxisLeft
          top={margin.top}
          left={margin.left}
          scale={yScale}
          hideTicks
          hideAxisLine
          numTicks={3}
          stroke="#eaf0f6"
          tickLabelComponent={
            <text fill="rgb(25, 29, 34)" opacity="0.20" fontSize={10} dy="0.25em" textAnchor="middle" fontWeight="bold" />
          }
          tickFormat={yScale.tickFormat(3, "0")}
        />
        <AxisBottom
          top={height - margin.bottom}
          left={margin.left}
          scale={xScale}
          hideTicks
          stroke="#eaf0f6"
          tickLabelComponent={
            <text fill="rgb(25, 29, 34)" opacity="0.20" fontSize={10} dy="0.25em" textAnchor="middle" fontWeight="bold" />
          }
        />
      </svg>
    )
  }
}

export default withParentSize(TrelloGraph)
