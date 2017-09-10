import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import glamorous from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import { Motion, spring } from 'react-motion'

import Delay from 'utils/Delay'
import TrelloGraph from './trello/TrelloGraph'

const opacity = css.keyframes({
  '0%': { opacity: 0 },
  '33%': { opacity: 0 },
  '66%': { opacity: 1 },
  '100%': { opacity: 0 }
}).toString()

const opacity2 = css.keyframes({
  '0%': { opacity: 0 },
  '33%': { opacity: 1 },
  '66%': { opacity: 0 },
  '100%': { opacity: 0 }
}).toString()

const Index = glamorous.div({
  position: 'relative',
  zIndex: 1,
  width: '100%',
  background: 'rgb(246, 247, 251)'
})

const Card = glamorous.div({
  position: 'relative',
  height: '100%',
  background: 'white',
  borderRadius: '3px',
  padding: '24px',
  boxShadow: '0 2px 4px 0 rgba(25, 29, 34, 0.1)',
  border: '1px solid #eee',
  '& p, & p:hover, & p:active, & p:visited': {
    textDecoration: 'none !important',
    color: '#222'
  }
})

const AnimatedCard = ({ children, style, ...others }) => (
  <Delay initial={1} value={0} period={300}>
    {delayed => (
      <Motion
        defaultStyle={{ top: 30, opacity: 0 }}
        style={{
          top: spring(delayed * 30),
          opacity: spring(delayed === 1 ? 0 : 1)
        }}
      >
        {interpolatedStyle => (
          <Card
            style={{
              top: interpolatedStyle.top,
              opacity: interpolatedStyle.opacity,
              ...style
            }}
            {...others}
          >
            {children}
          </Card>
        )}
      </Motion>
    )}
  </Delay>
)

class ClickableCard extends React.Component {
  state = { hover: false, x: 0, y: 0, magnitude: 0, maxMagnitude: 0 }

  setCardRef = (ref) => {
    this.card = ref
  }

  mouseMove = (event) => {
    const { top, left, width, height } = this.card.getBoundingClientRect()

    const xFromOrigin = event.clientX - left - (width / 2)
    const yFromOrigin = event.clientY - top - (height / 2)

    const largest = Math.max(width, height)
    const heightWeight = largest / height
    const widthWeight = largest / width

    const xOriginWeighted = xFromOrigin * widthWeight
    const yOriginWeighted = yFromOrigin * heightWeight

    const widthWeighted = width * widthWeight
    const heightWeighted = height * heightWeight

    const magnitude = Math.sqrt((xOriginWeighted * xOriginWeighted) + (yOriginWeighted * yOriginWeighted))
    const maxMagnitude = Math.sqrt(((widthWeighted * widthWeighted) / 4) + ((heightWeighted * heightWeighted) / 4))

    this.setState({
      x: xFromOrigin,
      y: yFromOrigin,
      magnitude,
      maxMagnitude
    })
  }

  mouseEnter = (event) => {
    this.setState({ hover: true })
  }

  mouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { hover, x, y, magnitude, maxMagnitude } = this.state
    const { children, to, href } = this.props

    const LinkComponent = href ? 'a' : Link
    const linkProps = { [href ? 'href': 'to']: href || to }

    return (
      <Motion
        defaultStyle={{ scale: 1, shadow: 1, rotate: 0, x: 0, y: 0 }}
        style={{
          scale: spring(hover ? 1.05 : 1),
          shadow: spring(hover ? 16 : 1),
          rotate: spring(hover ? 1 : 0, { stiffness: 100, damping: 26 }),
          x: spring(x, { stiffness: 100, damping: 26 }),
          y: spring(y, { stiffness: 100, damping: 26 })
        }}
      >
        {({ scale, shadow, rotate, x, y }) => (
          <LinkComponent {...linkProps} style={{ textDecoration: 'none' }}>
            <AnimatedCard
              innerRef={this.setCardRef}
              style={{
                transformOrigin: '50% 50%',
                cursor: 'pointer',
                boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                transform: `scale(${scale}) perspective(200px) rotate3d(${y}, ${-x}, 0, ${rotate * (magnitude / maxMagnitude)}deg)`
              }}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
              onMouseMove={this.mouseMove}
            >
              {children}
            </AnimatedCard>
          </LinkComponent>
        )}
      </Motion>
    )
  }
}

const PseudoLink = glamorous.div({
  color: '#1EAEDB',
  textDecoration: 'underline'
})

const TitleCard = glamorous(AnimatedCard)({
  color: 'white',
  backgroundImage: 'linear-gradient(45deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%)',

  '& a': {
    color: 'white'
  }
})

const IndexPage = () =>
  <Index>
    <Container py={36}>
      <Row justifyContent="center">
        <Col span={{ xs: 1, sm: 9/12, md: 8/12, lg: 6/12, xl: 5/12 }}>
          <TitleCard>
            <h3 style={{ marginBottom: 12 }}>Hey, I'm Dylan</h3>
            <h6 style={{ marginBottom: 12 }}>Software Engineer @ <a href="https://www.classy.org">classy.org</a></h6>
            <h6 style={{ marginBottom: 0 }}>
              <a href="mailto:dylan.mozlowski@gmail.com">dylan.mozlowski@gmail.com</a>
            </h6>
          </TitleCard>

        </Col>
      </Row>
      <Row justifyContent="center">
        <Col span={{ xs: 1, md: 10/12 }}>
          <Row alignItems="stretch">
            <Col span={{ xs: 1, md: 1/2 }} pt={24}>
              <ClickableCard to="/trello">
                <PseudoLink><h5>Trello Line Graph</h5></PseudoLink>
                <TrelloGraph />
              </ClickableCard>
            </Col>
            <Col span={{ xs: 1, md: 1/2 }} pt={24}>
              <ClickableCard href="https://dylanmoz.github.io/glamorous-grid">
                <PseudoLink><h5>glamorous-grid</h5></PseudoLink>
                <p>Responsive React grid layout components, built with glamorous</p>
              </ClickableCard>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </Index>

export default IndexPage
