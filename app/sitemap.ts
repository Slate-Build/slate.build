import type { MetadataRoute } from 'next'
import { projects } from '@/content/studio'

const SITE_URL = 'https://slate.studio'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...projects.map((project) => ({
      url: `${SITE_URL}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
