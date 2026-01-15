/**
 * Reading Time Calculator Tests
 *
 * Test reading time estimation based on word count.
 */

import {describe, expect, it} from 'vitest'
import {calculateReadTime} from '../../app/utils/content-generator/read-time'

describe('calculateReadTime', () => {
  it('returns 1 minute for short content (< 200 words)', () => {
    const shortContent = 'This is a short piece of content with only a few words.'
    const readTime = calculateReadTime(shortContent)
    expect(readTime).toBe(1)
  })

  it('returns 1 minute for exactly 200 words', () => {
    const words = Array(200).fill('word').join(' ')
    const readTime = calculateReadTime(words)
    expect(readTime).toBe(1)
  })

  it('returns 2 minutes for 201-400 words', () => {
    const words = Array(300).fill('word').join(' ')
    const readTime = calculateReadTime(words)
    expect(readTime).toBe(2)
  })

  it('returns 5 minutes for 1000 words', () => {
    const words = Array(1000).fill('word').join(' ')
    const readTime = calculateReadTime(words)
    expect(readTime).toBe(5)
  })

  it('removes frontmatter before counting words', () => {
    const contentWithFrontmatter = `---
title: 'Test Post'
date: 2026-01-14
tags: ['test']
---

This is the actual content that should be counted for reading time.
`
    const readTime = calculateReadTime(contentWithFrontmatter)
    expect(readTime).toBe(1)
  })

  it('removes code blocks before counting words', () => {
    const contentWithCode = `
## Introduction

Here is some text.

\`\`\`typescript
function example() {
  return 'This should not be counted'
}
\`\`\`

More text here.
`
    const readTime = calculateReadTime(contentWithCode)
    // Should only count: "Here is some text." + "More text here." = 7 words
    expect(readTime).toBe(1)
  })

  it('removes inline code before counting words', () => {
    const contentWithInlineCode = `
This is text with \`someCode()\` and \`moreCode()\` in it.
`
    const readTime = calculateReadTime(contentWithInlineCode)
    // Should count: "This is text with and in it" = 7 words
    expect(readTime).toBe(1)
  })

  it('removes images before counting words', () => {
    const contentWithImages = `
Here is text before image.

![Alt text](https://example.com/image.jpg)

Text after image.
`
    const readTime = calculateReadTime(contentWithImages)
    // Should count: "Here is text before image. Text after image." = 8 words
    expect(readTime).toBe(1)
  })

  it('replaces links with link text for counting', () => {
    const contentWithLinks = `
Check out [this article](https://example.com) for more info.
`
    const readTime = calculateReadTime(contentWithLinks)
    // Should count: "Check out this article for more info." = 7 words
    expect(readTime).toBe(1)
  })

  it('removes markdown formatting characters', () => {
    const contentWithFormatting = `
# Heading

This is **bold** and *italic* and ~~strikethrough~~ text.

- List item 1
- List item 2
`
    const readTime = calculateReadTime(contentWithFormatting)
    // Should count all words except markdown syntax
    expect(readTime).toBeGreaterThan(0)
  })

  it('handles empty content', () => {
    const emptyContent = ''
    const readTime = calculateReadTime(emptyContent)
    expect(readTime).toBe(1) // Minimum 1 minute
  })

  it('handles content with only frontmatter', () => {
    const onlyFrontmatter = `---
title: 'Test'
date: 2026-01-14
---`
    const readTime = calculateReadTime(onlyFrontmatter)
    expect(readTime).toBe(1) // Minimum 1 minute
  })

  it('handles realistic blog post (500 words)', () => {
    // Create realistic content with ~500 words
    const paragraphs = [
      'Introduction paragraph with about twenty words in it to make it realistic content for testing.',
      'Main content section with detailed explanation using professional language and technical terms throughout the text.',
      'Additional paragraph providing more context and information to reach the target word count needed.',
      'Further elaboration on the topic with examples and use cases described in detail.',
      'Conclusion paragraph wrapping up the main points discussed in the article above.',
    ]

    // Repeat to get ~500 words
    const content = paragraphs.join('\n\n').repeat(5)
    const readTime = calculateReadTime(content)

    // ~500 words / 200 WPM = 2.5 → rounds up to 3 minutes
    expect(readTime).toBeGreaterThanOrEqual(2)
    expect(readTime).toBeLessThanOrEqual(3)
  })

  it('rounds up partial minutes', () => {
    // 250 words = 1.25 minutes → should round to 2
    const words = Array(250).fill('word').join(' ')
    const readTime = calculateReadTime(words)
    expect(readTime).toBe(2)
  })
})
