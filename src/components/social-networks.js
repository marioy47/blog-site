import { Link } from "gatsby"
import React from "react"
import EnvelopeSvg from "../images/svg/envelope-regular.svg"
import GithubSvg from "../images/svg/github-brands.svg"
import LinkedinSvg from "../images/svg/linkedin-brands.svg"
import TwitterSvg from "../images/svg/twitter-brands.svg"
import CodersRankSvg from "../images/svg/coders-rank.svg"

const SocialNetworks = ({style={}}) => {
  return (
    <ul className="social-networks" style={style}>
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
  )
}

export default SocialNetworks
