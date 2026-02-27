/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://bhupendranath.com.np',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/404'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
