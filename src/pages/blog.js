import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPage = ({ data }) => (
  <Layout>
    <SEO title="Mario's Blog" />
    <h1>Mario's Blog</h1>
    {data.allMarkdownRemark.edges.map(({ node }) => {
      return (
        <article>
          <header>
            <h2>{node.frontmatter.title}</h2>
          </header>
          <aside>
            <time>{node.frontmatter.date}</time>
            <div className="read-more">
              <Link to={node.fields.slug}>Read More</Link>
            </div>
          </aside>
        </article>
      )
    })}
    {/* <pre>{JSON.stringify(data, undefined, 4)}</pre> */}
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/posts/.*.md/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date
            title
            tags
          }
        }
      }
    }
  }
`

export default BlogPage
