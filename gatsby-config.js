module.exports = {
  siteMetadata: {
    title: `Mario Yepes Personal Blog`,
    description: `Hello, I'm Mario. A full stack developer from Medellín, Colombia. This is my blog and my portfolio!`,
    author: `@marioy47`,
    keywords: `blog, web development, gatsby, jamstack,aws developer, flutter developer`,
    siteUrl: `https://marioyepes.com`,
    image: `images/icon-developer.png`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Mario's Personal Portfolio and Blog`,
        short_name: `Mario's Blog `,
        start_url: `/`,
        background_color: `#2962ff`,
        theme_color: `#2962ff`,
        display: `minimal-ui`,
        icon: `src/images/icon-developer.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts`,
        ignore: [`**/\.*`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/projects`,
        ignore: [`**/\.*`],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: `Fira Sans`,
              variants: ["300", "500", "700"],
            },
          ],
        },
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images\/svg\/.*svg$/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1040,
              linkImagesToOriginal: false,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "TOC",
              fromHeading: 2,
              toHeading: 2,
              className: `table-of-contents`,
              tight: true,
            },
          },
          {
            resolve: `gatsby-remark-external-links`,
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // showLineNumbers: true,
              noInlineHighlight: true,
              aliases: {
                zsh: "bash",
              },
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-plugin-feed`,
            options: {
              feeds: [
                {
                  title: `Mario's Blog`,
                  match: `^/blog/`,
                  query: `
                    {
                      allMarkdownRemark(
                        sort: { order: DESC, fields: [frontmatter___date] }
                        filter: { frontmatter: { date: { ne: null } } }
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
                  `,
                }, // feed blogs
              ]
            }
          }
        ],
      },
    }, // gatsby-transformer-remark
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-robots-txt`,
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: `GTM-TCFF38M`,
        includeInDevelopment: true,
      },
    },
  ],
}
