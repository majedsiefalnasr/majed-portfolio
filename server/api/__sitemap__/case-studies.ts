import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

/**
 * Dynamic sitemap source for case studies
 * Provides automatic discovery and indexing of case study content for search engines
 *
 * @module server/api/__sitemap__/case-studies
 * @see FR-017 Sitemap generation
 * @see US1 Search Engine Discovery
 */

export default defineSitemapEventHandler(async event => {
  // Query all case studies from content directory
  const caseStudies = await queryCollection(event, 'caseStudies').all()

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
