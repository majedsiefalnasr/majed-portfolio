/**
 * Read Time Calculator - Unified Implementation
 *
 * Calculates estimated reading time from markdown or ParsedContent.
 * Uses LRU cache for memoization to prevent recalculating on repeated calls.
 *
 * Features:
 * - Handles both string and ParsedContent input
 * - Code blocks weighted 1.5x (slower to read)
 * - LRU cache for performance
 * - Strips frontmatter and markdown syntax
 */

import {LRUCache} from 'lru-cache'
import type {ParsedContentv2 as ParsedContent} from '@nuxt/content'

interface ContentNode {
  type?: string
  value?: string
  children?: ContentNode[]
}

export interface ReadTimeOptions {
  wpm?: number
  codeWeight?: number
  stripFrontmatter?: boolean
}

const DEFAULT_OPTIONS: Required<ReadTimeOptions> = {
  wpm: 200,
  codeWeight: 1.5,
  stripFrontmatter: true,
}

const readTimeCache = new LRUCache<string, number>({
  max: 100,
  ttl: 1000 * 60 * 60,
})

function getCacheKey(content: string | ParsedContent | undefined): string | null {
  if (!content) return null

  if (typeof content === 'string') {
    return content.slice(0, 100)
  }

  if (content && typeof content === 'object' && '_id' in content) {
    return content._id as string
  }

  return null
}

export function calculateReadTime(
  content: string | ParsedContent | undefined,
  options: ReadTimeOptions = {}
): number {
  if (!content) return 1

  const cacheKey = getCacheKey(content)
  if (cacheKey && readTimeCache.has(cacheKey)) {
    const cached = readTimeCache.get(cacheKey)
    return cached !== undefined ? cached : 1
  }

  const opts = {...DEFAULT_OPTIONS, ...options}
  let text = ''

  if (typeof content === 'string') {
    text = content
  } else if (content && typeof content === 'object' && 'body' in content) {
    text = extractTextFromParsed(content.body as ContentNode)
  }

  if (opts.stripFrontmatter && typeof text === 'string') {
    text = text.replace(/^---[\s\S]*?---\n*/m, '')
  }

  if (!text || text.trim().length === 0) {
    const result = 1
    if (cacheKey) readTimeCache.set(cacheKey, result)
    return result
  }

  const plainText = text
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/[#*_`~[\]()]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  const words = plainText.split(/\s+/).filter(word => word.length > 0)
  let wordCount = words.length

  const codeBlockMatches = text.match(/```[\s\S]*?```|`[^`]+`/g) || []
  const codeWords = codeBlockMatches
    .join(' ')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]+`/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 0).length

  wordCount += Math.floor(codeWords * (opts.codeWeight - 1))

  const minutes = Math.ceil(wordCount / opts.wpm)
  const result = Math.max(1, minutes)

  if (cacheKey) {
    readTimeCache.set(cacheKey, result)
  }

  return result
}

function extractTextFromParsed(node: ContentNode): string {
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
      text = `${text}${extractTextFromParsed(child)} `
    }
  }

  return text
}

export function clearReadTimeCache(): void {
  readTimeCache.clear()
}
