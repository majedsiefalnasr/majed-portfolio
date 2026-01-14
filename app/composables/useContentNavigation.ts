/**
 * useContentNavigation - Generate previous/next navigation links
 *
 * Fetches adjacent content items for navigation
 */

import {queryCollection} from '#imports'
import type {ContentNavItem, ContentCollection} from '~/types/content'

export async function useContentNavigation(
  currentPath: string,
  collection: ContentCollection = 'blog'
) {
  // Fetch all items in the collection, sorted by date
  const {data: allItems} = await useAsyncData(
    `nav-${collection}`,
    () =>
      queryCollection(collection)
        .where('stem', 'NOT LIKE', '\\_%') // Exclude drafts
        .select('title', 'path', 'date')
        .order('date', 'ASC') // Chronological order for navigation
        .all(),
    {
      transform: items => items as Array<{title: string; path: string; date: string}>,
    }
  )

  const items = allItems.value || []

  // Find current item index
  const currentIndex = items.findIndex(item => item.path === currentPath)

  if (currentIndex === -1) {
    return {
      previous: ref(null),
      next: ref(null),
    }
  }

  // Get previous item (older post)
  const previous = ref<ContentNavItem | null>(
    currentIndex > 0
      ? {
          title: items[currentIndex - 1].title,
          path: items[currentIndex - 1].path,
          date: items[currentIndex - 1].date,
        }
      : null
  )

  // Get next item (newer post)
  const next = ref<ContentNavItem | null>(
    currentIndex < items.length - 1
      ? {
          title: items[currentIndex + 1].title,
          path: items[currentIndex + 1].path,
          date: items[currentIndex + 1].date,
        }
      : null
  )

  return {
    previous,
    next,
  }
}
