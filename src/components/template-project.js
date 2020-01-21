import React from "react"
import { graphql, Link } from "gatsby"

import SiteLayout from "./site-layout"
import SEO from "./seo"

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

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      fields {
        slug
      }
      id
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default TemplateProject
