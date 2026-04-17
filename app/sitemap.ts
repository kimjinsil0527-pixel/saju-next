import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://mingyun.app'
  const now = new Date()

  const staticPages = [
    { url: base, priority: 1.0, changeFrequency: 'daily' as const },
    { url: `${base}/today`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${base}/fortune`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/lucky`, priority: 0.9, changeFrequency: 'daily' as const },
    { url: `${base}/love-hub`, priority: 0.9, changeFrequency: 'weekly' as const },
    { url: `${base}/tarot`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/compatibility`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/dream`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/horoscope`, priority: 0.8, changeFrequency: 'weekly' as const },
    { url: `${base}/calendar`, priority: 0.7, changeFrequency: 'weekly' as const },
    { url: `${base}/year-ahead`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/credits`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/counseling`, priority: 0.7, changeFrequency: 'monthly' as const },
    { url: `${base}/partner`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/support`, priority: 0.5, changeFrequency: 'monthly' as const },
    { url: `${base}/privacy`, priority: 0.3, changeFrequency: 'yearly' as const },
    { url: `${base}/terms`, priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const loveSlugs = [
    'crush', 'new-couple', 'dating', 'relationship-dive', 'conflict',
    'long-distance', 'age-gap', 'office-romance', 'love-language', 'soulmate',
    'when-love', 'marriage-timing', 'wedding-date', 'twin-flame', 'past-life-love',
    'family-approval', 'breakup', 'ex-return', 'move-on', 'closure',
    'full-compat', 'loyalty', 'love-triangle', 'friend-to-love', 'biz-partner',
  ]

  const lovePages = loveSlugs.map(slug => ({
    url: `${base}/love-hub/${slug}`,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticPages, ...lovePages].map(p => ({
    ...p,
    lastModified: now,
  }))
}
