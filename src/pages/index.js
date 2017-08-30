import React from 'react'
import Link from 'gatsby-link'

const IndexPage = () =>
  <div style={{ marginTop: '15% '}}>
    <div className="row">
      <div className="six columns">
        <h4>Welcome</h4>
        <p>I'm Dylan. Here's my <a href="https://www.github.com/dylanmoz">github</a> and <a href="mailto:dylan.mozlowski@gmail.com">email</a>. Check out the following demos:</p>
      </div>
    </div>
    <div className="row">
      <div className="one columns">&nbsp;</div>
      <div className="six columns">
      <ul>
        <li>Item 1</li>
        <li>
          Item 2
          <ul>
            <li>Item 2.1</li>
            <li>Item 2.2</li>
          </ul>
        </li>
        <li>Item 3</li>
      </ul>
      </div>
    </div>
  </div>

export default IndexPage
