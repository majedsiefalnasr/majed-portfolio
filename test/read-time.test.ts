import {describe, it, expect, beforeEach} from 'vitest'
import {calculateReadTime, clearReadTimeCache} from '../app/utils/content/read-time'

describe('calculateReadTime', () => {
  beforeEach(() => {
    clearReadTimeCache()
  })

  it('returns 1 minute for empty or undefined content', () => {
    expect(calculateReadTime('')).toBe(1)
    expect(calculateReadTime(undefined)).toBe(1)
  })

  it('calculates correctly for simple text', () => {
    const text = 'word '.repeat(200)
    expect(calculateReadTime(text)).toBe(1)
  })

  it('calculates correctly for 400 words', () => {
    const text = 'word '.repeat(400)
    expect(calculateReadTime(text)).toBe(2)
  })

  it('strips markdown syntax', () => {
    const text = '# Heading\n\nThis is **bold** text with *italics* and `code`.'
    const plainText = text.replace(/[#*_`]/g, '')
    const words = plainText.split(/\s+/).filter(w => w.length > 0)
    expect(calculateReadTime(text)).toBe(Math.ceil(words.length / 200))
  })

  it('weights code blocks 1.5x', () => {
    const plainText = 'word '.repeat(150)
    const codeText = `\`\`\`javascript\n${plainText}\`\`\`\n`
    const plainResult = calculateReadTime(plainText)
    const codeResult = calculateReadTime(codeText)
    expect(codeResult).toBeGreaterThan(plainResult)
  })

  it('caches results for same content', () => {
    const text = 'test '.repeat(100)
    const result1 = calculateReadTime(text)
    const result2 = calculateReadTime(text)
    expect(result2).toBe(result1)
  })

  it('accepts custom options', () => {
    const text = 'word '.repeat(200)
    const result = calculateReadTime(text, {wpm: 100})
    expect(result).toBe(2)
  })

  it('removes frontmatter when enabled', () => {
    const text = '---\ntitle: Test\n---\n' + 'word '.repeat(200)
    const result = calculateReadTime(text)
    expect(result).toBe(1)
  })

  it('keeps frontmatter when disabled', () => {
    const text = '---\n'.repeat(200)
    const result = calculateReadTime(text, {stripFrontmatter: false})
    expect(result).toBeGreaterThanOrEqual(1)
  })
})
