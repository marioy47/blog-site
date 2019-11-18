import React from "react"
import { Link } from "gatsby"

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="wrapper">
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
