import { Link } from "gatsby"
import React from "react"
import CopyrightSvg from "../images/svg/copyright-solid.svg"
import EnvelopeSvg from "../images/svg/envelope-regular.svg"
import GithubSvg from "../images/svg/github-brands.svg"
import LinkedinSvg from "../images/svg/linkedin-brands.svg"
import TwitterSvg from "../images/svg/twitter-brands.svg"
import CodersRankSvg from "../images/svg/coders-rank.svg"

const Footer = () => {
  return (
    <footer className="site-footer container">
      <div className="row">
        <div className="col-sm-3">
          <div className="copyright">
            © {new Date().getFullYear()}, Mario Andrés Yepes
          </div>
        </div>
        <nav className="col-sm-9">
          <ul className="footer-menu">
            <li>
              <a
                href="https://twitter.com/marioy47"
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterSvg />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/marioyepes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinSvg />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/marioy47/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubSvg />
              </a>
            </li>
            <li>
              <a
                href="https://profile.codersrank.io/user/marioy47"
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodersRankSvg />
              </a>
            </li>
            <li>
              <Link to="/about#need-help">
                <EnvelopeSvg />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
