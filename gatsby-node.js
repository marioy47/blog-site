const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({ node, getNode, basePath: `pages` })
    actions.createNodeField({
      node: node,
      name: "slug",
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const template = path.resolve(__dirname, "src/components/template-blog.js")
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              title
              date
            }
            fields {
              slug
            }
            fileAbsolutePath
            excerpt
          }
        }
      }
    }
  `)
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    console.log("@@@@@@@@@@@@@@@ Slug", node.fields.slug)
    actions.createPage({
      path: node.fields.slug,
      component: template,
      context: {
        slug: node.fields.slug,
        id: node.id,
      },
    })
  })
}
