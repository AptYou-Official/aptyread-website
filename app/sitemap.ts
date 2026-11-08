import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aptyread.ai'
  const parentPagesUpdated = new Date('2026-11-03T00:00:00.000Z')
  const programPagesUpdated = new Date('2026-11-08T00:00:00.000Z')
  const guideUpdated = new Date('2026-11-03T00:00:00.000Z')
  const schoolsUpdated = new Date('2026-09-16T00:00:00.000Z')
  const releaseCopyUpdated = new Date('2026-11-05T00:00:00.000Z')
  const deleteAccountUpdated = new Date('2026-10-28T00:00:00.000Z')
  
  return [
    {
      url: baseUrl,
      lastModified: programPagesUpdated,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/download`,
      lastModified: programPagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/reading-guide`,
      lastModified: programPagesUpdated,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reading-guide/the-aptyread-path`,
      lastModified: programPagesUpdated,
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
      lastModified: programPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: programPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/schools`,
      lastModified: schoolsUpdated,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: parentPagesUpdated,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: releaseCopyUpdated,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: releaseCopyUpdated,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/delete-account`,
      lastModified: deleteAccountUpdated,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
