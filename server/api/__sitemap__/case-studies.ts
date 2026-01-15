import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

/**
 * Dynamic sitemap source for case studies
 * Provides automatic discovery and indexing of portfolio case studies for search engines
 *
 * @module server/api/__sitemap__/case-studies
 * @see FR-017 Sitemap generation
 * @see US1 Search Engine Discovery
 */

export default defineSitemapEventHandler(async () => {
  // Query all case studies from content directory using queryContent
  const caseStudies = await queryContent('case-studies')
    .where({_path: {$regex: /^\/case-studies\/.+/}})
    .only(['_path', 'date', 'lang'])
    .find()

  return caseStudies.map((caseStudy: any) => {
    return asSitemapUrl({
      loc: caseStudy._path,
      lastmod: caseStudy.date,
      changefreq: 'yearly',
      priority: 0.9,
      // Add alternate language versions if available
      alternatives: caseStudy.lang
        ? [
            {
              lang: caseStudy.lang,
              href: caseStudy._path,
            },
          ]
        : undefined,
    })
  })
})
