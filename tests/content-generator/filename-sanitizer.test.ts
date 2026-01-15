/**
 * Filename Sanitizer Tests
 *
 * Test slug generation, file path resolution, and duplicate checking utilities.
 */

import * as fs from 'fs/promises'
import * as os from 'os'
import * as path from 'path'
import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {
  checkDuplicateSlug,
  generateSlug,
  resolveFilePath,
} from '../../app/utils/content-generator/filename-sanitizer'

describe('generateSlug', () => {
  it('converts title to lowercase slug', () => {
    const slug = generateSlug('Building Type-Safe APIs')
    expect(slug).toBe('building-type-safe-apis')
  })

  it('replaces spaces with hyphens', () => {
    const slug = generateSlug('My Great Blog Post')
    expect(slug).toBe('my-great-blog-post')
  })

  it('removes special characters', () => {
    const slug = generateSlug('Hello! World? #Test')
    expect(slug).toBe('hello-world-test')
  })

  it('preserves hyphens in original title', () => {
    const slug = generateSlug('Type-Safe APIs and Well-Designed Systems')
    expect(slug).toBe('type-safe-apis-and-well-designed-systems')
  })

  it('collapses multiple hyphens', () => {
    const slug = generateSlug('Title  With   Spaces')
    expect(slug).toBe('title-with-spaces')
  })

  it('trims leading and trailing hyphens', () => {
    const slug = generateSlug('  Title With Spaces  ')
    expect(slug).toBe('title-with-spaces')
  })

  it('handles numbers correctly', () => {
    const slug = generateSlug('Top 10 TypeScript Tips')
    expect(slug).toBe('top-10-typescript-tips')
  })

  it('handles empty string', () => {
    const slug = generateSlug('')
    expect(slug).toBe('')
  })

  it('handles title with only special characters', () => {
    const slug = generateSlug('!@#$%^&*()')
    expect(slug).toBe('')
  })

  it('handles unicode characters by removing them', () => {
    const slug = generateSlug('Hello 世界 World')
    expect(slug).toBe('hello-world')
  })

  it('creates SEO-friendly slug from complex title', () => {
    const slug = generateSlug("Building AI-Powered Apps: A Developer's Guide (2026)")
    expect(slug).toBe('building-ai-powered-apps-a-developers-guide-2026')
  })
})

describe('resolveFilePath', () => {
  it('resolves blog post path with year directory', () => {
    const path = resolveFilePath({
      contentType: 'blog',
      slug: 'my-post',
      date: '2026-01-14',
      lang: 'en',
    })
    expect(path).toBe('content/blog/2026/my-post.md')
  })

  it('resolves blog post path for Arabic language', () => {
    const path = resolveFilePath({
      contentType: 'blog',
      slug: 'my-post',
      date: '2026-01-14',
      lang: 'ar',
    })
    expect(path).toBe('content/blog/2026/my-post.ar.md')
  })

  it('resolves case study path without year directory', () => {
    const path = resolveFilePath({
      contentType: 'case-study',
      slug: 'project-x',
      date: '2026-01-14',
      lang: 'en',
    })
    expect(path).toBe('content/case-studies/project-x.md')
  })

  it('resolves case study path for Arabic language', () => {
    const path = resolveFilePath({
      contentType: 'case-study',
      slug: 'project-x',
      date: '2026-01-14',
      lang: 'ar',
    })
    expect(path).toBe('content/case-studies/project-x.ar.md')
  })

  it('extracts year correctly from different dates', () => {
    const path2025 = resolveFilePath({
      contentType: 'blog',
      slug: 'old-post',
      date: '2025-12-31',
      lang: 'en',
    })
    expect(path2025).toBe('content/blog/2025/old-post.md')

    const path2027 = resolveFilePath({
      contentType: 'blog',
      slug: 'future-post',
      date: '2027-03-15',
      lang: 'en',
    })
    expect(path2027).toBe('content/blog/2027/future-post.md')
  })

  it('handles complex slugs correctly', () => {
    const path = resolveFilePath({
      contentType: 'blog',
      slug: 'building-type-safe-apis-with-typescript',
      date: '2026-01-14',
      lang: 'en',
    })
    expect(path).toBe('content/blog/2026/building-type-safe-apis-with-typescript.md')
  })
})

describe('checkDuplicateSlug', () => {
  let tempDir: string

  beforeEach(async () => {
    // Create a temporary directory for testing
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'content-test-'))
  })

  afterEach(async () => {
    // Clean up temporary directory
    await fs.rm(tempDir, {recursive: true, force: true})
  })

  it('returns false when no duplicate exists', async () => {
    const result = await checkDuplicateSlug({
      slug: 'new-post',
      contentType: 'blog',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(false)
    expect(result.filePath).toBeUndefined()
  })

  it('detects duplicate in blog posts (published)', async () => {
    // Create a blog post
    const blogDir = path.join(tempDir, 'content', 'blog', '2026')
    await fs.mkdir(blogDir, {recursive: true})
    await fs.writeFile(path.join(blogDir, 'existing-post.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'existing-post',
      contentType: 'blog',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/blog/2026/existing-post.md')
  })

  it('detects duplicate in blog posts (draft)', async () => {
    // Create a draft blog post
    const blogDir = path.join(tempDir, 'content', 'blog', '2026')
    await fs.mkdir(blogDir, {recursive: true})
    await fs.writeFile(path.join(blogDir, '_draft-new-post.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'new-post',
      contentType: 'blog',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/blog/2026/_draft-new-post.md')
  })

  it('detects duplicate in blog posts across different years', async () => {
    // Create blog posts in different years
    const blog2025 = path.join(tempDir, 'content', 'blog', '2025')
    await fs.mkdir(blog2025, {recursive: true})
    await fs.writeFile(path.join(blog2025, 'my-post.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'my-post',
      contentType: 'blog',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/blog/2025/my-post.md')
  })

  it('detects duplicate in Arabic blog posts', async () => {
    // Create an Arabic blog post
    const blogDir = path.join(tempDir, 'content', 'blog', '2026')
    await fs.mkdir(blogDir, {recursive: true})
    await fs.writeFile(path.join(blogDir, 'arabic-post.ar.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'arabic-post',
      contentType: 'blog',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/blog/2026/arabic-post.ar.md')
  })

  it('detects duplicate in case studies', async () => {
    // Create a case study
    const caseStudiesDir = path.join(tempDir, 'content', 'case-studies')
    await fs.mkdir(caseStudiesDir, {recursive: true})
    await fs.writeFile(path.join(caseStudiesDir, 'project-x.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'project-x',
      contentType: 'case-study',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/case-studies/project-x.md')
  })

  it('detects duplicate in draft case studies', async () => {
    // Create a draft case study
    const caseStudiesDir = path.join(tempDir, 'content', 'case-studies')
    await fs.mkdir(caseStudiesDir, {recursive: true})
    await fs.writeFile(path.join(caseStudiesDir, '_draft-project-y.md'), '# Test')

    const result = await checkDuplicateSlug({
      slug: 'project-y',
      contentType: 'case-study',
      workspaceRoot: tempDir,
    })

    expect(result.exists).toBe(true)
    expect(result.filePath).toBe('content/case-studies/_draft-project-y.md')
  })

  it('handles non-existent directories gracefully', async () => {
    const result = await checkDuplicateSlug({
      slug: 'test-post',
      contentType: 'blog',
      workspaceRoot: path.join(tempDir, 'non-existent'),
    })

    expect(result.exists).toBe(false)
  })
})
