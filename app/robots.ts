import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/dashboard', '/checkout'],
      },
    ],
    sitemap: 'https://mingyun.app/sitemap.xml',
  }
}
