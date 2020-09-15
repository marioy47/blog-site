import React from "react"
import SocialNetworks from "./social-networks"
import ChevronUp from "../images/svg/chevron-up-solid.svg"

const Footer = () => {
  const windowScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    window.setTimeout(() => {
      location.hash = ""
    }, 700)
  }
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
      <a
        className="scroll-to-top"
        onClick={windowScroll}
        style={{ cursor: "pointer" }}
      >
        <ChevronUp />
      </a>
    </footer>
  )
}

export default Footer
