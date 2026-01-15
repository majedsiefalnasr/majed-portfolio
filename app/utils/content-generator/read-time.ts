/**
 * Reading Time Calculator Utility
 *
 * Calculate estimated reading time for content based on word count.
 */

/**
 * Calculate reading time in minutes
 *
 * Uses industry standard of 200 words per minute (WPM) for technical content.
 * Rounds to nearest minute, with minimum of 1 minute.
 *
 * @param content - Markdown content (including frontmatter)
 * @returns Estimated reading time in minutes
 *
 * @example
 * calculateReadTime('## Introduction\n\nThis is a sample post with some content...')
 * // Returns: 1 (if < 200 words), 2 (if 200-400 words), etc.
 */
export function calculateReadTime(content: string): number {
  // Remove frontmatter (everything between --- delimiters)
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n*/m, '')

  // Remove markdown syntax for more accurate word count
  const plainText = withoutFrontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // Replace links with link text
    .replace(/[#*_~]/g, '') // Remove markdown formatting characters
    .replace(/\n+/g, ' ') // Replace newlines with spaces

  // Count words (split by whitespace and filter empty strings)
  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  const wordCount = words.length

  // Calculate reading time (200 WPM)
  const minutes = Math.ceil(wordCount / 200)

  // Minimum 1 minute
  return Math.max(1, minutes)
}
