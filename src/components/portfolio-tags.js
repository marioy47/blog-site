import React from "react"
import AWS from "../images/svg/aws-brands.svg"
import Cloud from "../images/svg/cloud-upload-alt-solid.svg"
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
  let keyCounter = 0;
  if (tags.length === 0) {
    return ""
  }
  var icons = tags.split(",").map(tag => {
    switch (tag.trim().toLowerCase()) {
      case "aws":
        return <AWS key={keyCounter++}/>
      case "cloud":
        return <Cloud  key={keyCounter++}/>
      case "database":
      case "db":
        return <DatabaseIcon  key={keyCounter++}/>
      case "figma":
        return <FigmaIcon  key={keyCounter++}/>
      case "bitbucket":
      case "github":
        return <GithubIcon  key={keyCounter++}/>
      case "javascript":
      case "js":
        return <JavascriptIcon  key={keyCounter++}/>
      case "jquery":
        return <JqueryIcon  key={keyCounter++}/>
      case "php":
        return <PhpIcon  key={keyCounter++}/>
      case "wordpress":
        return <WordpresIcon  key={keyCounter++}/>
      case "sass":
        return <SassIcon  key={keyCounter++}/>
      case "email":
      case "mailchimp":
        return <EnvelopeIcon  key={keyCounter++}/>
      case "node":
        return <NodeIcon  key={keyCounter++}/>
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
