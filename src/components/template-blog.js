import React from "react"
import { graphql } from "gatsby"

import Layout from "./layout"
import SEO from "./seo"

const TemplateBlog = ({ data }) => {
  return (
    <Layout>
      <SEO title="Blog Post" />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </Layout>
  )
  //   return <pre>{JSON.stringify(data, undefined, 4)}</pre>
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

export default TemplateBlog
