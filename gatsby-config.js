module.exports = {
  siteMetadata: {
    title: `Mario Yepes Personal Blog`,
    description: `Hello, I'm Mario. A full stack developer from Medellín, Colombia. This is my blog and my portfolio!`,
    author: `@marioy47`,
    keywords: `blog, web development, gatsby, jamstack,aws developer, flutter developer`,
    url: `https://marioyepes.com`,
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
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    `gatsby-plugin-offline`,
    `gatsby-plugin-sass`,
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Fira Sans:300,500,700"],
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
            resolve: `gatsby-remark-prismjs`,
            options: {
              // showLineNumbers: true,
              noInlineHighlight: true,
              aliases: {
                zsh: "bash",
              },
            },
          },
        ],
      },
    },
    // {
    //   resolve: `gatsby-plugin-mdx`,
    //   options: {
    //     defaultLayouts: {
    //       default: require.resolve("./src/components/site-layout.js"),
    //     },
    //   },
    // },
  ],
}
