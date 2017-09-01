import React from 'react'
import Link from 'gatsby-link'
import { css } from 'glamor'
import glamorous from 'glamorous'

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
  // color: 'white'
  // backgroundImage: 'linear-gradient(#f0f0ec, #f0f0ec), linear-gradient(#f0f0ec, #f0f0ec)',
  background: 'white',
  borderRadius: '3px',
  padding: '24px',
  boxShadow: '0 8px 16px 0 rgba(25, 29, 34, 0.1)',
  border: '1px solid #eee'
})

const IndexPage = () =>
  <Index>
    <div className="container">
      <div style={{ paddingTop: '48px' }}>
        <div className="row">
          <div className="three columns"></div>
          <div className="six columns">
            <Card>
              <h4>Welcome</h4>
              <p>I'm Dylan. Here's my <a href="https://www.github.com/dylanmoz">github</a> and <a href="mailto:dylan.mozlowski@gmail.com">email</a>. Check out the following demos:</p>
              <ul>
                <li><Link to="/trello">Trello Line Graph</Link></li>
              </ul>
            </Card>
          </div>
          <div className="three columns"></div>
        </div>
      </div>
    </div>
  </Index>

export default IndexPage
