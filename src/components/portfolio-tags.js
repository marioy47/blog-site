import React from "react"

import DatabaseIcon from "../images/svg/database-solid.svg"
import EnvelopeIcon from "../images/svg/envelope-regular.svg"
import FigmaIcon from "../images/svg/figma-brands.svg"
import GithubIcon from "../images/svg/github-brands.svg"
import JqueryIcon from "../images/svg/jquery.svg"
import JavascriptIcon from "../images/svg/js-square-brands.svg"
import NodeIcon from "../images/svg/node-js-brands.svg"
import PhpIcon from "../images/svg/php-brands.svg"
import SassIcon from "../images/svg/sass-brands.svg"
import WordpresIcon from "../images/svg/wordpress-brands.svg"

const PortfolioTags = ({ tags }) => {
  if (tags.length === 0) {
    return ""
  }
  var icons = tags.split(",").map(tag => {
    switch (tag.trim().toLowerCase()) {
      case "database":
      case "db":
        return <DatabaseIcon />
      case "figma":
        return <FigmaIcon />
      case "bitbucket":
      case "github":
        return <GithubIcon />
      case "javascript":
      case "js":
        return <JavascriptIcon />
      case "jquery":
        return <JqueryIcon />
      case "php":
        return <PhpIcon />
      case "wordpress":
        return <WordpresIcon />
      case "sass":
        return <SassIcon />
      case "email":
      case "mailchimp":
        return <EnvelopeIcon />
      case "node":
        return <NodeIcon />
      default:
        return ""
    }
  })
  return (
    <>
      <h5>Technologies Used:</h5> {icons}
    </>
  )
}

export default PortfolioTags
