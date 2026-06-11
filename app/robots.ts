import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/api/',
          '/auth/',
          '/dashboard',
          '/checkout',
          '/signin',
          '/signup',
          '/forgot-password',
          '/reset-password',
          '/credits',
          '/counseling',
        ],
      },
    ],
    sitemap: 'https://sajuunmyung.com/sitemap.xml',
  }
}
