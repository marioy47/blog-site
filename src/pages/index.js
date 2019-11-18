import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div className="wrapper">
      <div className="left">
        <h2>Hello,</h2>
        <h1>I'm Mario</h1>
        <h3>I’m a Full Stack Developer from Medellín - Colombia</h3>
      </div>
      <div className="right">
        <Img fluid={data.file.childImageSharp.fluid} alt="Mario Yepes B/W" />
      </div>
    </div>
  </Layout>
)

export const query = graphql`
  {
    file(relativePath: { in: ["images/img-mario-bw.png"] }) {
      childImageSharp {
        fluid(maxWidth: 300) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default IndexPage
