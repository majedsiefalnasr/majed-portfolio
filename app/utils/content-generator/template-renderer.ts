/**
 * Template Renderer Utilities
 *
 * Generate complete markdown content from metadata and AI-generated sections.
 */

import {buildFrontmatter} from './frontmatter-builder'
import type {BlogPostMetadata, CaseStudyMetadata} from './schemas'

/**
 * Generated blog post sections
 */
export interface BlogPostSections {
  introduction: string
  mainContent: string
  conclusion: string
}

/**
 * Generated case study sections
 */
export interface CaseStudySections {
  overview: string
  challenge: string
  solution: string
  results: string
  technologiesUsed?: string
}

/**
 * Render complete blog post markdown file
 *
 * Combines frontmatter with AI-generated content sections in proper structure.
 * For metadata-only mode, includes placeholder body.
 *
 * @param options - Rendering options
 * @returns Complete markdown content ready to write to file
 *
 * @example
 * renderBlogPost({
 *   metadata: { title: 'My Post', date: '2026-01-14', ... },
 *   mode: 'full',
 *   sections: { introduction: '...', mainContent: '...', conclusion: '...' }
 * })
 */
export function renderBlogPost(options: {
  metadata: BlogPostMetadata
  mode: 'full' | 'metadata-only'
  sections?: BlogPostSections
}): string {
  const {metadata, mode, sections} = options

  // Build frontmatter
  const frontmatter = buildFrontmatter(metadata)

  // For metadata-only mode, return frontmatter with placeholder
  if (mode === 'metadata-only') {
    return `${frontmatter}

## Introduction

Write your introduction here...

## Main Content

Write your main content here...

## Conclusion

Write your conclusion here...
`
  }

  // For full mode, combine frontmatter with generated sections
  if (!sections) {
    throw new Error('Sections are required for full content mode')
  }

  return `${frontmatter}

${sections.introduction}

${sections.mainContent}

${sections.conclusion}
`
}

/**
 * Render complete case study markdown file
 *
 * Combines frontmatter with AI-generated content sections in proper structure.
 * For metadata-only mode, includes placeholder body.
 *
 * @param options - Rendering options
 * @returns Complete markdown content ready to write to file
 *
 * @example
 * renderCaseStudy({
 *   metadata: { title: 'Project X', client: 'Acme', ... },
 *   mode: 'full',
 *   sections: { overview: '...', challenge: '...', solution: '...', results: '...' }
 * })
 */
export function renderCaseStudy(options: {
  metadata: CaseStudyMetadata
  mode: 'full' | 'metadata-only'
  sections?: CaseStudySections
}): string {
  const {metadata, mode, sections} = options

  // Build frontmatter
  const frontmatter = buildFrontmatter(metadata)

  // For metadata-only mode, return frontmatter with placeholder
  if (mode === 'metadata-only') {
    return `${frontmatter}

## Overview

Write project overview here...

## Challenge

Describe the problem you solved here...

## Solution

Describe your solution approach here...

## Results

Describe the outcomes and impact here...

## Technologies Used

List technologies and tools here...
`
  }

  // For full mode, combine frontmatter with generated sections
  if (!sections) {
    throw new Error('Sections are required for full content mode')
  }

  const technologiesSection = sections.technologiesUsed ? `\n${sections.technologiesUsed}\n` : ''

  return `${frontmatter}

${sections.overview}

${sections.challenge}

${sections.solution}

${sections.results}
${technologiesSection}`
}
