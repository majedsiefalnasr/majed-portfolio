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

  // Filter out draft content
  const publishedCaseStudies = caseStudies.filter(
    (caseStudy: any) => !caseStudy.path?.includes('/_draft') && !caseStudy.stem?.includes('_draft')
  )

  return publishedCaseStudies.map((caseStudy: any) => {
    // Build alternatives from sameAs
    const alternatives = []
    if (caseStudy.lang) {
      alternatives.push({
        lang: caseStudy.lang,
        href: caseStudy.path,
      })
    }
    if (caseStudy.sameAs) {
      caseStudy.sameAs.forEach((altPath: string) => {
        if (altPath.includes('/ar/')) {
          alternatives.push({
            lang: 'ar',
            href: altPath,
          })
        } else {
          alternatives.push({
            lang: 'en',
            href: altPath,
          })
        }
      })
    }

    return asSitemapUrl({
      loc: caseStudy.path,
      lastmod: caseStudy.date,
      changefreq: 'yearly',
      priority: 0.9,
      alternatives: alternatives.length > 0 ? alternatives : undefined,
    })
  })
})
