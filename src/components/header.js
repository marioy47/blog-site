import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import IcondDeveloperRound from "../images/svg/icon-developer-round.svg"

const Header = ({ siteTitle }) => (
  <header className="site-header">
    <div className="wrapper">
      <nav>
        <h1 className="site-title">
          <Link to="/">
            <IcondDeveloperRound />
          </Link>
        </h1>
        <ul className="main-menu">
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/blog">Blog</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
