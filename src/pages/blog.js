import {graphql, Link} from "gatsby";
import Img from 'gatsby-image';
import React from "react";
import SEO from "../components/seo";
import SiteLayout from "../components/site-layout";

const BlogPage = ({data}) => (
  <SiteLayout className="page-blog">
    <SEO title="Mario's Blog" />
    <h1 className="text-center">Mario&apos;s Blog</h1>
    {data.allMarkdownRemark.edges.map(({node}) => {
      return (
        <article className="row" key={node.fields.slug}>
          <aside className="col-sm-1">
            {node.frontmatter.cover?.childImageSharp?.fluid &&
              <Img
                fluid={node.frontmatter.cover.childImageSharp.fluid}
                alt={node.frontmatter.title}
              />
            }
          </aside>
          <header className="col-sm-8">
            <h4>{node.frontmatter.title}</h4>
          </header>
          <aside className="col-sm-3">
            <time>{node.frontmatter.date}</time>
            <div className="read-more">
              <Link to={node.fields.slug}>Read More</Link>
            </div>
          </aside>
        </article>
      )
    })}
  </SiteLayout>
)

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/posts/.*.md/" } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM Do, YYYY")
            title
            tags
            cover {
              childImageSharp {
                fluid(maxHeight: 100, maxWidth: 100) {
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

export default BlogPage
