import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aptyread.ai'
  const contentUpdated = new Date('2026-09-16T00:00:00.000Z')
  const guideUpdated = new Date('2026-09-16T00:00:00.000Z')
  const legalUpdated = new Date('2026-09-10T00:00:00.000Z')
  
  return [
    {
      url: baseUrl,
      lastModified: contentUpdated,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: contentUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reading-guide`,
      lastModified: guideUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/the-aptyread-path`,
      lastModified: guideUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/child-knows-alphabet-but-cant-read`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/how-to-teach-child-to-blend-sounds`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/how-to-teach-letter-sounds`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/knows-letter-sounds-but-cant-read-words`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/how-to-help-child-who-struggles-with-reading`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/reading-problems/child-reads-words-but-struggles-with-sentences`,
      lastModified: guideUpdated,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: contentUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: contentUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: contentUpdated,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: contentUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: legalUpdated,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: legalUpdated,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/delete-account`,
      lastModified: legalUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
