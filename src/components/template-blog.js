import { graphql } from "gatsby"
import React from "react"
import SEO from "./seo"
import SiteLayout from "./site-layout"

const TemplateBlog = ({ data }) => {
  let image = null
  if (data.markdownRemark.frontmatter.cover) {
    image = data.markdownRemark.frontmatter.cover.childImageSharp.fixed.src
  }
  const title = data.markdownRemark.frontmatter.title || ""
  const description = data.markdownRemark.excerpt
    .replace(new RegExp(title, "i"), "")
    .trim()

  return (
    <SiteLayout className="template-blog blog-node">
      <SEO
        title={`${title}`}
        image={`${image}`}
        description={`${description}`}
      />
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </SiteLayout>
  )
  //   return <pre>{JSON.stringify(data, undefined, 4)}</pre>
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      excerpt
      fields {
        slug
      }
      frontmatter {
        title
        cover {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
            fixed {
              src
              width
              height
            }
          }
        }
      }
    }
  }
`

export default TemplateBlog
