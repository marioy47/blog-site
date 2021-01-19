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
      <div className="blog-meta">
        <div className="date">{data.markdownRemark.frontmatter.date}</div>
        <div className="author">Read Time: {data.markdownRemark.timeToRead} mins</div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </SiteLayout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      id
      excerpt
      timeToRead
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
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
