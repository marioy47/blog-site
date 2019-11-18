import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const PortfolioPage = ({ data }) => {
  let count = 0
  return (
    <Layout className="portfolio">
      <SEO title="Projects ans Success Stories" />
      <h1>This are some of the projects that I’ve worked on</h1>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <article key={count++}>
            <aside>
              <Img
                fluid={node.frontmatter.cover.childImageSharp.fluid}
                alt={node.frontmatter.title}
              />
            </aside>
            <main>
              <h2 className="title">{node.frontmatter.title}</h2>
              <div className="summary">Summary</div>
              <div className="tags">{node.frontmatter.tags}</div>
              <div className="read-more">
                <Link to={node.fields.slug}>Read More</Link>
              </div>
            </main>
          </article>
        )
      })}
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/src/projects/.*.md/" } }
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
            cover {
              childImageSharp {
                fluid(maxWidth: 500, maxHeight: 400, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`

export default PortfolioPage
