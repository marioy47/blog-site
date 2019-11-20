import React from "react"
import { graphql, Link } from "gatsby"

import SiteLayout from "./site-layout"
import SEO from "./seo"

const TemplateProject = ({ data }) => {
  return (
    <SiteLayout>
      <SEO title={data.title} />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <div className="back-link">
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
