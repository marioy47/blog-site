import { graphql } from "gatsby"
import Img from "gatsby-image"
import React from "react"
import ContactForm from "../components/contact-formspree"
import SiteLayout from "../components/site-layout"
import SocialNetworks from "../components/social-networks"

const AboutPage = ({ data }) => {
  return (
    <SiteLayout className="page-about">
      <div className="row">
        <div className="col-md-7">
          <h1>Hola, Soy Mario</h1>
          <p>
            I’m an Electric Engineer turned Software Developer that is addicted
            to technology news, and that hates to do the same thing twice.
          </p>
          <p>For more than 20 years I’ve worked in several areas of IT:</p>
          <ul>
            <li>Web Master</li>
            <li>Linux and Solaris server Management</li>
            <li>Oracle DBA</li>
            <li>PL/SQL Developer</li>
            <li>Backend Developer</li>
            <li>Front End Developer</li>
            <li>UX Lead</li>
            <li>Scrum Master</li>
            <li>Product Owner</li>
          </ul>
          <div className="text-center">
            <a
              href="https://docs.google.com/document/d/1lP4DPa3Pztid-yCrT8chuKTm_6SRp0Lo7PTq_dmfKI0/export?format=pdf"
              className="btn btn-lg btn-primary"
            >
              Download my Rèsumè
            </a>
          </div>
        </div>
        <div className="col-md-5 align-self-center pt-5">
          <Img
            fluid={data.file.childImageSharp.fluid}
            className="rounded-circle"
          />
          <div className="mt-5 text-center">
            <SocialNetworks style={{justifyContent: 'space-evenly'}}/>
          </div>
        </div>
      </div>
      <div className="text-center pt-5 pb-5"></div>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h2 className="text-center" id="need-help">
            Need help with a project?{" "}
          </h2>
          <h4 className="text-center">Lets talk</h4>
          <ContactForm />
        </div>
      </div>
      <div className="row text-center mt-5">
        <div className="col-md-12">
          <h2>About this site</h2>
          <p>
            This site was created using{" "}
            <a href="https://www.gatsbyjs.org/">Gatsby JS</a>
          </p>
        </div>
      </div>
    </SiteLayout>
  )
}

export const query = graphql`
  {
    file(base: { eq: "img-mario-lado.jpg" }) {
      absolutePath
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`

export default AboutPage
