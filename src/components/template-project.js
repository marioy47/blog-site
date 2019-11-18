import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

const TemplateProject = ({ data }) => {
  return (
    <Layout>
      <SEO title={data.title} />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
      <div className="back-link">
        <Link to="/portfolio">Back to Portfolio</Link>
      </div>
    </Layout>
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