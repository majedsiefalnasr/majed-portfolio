<script setup lang="ts">
  import {Button} from '@/components/ui/button'
  import Icon from '@/components/ui/Icon.vue'
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
        <h3 class="text-sm font-semibold text-foreground">Filter by topic</h3>
        <Button v-if="hasActiveFilter" variant="ghost" size="sm" @click="clearFilter">
          <Icon icon="radix-icons:cross-2" class="me-2 h-4 w-4" />
          Clear filter
        </Button>
      </div>

      <div class="flex flex-wrap gap-2">
        <Button
          v-for="tag in availableTags"
          :key="tag"
          :variant="selectedTag === tag ? 'default' : 'secondary'"
          size="sm"
          @click="selectTag(tag)">
          {{ tag }}
          <span class="ms-1 text-xs opacity-75"> ({{ tagCounts[tag] }}) </span>
        </Button>
      </div>
    </div>

    <!-- Post count -->
    <div class="text-sm text-muted-foreground">
      {{ filteredPosts.length }} {{ filteredPosts.length === 1 ? 'post' : 'posts' }}
      <span v-if="hasActiveFilter">with tag "{{ selectedTag }}"</span>
    </div>

    <!-- Posts list -->
    <div v-if="filteredPosts.length > 0" class="space-y-6">
      <BlogPostCard v-for="post in filteredPosts" :key="post._id" :post="post" />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <Icon icon="radix-icons:file-text" class="h-12 w-12 mx-auto text-muted-foreground mb-4" />
      <p class="text-muted-foreground">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>
