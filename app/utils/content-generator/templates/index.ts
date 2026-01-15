/**
 * Template Registry
 *
 * Exports all available templates for content generation
 */

export {blogDefaultTemplate} from './blog-default'
export {blogTutorialTemplate} from './blog-tutorial'
export {caseStudyDefaultTemplate} from './case-study-default'

import type {ContentTemplate} from '../template-schema'
import {blogDefaultTemplate} from './blog-default'
import {blogTutorialTemplate} from './blog-tutorial'
import {caseStudyDefaultTemplate} from './case-study-default'

/**
 * All available templates
 */
export const templates: ContentTemplate[] = [
  blogDefaultTemplate,
  blogTutorialTemplate,
  caseStudyDefaultTemplate,
]

/**
 * Get template by ID
 */
export function getTemplateById(id: string): ContentTemplate | undefined {
  return templates.find(t => t.id === id)
}

/**
 * Get templates by content type
 */
export function getTemplatesByType(contentType: 'blog' | 'case-study'): ContentTemplate[] {
  return templates.filter(t => t.contentType === contentType)
}
