import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import SiteFooter from "./site-footer"
import SiteHeader from "./site-header"
import "../styles/layout.scss"

const SiteLayout = ({ children, className = "" }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className={className}>
      <SiteHeader siteTitle={data.site.siteMetadata.title} />
      <div className="site-inner container">{children}</div>
      <SiteFooter />
    </div>
  )
}

SiteLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default SiteLayout
