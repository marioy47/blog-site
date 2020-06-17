import { Link } from "gatsby"
import React from "react"
import SEO from "./seo"
import SiteLayout from "./site-layout"

const TemplateProject = ({ data }) => {
  return (
    <SiteLayout className="template-project project-node">
      <SEO title={`${data.markdownRemark.frontmatter.title}`} />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <div className="back-link" style={{ marginTop: "2rem" }}>
        <Link to="/portfolio">Back to Portfolio</Link>
      </div>
    </SiteLayout>
  )
}

export default TemplateProject
