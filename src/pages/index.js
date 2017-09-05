import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import glamorous from 'glamorous'
import { Container, Row, Col } from 'glamorous-grid'
import { Motion, spring } from 'react-motion'

import Delay from 'utils/Delay'

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
  backgroundImage: 'linear-gradient(to bottom right, #3f51b5, #2196f3)',
  // background: gradients[Math.floor(Math.random() * gradients.length)],
  '&:before, &:after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    // min-height: 100vh,
    animationIterationCount: 'infinite',
  },
  '&:before': {
    backgroundImage: 'linear-gradient(to bottom right, #2196f3, #03a9f4)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    animationName: opacity,
    animationDuration: '12s'
  },
  '&:after': {
    zIndex: -1,
    backgroundImage: 'linear-gradient(to bottom right, #03a9f4, #303f9f)',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    animationName: opacity2,
    animationDuration: '12s',
  }
})

const Card = glamorous.div({
  position: 'relative',
  background: 'white',
  borderRadius: '3px',
  padding: '24px',
  boxShadow: '0 8px 16px 0 rgba(25, 29, 34, 0.1)',
  border: '1px solid #eee'
})

const AnimatedCard = ({ children }) => (
  <Delay initial={1} value={0} period={300}>
    {delayed => (
      <Motion
        defaultStyle={{ top: 30, opacity: 0 }}
        style={{
          top: spring(delayed * 30),
          opacity: spring(delayed === 1 ? 0 : 1)
        }}
      >
        {style => (
          <Card
            style={{
              top: style.top,
              opacity: style.opacity
            }}
          >
            {children}
          </Card>
        )}
      </Motion>
    )}
  </Delay>
)

const IndexPage = () =>
  <Index>
    <div className="container">
      <div style={{ paddingTop: '48px' }}>
        <Row justifyContent="center">
          <Col span={{ xs: 1, sm: 9/12, md: 8/12, lg: 6/12, xl: 5/12 }}>
            <AnimatedCard>
              <h3 style={{ marginBottom: 12 }}>Hey, I'm Dylan</h3>
              <h6 style={{ marginBottom: 12 }}>Software Engineer @ <a href="https://www.classy.org">classy.org</a></h6>
              <h6><a href="mailto:dylan.mozlowski@gmail.com">dylan.mozlowski@gmail.com</a></h6>
              <p>Check out the following demos:</p>
              <ul>
                <li><Link to="/trello">Trello Line Graph</Link></li>
              </ul>
            </AnimatedCard>
          </Col>
        </Row>
      </div>
    </div>
  </Index>

export default IndexPage
