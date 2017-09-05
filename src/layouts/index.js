import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { Container, Row, Col } from 'glamorous-grid'
import Github from 'react-icons/lib/go/mark-github'
import Twitter from 'react-icons/lib/ti/social-twitter'

import 'css/normalize.css'
import 'css/skeleton.css'
import 'css/main.css'

const Header = () =>
  <nav className="navbar">
    <Container>
      <Row justifyContent="between">
        <Col>
          <Link className="navbar-link" to="/">Home</Link>
        </Col>
        <Col textAlign="right">
          <div style={{ fontSize: 16, lineHeight: '6.5rem', color: '#222' }}>
            <a href="https://github.com/dylanmoz">
              <Github style={{ marginRight: 12, color: '#171515' }} />
            </a>
            <a href="https://twitter.com/dylan_mozlowski">
              <Twitter style={{ color: '#1DA1F3' }}/>
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  </nav>

const TemplateWrapper = ({ children }) =>
  <div>
    <Helmet
      title="Dylan Mozlowski's personal site"
    />

    <Header />

    <div style={{ marginTop: '6.5rem', width: '100%', display: 'flex', position: 'relative' }}>
      {children()}
    </div>
  </div>

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
