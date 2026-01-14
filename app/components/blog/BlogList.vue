<script setup lang="ts">
  import type {BlogListProps} from '~/types/content'

  const props = withDefaults(defineProps<BlogListProps>(), {
    initialTag: undefined,
  })

  // Setup filtering
  const postsRef = computed(() => props.posts)
  const {
    selectedTag,
    filteredItems: filteredPosts,
    availableTags,
    tagCounts,
    selectTag,
    clearFilter,
  } = useContentFilter(postsRef)

  // Initialize from prop if provided
  if (props.initialTag && !selectedTag.value) {
    selectTag(props.initialTag)
  }

  // Check if filtering is active
  const hasActiveFilter = computed(() => selectedTag.value !== null)

  // Empty state message
  const emptyMessage = computed(() => {
    if (hasActiveFilter.value) {
      return `No posts found with tag "${selectedTag.value}"`
    }
    return 'No blog posts yet. Check back soon!'
  })
</script>

<template>
  <div class="space-y-8">
    <!-- Tag filter chips -->
    <div v-if="availableTags.length > 0" class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by topic</h3>
        <UButton
          v-if="hasActiveFilter"
          variant="ghost"
          size="xs"
          icon="i-heroicons-x-mark"
          @click="clearFilter">
          Clear filter
        </UButton>
      </div>

      <div class="flex flex-wrap gap-2">
        <UButton
          v-for="tag in availableTags"
          :key="tag"
          :variant="selectedTag === tag ? 'solid' : 'soft'"
          size="sm"
          @click="selectTag(tag)">
          {{ tag }}
          <span class="ml-1 text-xs opacity-75"> ({{ tagCounts[tag] }}) </span>
        </UButton>
      </div>
    </div>

    <!-- Post count -->
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }}
      <span v-if="hasActiveFilter">with tag "{{ selectedTag }}"</span>
    </div>

    <!-- Posts list -->
    <div v-if="filteredPosts.length > 0" class="space-y-6">
      <BlogPostCard v-for="post in filteredPosts" :key="post._id" :post="post" />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <UIcon name="i-heroicons-document-text" class="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p class="text-gray-600 dark:text-gray-400">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>
