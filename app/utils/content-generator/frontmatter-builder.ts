/**
 * Frontmatter Builder Utilities
 *
 * Generate YAML frontmatter for blog posts and case studies.
 */

import type {BlogPostMetadata, CaseStudyMetadata} from './schemas'

/**
 * Build YAML frontmatter from metadata object
 *
 * Converts metadata to properly formatted YAML frontmatter block with:
 * - Proper YAML syntax (---delimiters)
 * - Quoted strings for titles and text fields
 * - Unquoted dates and booleans
 * - Array formatting for tags
 * - Nested objects for testimonials and metrics
 *
 * @param metadata - Blog post or case study metadata
 * @returns YAML frontmatter string with delimiters
 *
 * @example
 * buildFrontmatter({
 *   title: 'My Post',
 *   date: '2026-01-14',
 *   tags: ['typescript', 'api'],
 *   excerpt: 'A great post',
 *   lang: 'en'
 * })
 * // Returns:
 * // ---
 * // title: 'My Post'
 * // date: 2026-01-14
 * // tags: ['typescript', 'api']
 * // excerpt: 'A great post'
 * // lang: 'en'
 * // ---
 */
export function buildFrontmatter(
  metadata: Partial<BlogPostMetadata> | Partial<CaseStudyMetadata>
): string {
  const lines: string[] = ['---']

  // Helper to escape single quotes in YAML strings
  const escapeYaml = (str: string): string => str.replace(/'/g, "''")

  // Add fields in a consistent order
  if ('title' in metadata && metadata.title) {
    lines.push(`title: '${escapeYaml(metadata.title)}'`)
  }

  if ('client' in metadata && metadata.client) {
    lines.push(`client: '${escapeYaml(metadata.client)}'`)
  }

  if ('date' in metadata && metadata.date) {
    lines.push(`date: ${metadata.date}`)
  }

  if ('author' in metadata && metadata.author) {
    lines.push(`author: '${escapeYaml(metadata.author)}'`)
  }

  if ('role' in metadata && metadata.role) {
    lines.push(`role: '${escapeYaml(metadata.role)}'`)
  }

  if ('timeline' in metadata && metadata.timeline) {
    lines.push(`timeline: '${escapeYaml(metadata.timeline)}'`)
  }

  if ('tags' in metadata && metadata.tags && metadata.tags.length > 0) {
    const tagsList = metadata.tags.map(tag => `'${escapeYaml(tag)}'`).join(', ')
    lines.push(`tags: [${tagsList}]`)
  }

  if ('excerpt' in metadata && metadata.excerpt) {
    lines.push(`excerpt: '${escapeYaml(metadata.excerpt)}'`)
  }

  if ('featuredImage' in metadata && metadata.featuredImage) {
    lines.push(`featuredImage: '${metadata.featuredImage}'`)
  }

  if ('featured' in metadata && typeof metadata.featured === 'boolean') {
    lines.push(`featured: ${metadata.featured}`)
  }

  if ('order' in metadata && typeof metadata.order === 'number') {
    lines.push(`order: ${metadata.order}`)
  }

  if ('lang' in metadata && metadata.lang) {
    lines.push(`lang: '${metadata.lang}'`)
  }

  // Handle testimonial (case studies only)
  if ('testimonial' in metadata && metadata.testimonial) {
    const {quote, author, position} = metadata.testimonial
    lines.push('testimonial:')
    lines.push(`  quote: '${escapeYaml(quote)}'`)
    lines.push(`  author: '${escapeYaml(author)}'`)
    lines.push(`  position: '${escapeYaml(position)}'`)
  }

  // Handle metrics array (case studies only)
  if ('metrics' in metadata && metadata.metrics && metadata.metrics.length > 0) {
    lines.push('metrics:')
    metadata.metrics.forEach(metric => {
      lines.push(`  - label: '${escapeYaml(metric.label)}'`)
      lines.push(`    value: '${escapeYaml(metric.value)}'`)
    })
  }

  lines.push('---')

  return lines.join('\n')
}
