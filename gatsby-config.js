module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-glamor',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-105846113-1',
      },
    }
  ],
}
