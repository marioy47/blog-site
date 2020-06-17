import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import IconDeveloper from "../images/svg/icon-developer.svg"

const Header = ({ siteTitle }) => (
  <header className="site-header container">
    <div className="row">
      <div className="col-3">
        <h1 className="site-title">
          <Link to="/" alt={siteTitle}>
            <IconDeveloper />
          </Link>
        </h1>
      </div>
      <nav className="col-9">
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
