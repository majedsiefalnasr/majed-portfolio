/**
 * useContentFilter - Client-side content filtering with state management
 *
 * Manages tag filtering state and syncs with URL query params
 */

export function useContentFilter<T extends {tags?: string[]}>(items: Ref<T[]> | ComputedRef<T[]>) {
  const route = useRoute()
  const router = useRouter()

  // Initialize selected tag from URL or state
  const selectedTag = useState<string | null>('content-filter-tag', () => {
    return (route.query.tag as string) || null
  })

  // Extract all unique tags with counts
  const availableTags = computed(() => {
    const allItems = unref(items)
    const tagSet = new Set<string>()
    allItems.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => tagSet.add(tag))
      }
    })
    return Array.from(tagSet).sort()
  })

  // Calculate tag counts
  const tagCounts = computed(() => {
    const allItems = unref(items)
    const counts: Record<string, number> = {}
    allItems.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1
        })
      }
    })
    return counts
  })

  // Filter items by selected tag
  const filteredItems = computed(() => {
    const allItems = unref(items)
    if (!selectedTag.value) {
      return allItems
    }
    return allItems.filter(item => item.tags?.includes(selectedTag.value!))
  })

  // Select a tag (toggle if same tag clicked)
  const selectTag = (tag: string | null) => {
    // Toggle if clicking the same tag
    if (selectedTag.value === tag) {
      selectedTag.value = null
      router.push({query: {}})
    } else {
      selectedTag.value = tag
      if (tag) {
        router.push({query: {tag}})
      } else {
        router.push({query: {}})
      }
    }
  }

  // Clear filter
  const clearFilter = () => {
    selectedTag.value = null
    router.push({query: {}})
  }

  // Watch route changes to update filter
  watch(
    () => route.query.tag,
    newTag => {
      selectedTag.value = (newTag as string) || null
    }
  )

  return {
    selectedTag,
    filteredItems,
    availableTags,
    tagCounts,
    selectTag,
    clearFilter,
  }
}
