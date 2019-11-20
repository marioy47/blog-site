import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import SiteLayout from "../components/site-layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => (
  <SiteLayout className="page-index">
    <SEO title="Home" />
    <div className="row">
      <div className="col-sm-6 left">
        <h2 className="text-md-right">Hello,</h2>
        <h1 className="text-md-right">I'm Mario</h1>
        <h3 className="text-md-right">
          I’m a Full Stack Developer from Medellín - Colombia
        </h3>
      </div>
      <div className="col-sm-6 right">
        <Img fluid={data.file.childImageSharp.fluid} alt="Mario Yepes B/W" />
      </div>
    </div>
  </SiteLayout>
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
