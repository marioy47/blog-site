import React from "react"
import { graphql, Link } from "gatsby"
import Img from "gatsby-image"
import SiteLayout from "../components/site-layout"
import SEO from "../components/seo"
import PortfolioTags from "../components/portfolio-tags"

const PortfolioPage = ({ data }) => {
  console.log(data)
  let count = 0
  return (
    <SiteLayout className="page-portfolio">
      <SEO title="Projects and Success Stories" />
      <h1 className="text-center">Portfolio</h1>
      <h4 className="text-center mb-5">
        This are some of the projects that I’ve worked on
      </h4>
      {data.allMarkdownRemark.edges.map(({ node }) => {
        return (
          <article key={count++} className="row">
            <aside className="col-md-5">
              <Img
                fluid={node.frontmatter.cover.childImageSharp.fluid}
                alt={node.frontmatter.title}
              />
            </aside>
            <main className="col-md-7">
              <h3>{node.frontmatter.title}</h3>
              <div className="client"><strong>Client:</strong> {node.frontmatter.client}</div>
              <div className="summary">{node.frontmatter.summary}</div>
              <div className="tags">
                <PortfolioTags tags={node.frontmatter.tags} />
              </div>
              <div className="read-more">
                <Link to={node.fields.slug}>Read More</Link>
              </div>
            </main>
          </article>
        )
      })}
    </SiteLayout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/projects/.*.md/" } }
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
            summary
            client
            cover {
              childImageSharp {
                fluid(maxHeight: 400) {
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
