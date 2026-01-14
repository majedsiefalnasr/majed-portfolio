/**
 * useReadTime - Calculate estimated reading time from content
 *
 * Uses 200 words per minute average reading speed
 * Code blocks weighted 1.5x (slower to read)
 */

import type {ParsedContent} from '@nuxt/content'

export function useReadTime(content: string | ParsedContent | undefined): number {
  if (!content) return 1

  let text = ''

  if (typeof content === 'string') {
    text = content
  } else if (content && typeof content === 'object' && 'body' in content) {
    // Extract text from parsed content
    text = extractTextFromParsed(content.body)
  }

  if (!text || text.trim().length === 0) return 1

  // Strip HTML and markdown syntax
  const plainText = text
    .replace(/<[^>]*>/g, ' ') // Remove HTML tags
    .replace(/[#*_`~\[\]()]/g, ' ') // Remove markdown syntax
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim()

  // Count words
  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  let wordCount = words.length

  // Detect code blocks and apply 1.5x weight
  const codeBlockMatches = text.match(/```[\s\S]*?```|`[^`]+`/g) || []
  const codeWords = codeBlockMatches
    .join(' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0).length

  // Add 50% more time for code
  wordCount += Math.floor(codeWords * 0.5)

  // Calculate reading time at 200 WPM
  const minutes = Math.ceil(wordCount / 200)

  // Minimum 1 minute
  return Math.max(1, minutes)
}

/**
 * Extract plain text from Nuxt Content parsed structure
 */
function extractTextFromParsed(node: any): string {
  if (!node) return ''

  let text = ''

  if (typeof node === 'string') {
    return node
  }

  if (node.type === 'text' && node.value) {
    return node.value
  }

  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      text += extractTextFromParsed(child) + ' '
    }
  }

  return text
}
