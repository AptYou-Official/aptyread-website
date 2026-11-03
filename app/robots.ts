import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const privatePaths = ['/admin$', '/admin/', '/api$', '/api/']
  return {
    rules: [
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: 'OAI-AdsBot',
        allow: '/',
        disallow: privatePaths,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: privatePaths,
      },
    ],
    sitemap: 'https://www.aptyread.ai/sitemap.xml',
  }
}


