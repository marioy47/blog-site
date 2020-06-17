import React from "react"
import SEO from "../components/seo"
import SiteLayout from "../components/site-layout"

const NotFoundPage = () => (
  <SiteLayout>
    <SEO title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </SiteLayout>
)

export default NotFoundPage
