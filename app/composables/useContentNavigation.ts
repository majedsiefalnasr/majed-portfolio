/**
 * useContentNavigation - Generate previous/next navigation links
 *
 * Fetches adjacent content items for navigation securely and efficiently
 */

import {queryCollection} from '#imports'
import type {ContentCollection, ContentNavItem} from '~/types/content'

interface NavigationContext {
  path: string
  date: string
  lang?: string
}

export function useContentNavigation(
  currentContent: NavigationContext,
  collection: ContentCollection = 'blog'
) {
  const {path, date, lang} = currentContent

  return useAsyncData(`nav-${path}`, async () => {
    // Helper to build queries
    const createQuery = (compareOp: '<' | '>', sortDir: 'ASC' | 'DESC') => {
      let query = queryCollection(collection).where('stem', 'NOT LIKE', '\\_%') // Exclude drafts

      // Filter by language if available
      if (lang) {
        query = query.where('lang', '=', lang)
      }

      return query
        .where('date', compareOp, date)
        .order('date', sortDir)
        .select('title', 'path', 'date')
        .limit(1)
    }

    const [prev, next] = await Promise.all([
      createQuery('<', 'DESC').first() as Promise<ContentNavItem | null>,
      createQuery('>', 'ASC').first() as Promise<ContentNavItem | null>,
    ])

    return {
      previous: prev,
      next: next,
    }
  })
}
