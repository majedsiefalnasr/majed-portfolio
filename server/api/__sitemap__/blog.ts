import {asSitemapUrl, defineSitemapEventHandler} from '#imports'

/**
 * Dynamic sitemap source for blog posts
 * Provides automatic discovery and indexing of blog content for search engines
 *
 * @module server/api/__sitemap__/blog
 * @see FR-017 Sitemap generation
 * @see US1 Search Engine Discovery
 */

export default defineSitemapEventHandler(async () => {
  // Query all blog posts from content directory using queryContent
  const posts = await queryContent('blog')
    .where({_path: {$regex: /^\/blog\/.+/}})
    .only(['_path', 'date', 'lang'])
    .find()

  return posts.map((post: any) => {
    return asSitemapUrl({
      loc: post._path,
      lastmod: post.date,
      changefreq: 'monthly',
      priority: 0.8,
      // Add alternate language versions if available
      alternatives: post.lang
        ? [
            {
              lang: post.lang,
              href: post._path,
            },
          ]
        : undefined,
    })
  })
})
