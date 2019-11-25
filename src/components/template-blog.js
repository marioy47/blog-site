import React from "react"
import { graphql } from "gatsby"

import SiteLayout from "./site-layout"
import SEO from "./seo"

const TemplateBlog = ({ data }) => {
  return (
    <SiteLayout className="template-blog blog-node">
      <SEO title="Blog Post" />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </SiteLayout>
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
