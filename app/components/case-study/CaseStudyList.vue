<script setup lang="ts">
  import type {CaseStudyListProps} from '~/types/content'

  const props = withDefaults(defineProps<CaseStudyListProps>(), {
    showFeaturedFirst: true,
    layout: 'grid',
    initialTag: undefined,
  })

  // Setup filtering
  const caseStudiesRef = computed(() => {
    if (props.showFeaturedFirst) {
      return [...props.caseStudies].sort((a, b) => {
        // Featured items first, then by order, then by date
        if ((a.featured || false) !== (b.featured || false)) {
          return b.featured || false ? 1 : -1
        }
        if (a.order !== undefined && b.order !== undefined) {
          return a.order - b.order
        }
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
    }
    return props.caseStudies
  })

  const {
    selectedTag,
    filteredItems: filteredCaseStudies,
    availableTags,
    tagCounts,
    selectTag,
    clearFilter,
  } = useContentFilter(caseStudiesRef)

  // Initialize from prop if provided
  if (props.initialTag && !selectedTag.value) {
    selectTag(props.initialTag)
  }

  // Check if filtering is active
  const hasActiveFilter = computed(() => selectedTag.value !== null)

  // Empty state message
  const emptyMessage = computed(() => {
    if (hasActiveFilter.value) {
      return `No case studies found with tag "${selectedTag.value}"`
    }
    return 'No case studies yet. Check back soon!'
  })
</script>

<template>
  <div class="space-y-8">
    <!-- Tag filter chips -->
    <div v-if="availableTags.length > 0" class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by technology</h3>
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

    <!-- Case studies count -->
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ filteredCaseStudies.length }}
      {{ filteredCaseStudies.length === 1 ? 'case study' : 'case studies' }}
      <span v-if="hasActiveFilter">with tag "{{ selectedTag }}"</span>
    </div>

    <!-- Case studies grid -->
    <div
      v-if="filteredCaseStudies.length > 0"
      :class="[
        'gap-6',
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
          : 'space-y-6',
      ]">
      <CaseStudyCard
        v-for="caseStudy in filteredCaseStudies"
        :key="caseStudy._id"
        :case-study="caseStudy"
        :featured="caseStudy.featured" />
    </div>

    <!-- Empty state -->
    <div v-else class="text-center py-12">
      <UIcon name="i-heroicons-briefcase" class="h-12 w-12 mx-auto text-gray-400 mb-4" />
      <p class="text-gray-600 dark:text-gray-400">
        {{ emptyMessage }}
      </p>
    </div>
  </div>
</template>
