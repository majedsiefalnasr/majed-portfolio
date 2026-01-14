/**
 * useContentQuery - Type-safe wrapper for Nuxt Content queries
 *
 * Automatically excludes draft files (underscore prefix) and provides
 * reactive refs for data, pending, and error states.
 */

import {queryCollection} from '#imports'
import type {BlogPost, CaseStudy, ContentQueryOptions} from '~/types/content'

export function useContentQuery<T = BlogPost | CaseStudy>(
  collection: 'blog' | 'caseStudies',
  options: ContentQueryOptions = {}
) {
  const {where = {}, sort = {date: -1}, limit, skip} = options

  return useAsyncData(
    `content-${collection}-${JSON.stringify(options)}`,
    async () => {
      // Build query
      let query = queryCollection(collection)

      // Exclude draft files by default (files with _ prefix in name)
      query = query.where('stem', 'NOT LIKE', '\\_%')

      // Apply custom where conditions
      if (Object.keys(where).length > 0) {
        for (const [field, value] of Object.entries(where)) {
          query = query.where(field, '=', value)
        }
      }

      // Apply sorting
      if (sort) {
        for (const [field, direction] of Object.entries(sort)) {
          const sortField = field as 'date' | 'stem' | 'title'
          const sortDirection = direction === 1 || direction === 'ASC' ? 'ASC' : 'DESC'
          query = query.order(sortField, sortDirection)
        }
      }

      // Apply pagination
      if (limit) {
        query = query.limit(limit)
      }
      if (skip) {
        query = query.skip(skip)
      }

      return query.all()
    },
    {
      transform: data => data as T[],
    }
  )
}
