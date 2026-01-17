import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

/**
 * Dynamic sitemap source for blog posts
 * Provides automatic discovery and indexing of blog content for search engines
 *
 * @module server/api/__sitemap__/blog
 * @see FR-017 Sitemap generation
 * @see US1 Search Engine Discovery
 */

export default defineSitemapEventHandler(async event => {
  // Query all blog posts from content directory
  const posts = await queryCollection(event, 'blog').all()

  // Filter out draft content
  const publishedPosts = posts.filter(
    (post: any) => !post.path?.includes('/_draft') && !post.stem?.includes('_draft')
  )

  return publishedPosts.map((post: any) => {
    // Build alternatives from sameAs
    const alternatives = []
    if (post.lang) {
      alternatives.push({
        lang: post.lang,
        href: post.path,
      })
    }
    if (post.sameAs) {
      post.sameAs.forEach((altPath: string) => {
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
      loc: post.path,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.8,
      alternatives: alternatives.length > 0 ? alternatives : undefined,
    })
  })
})
