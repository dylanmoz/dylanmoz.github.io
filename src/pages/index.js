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
  background: 'rgb(246, 247, 251)',
  // backgroundImage: 'linear-gradient(to bottom right, #3f51b5, #2196f3)',
  // '&:before, &:after': {
  //   content: '""',
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   animationIterationCount: 'infinite',
  // },
  // '&:before': {
  //   backgroundImage: 'linear-gradient(to bottom right, #2196f3, #03a9f4)',
  //   backgroundPosition: 'center center',
  //   backgroundRepeat: 'no-repeat',
  //   animationName: opacity,
  //   animationDuration: '12s'
  // },
  // '&:after': {
  //   zIndex: -1,
  //   backgroundImage: 'linear-gradient(to bottom right, #03a9f4, #303f9f)',
  //   backgroundPosition: 'center center',
  //   backgroundRepeat: 'no-repeat',
  //   animationName: opacity2,
  //   animationDuration: '12s',
  // }
})

const Card = glamorous.div({
  position: 'relative',
  background: 'white',
  borderRadius: '3px',
  padding: '24px',
  boxShadow: '0 2px 4px 0 rgba(25, 29, 34, 0.1)',
  border: '1px solid #eee'
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
  state = { hover: false }

  mouseEnter = () => {
    this.setState({ hover: true })
  }

  mouseLeave = () => {
    this.setState({ hover: false })
  }

  render() {
    const { hover } = this.state
    const { children, to } = this.props

    return (
      <Motion
        defaultStyle={{ scale: 1, shadow: 1 }}
        style={{
          scale: spring(hover ? 1.05 : 1),
          shadow: spring(hover ? 16 : 1)
        }}
      >
        {({ scale, shadow, rotate }) => (
          <Link to={to}>
            <AnimatedCard
              style={{
                cursor: 'pointer',
                boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                transform: `scale(${scale})`
              }}
              onMouseEnter={this.mouseEnter}
              onMouseLeave={this.mouseLeave}
            >
              {children}
            </AnimatedCard>
          </Link>
        )}
      </Motion>
    )
  }
}

const IndexPage = () =>
  <Index>
    <Container py={36}>
      <Row justifyContent="center">
        <Col span={{ xs: 1, sm: 9/12, md: 8/12, lg: 6/12, xl: 5/12 }}>
          <AnimatedCard>
            <h3 style={{ marginBottom: 12 }}>Hey, I'm Dylan</h3>
            <h6 style={{ marginBottom: 12 }}>Software Engineer @ <a href="https://www.classy.org">classy.org</a></h6>
            <h6><a href="mailto:dylan.mozlowski@gmail.com">dylan.mozlowski@gmail.com</a></h6>
          </AnimatedCard>
        </Col>
      </Row>
      <Row justifyContent="center" mt={24}>
        <Col span={{ xs: 1, sm: 9/12, md: 8/12, lg: 6/12, xl: 5/12 }}>
          <ClickableCard to="/trello">
            <h5>Trello Line Graph</h5>
            <TrelloGraph />
          </ClickableCard>
        </Col>
      </Row>
    </Container>
  </Index>

export default IndexPage
