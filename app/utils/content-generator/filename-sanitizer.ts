/**
 * Filename Sanitizer Utilities
 *
 * Utilities for generating SEO-friendly slugs and resolving file paths
 * for blog posts and case studies.
 */

/**
 * Generate SEO-friendly slug from title
 *
 * Rules:
 * - Convert to lowercase
 * - Replace spaces with hyphens
 * - Remove special characters
 * - Collapse multiple hyphens
 * - Trim leading/trailing hyphens
 *
 * @param title - Content title
 * @returns URL-safe slug
 *
 * @example
 * generateSlug('Building Type-Safe APIs with TypeScript')
 * // Returns: 'building-type-safe-apis-with-typescript'
 */
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Collapse multiple hyphens
    .replace(/^-+|-+$/g, '') // Trim leading/trailing hyphens
}

/**
 * Resolve file path for content based on type, slug, date, and language
 *
 * Blog posts: content/blog/YYYY/slug.md or slug.ar.md
 * Case studies: content/case-studies/slug.md or slug.ar.md
 *
 * @param options - File path resolution options
 * @returns Absolute file path from project root
 *
 * @example
 * resolveFilePath({
 *   contentType: 'blog',
 *   slug: 'building-apis',
 *   date: '2026-01-14',
 *   lang: 'en'
 * })
 * // Returns: 'content/blog/2026/building-apis.md'
 */
export function resolveFilePath(options: {
  contentType: 'blog' | 'case-study'
  slug: string
  date: string
  lang: 'en' | 'ar'
}): string {
  const {contentType, slug, date, lang} = options

  // Extract year from date (YYYY-MM-DD format)
  const year = date.split('-')[0]

  // Determine file extension based on language
  const extension = lang === 'ar' ? '.ar.md' : '.md'

  // Build path based on content type
  if (contentType === 'blog') {
    return `content/blog/${year}/${slug}${extension}`
  } else {
    return `content/case-studies/${slug}${extension}`
  }
}

/**
 * Check if a slug already exists in content directories
 *
 * Searches for both draft and published versions across all years for blog posts.
 *
 * @param options - Duplicate check options
 * @returns Object with exists flag and file path if found
 *
 * @example
 * const result = await checkDuplicateSlug({
 *   slug: 'my-post',
 *   contentType: 'blog',
 *   workspaceRoot: '/path/to/workspace'
 * })
 * // Returns: { exists: true, filePath: 'content/blog/2026/my-post.md' }
 */
export async function checkDuplicateSlug(options: {
  slug: string
  contentType: 'blog' | 'case-study'
  workspaceRoot: string
}): Promise<{exists: boolean; filePath?: string}> {
  const {slug, contentType, workspaceRoot} = options
  const {promises: fs} = await import('fs')
  const {default: path} = await import('path')

  const searchPatterns = [slug, `_draft-${slug}`]

  if (contentType === 'blog') {
    // Search all year directories in blog
    const blogDir = path.join(workspaceRoot, 'content', 'blog')

    try {
      const years = await fs.readdir(blogDir)

      for (const year of years) {
        const yearPath = path.join(blogDir, year)
        const stat = await fs.stat(yearPath).catch(() => null)

        if (stat && stat.isDirectory()) {
          for (const pattern of searchPatterns) {
            const enPath = path.join(yearPath, `${pattern}.md`)
            const arPath = path.join(yearPath, `${pattern}.ar.md`)

            const enExists = await fs
              .access(enPath)
              .then(() => true)
              .catch(() => false)
            const arExists = await fs
              .access(arPath)
              .then(() => true)
              .catch(() => false)

            if (enExists) {
              return {
                exists: true,
                filePath: `content/blog/${year}/${pattern}.md`,
              }
            }

            if (arExists) {
              return {
                exists: true,
                filePath: `content/blog/${year}/${pattern}.ar.md`,
              }
            }
          }
        }
      }
    } catch {
      // Blog directory doesn't exist yet
      return {exists: false}
    }
  } else {
    // Search case studies directory
    const caseStudiesDir = path.join(workspaceRoot, 'content', 'case-studies')

    try {
      for (const pattern of searchPatterns) {
        const enPath = path.join(caseStudiesDir, `${pattern}.md`)
        const arPath = path.join(caseStudiesDir, `${pattern}.ar.md`)

        const enExists = await fs
          .access(enPath)
          .then(() => true)
          .catch(() => false)
        const arExists = await fs
          .access(arPath)
          .then(() => true)
          .catch(() => false)

        if (enExists) {
          return {
            exists: true,
            filePath: `content/case-studies/${pattern}.md`,
          }
        }

        if (arExists) {
          return {
            exists: true,
            filePath: `content/case-studies/${pattern}.ar.md`,
          }
        }
      }
    } catch {
      // Case studies directory doesn't exist yet
      return {exists: false}
    }
  }

  return {exists: false}
}
