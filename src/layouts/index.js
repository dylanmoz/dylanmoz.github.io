import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import './index.css'

const NavbarLink = props =>
  <li className="navbar-item">
    <Link className="navbar-link" {...props} />
  </li>
const Header = () =>
  <nav className="navbar">
    <div className="container">
      <ul className="navbar-list">
        <NavbarLink to="/">Home</NavbarLink>
        {/* <NavbarLink to="/">Home</NavbarLink> */}
      </ul>
    </div>
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
