import React from "react"
import SocialNetworks from "./social-networks"

const Footer = () => {
  return (
    <footer className="site-footer container">
      <div className="row">
        <div className="col-sm-7">
          <div className="copyright text-sm-center">
            © {new Date().getFullYear()}, Mario Andrés Yepes
          </div>
        </div>
        <nav className="col-sm-5">
          <SocialNetworks />
        </nav>
      </div>
    </footer>
  )
}

export default Footer
