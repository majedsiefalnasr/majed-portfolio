/**
 * useExcerpt - Generate excerpt from content
 *
 * Uses frontmatter excerpt if provided, otherwise auto-generates
 * from first ~150 characters of content
 */

import type {BlogPost, CaseStudy} from '~/types/content'

// Type for parsed AST nodes from Nuxt Content
interface ContentNode {
  type?: string
  value?: string
  tag?: string
  children?: ContentNode[]
}

export function useExcerpt(post: BlogPost | CaseStudy, maxLength: number = 150): string {
  // Use frontmatter excerpt if provided
  if (post.excerpt && post.excerpt.trim().length > 0) {
    return post.excerpt.trim()
  }

  // Auto-generate from content body
  if (!post.body) return ''

  let text = extractPlainText(post.body as ContentNode)

  // Clean up text
  text = text
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  if (text.length === 0) return ''

  // Truncate to maxLength
  if (text.length <= maxLength) {
    return text
  }

  // Find last complete word before maxLength
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')

  if (lastSpace > 0) {
    return truncated.substring(0, lastSpace) + '…'
  }

  return truncated + '…'
}

/**
 * Extract plain text from Nuxt Content parsed structure
 */
function extractPlainText(node: ContentNode): string {
  if (!node) return ''

  let text = ''

  if (typeof node === 'string') {
    return node
  }

  if (node.type === 'text' && node.value) {
    return node.value
  }

  // Skip code blocks and heading tags for excerpt
  if (node.tag === 'code' || node.tag === 'pre' || /^h[1-6]$/.test(node.tag)) {
    return ''
  }

  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      const childText = extractPlainText(child)
      if (childText) {
        text += childText + ' '
      }
      // Stop after first paragraph for cleaner excerpts
      if (node.tag === 'p' && text.length > 50) {
        break
      }
    }
  }

  return text
}
