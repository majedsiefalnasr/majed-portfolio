<script setup lang="ts">
  import type {BlogPostMetaProps} from '~/types/content'

  const props = withDefaults(defineProps<BlogPostMetaProps>(), {
    showTags: true,
    showAuthor: false,
  })

  // Format date based on locale
  const {locale} = useI18n()
  const formattedDate = computed(() => {
    const date = new Date(props.date)
    return new Intl.DateTimeFormat(locale.value, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date)
  })

  // Read time label
  const readTimeLabel = computed(() => {
    return `${props.readTime} min read`
  })
</script>

<template>
  <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
    <!-- Date -->
    <time :datetime="date" class="flex items-center gap-1">
      <UIcon name="i-heroicons-calendar" class="h-4 w-4" />
      {{ formattedDate }}
    </time>

    <!-- Read time -->
    <span class="flex items-center gap-1">
      <UIcon name="i-heroicons-clock" class="h-4 w-4" />
      {{ readTimeLabel }}
    </span>

    <!-- Author (optional) -->
    <span v-if="showAuthor && author" class="flex items-center gap-1">
      <UIcon name="i-heroicons-user" class="h-4 w-4" />
      {{ author }}
    </span>

    <!-- Tags -->
    <div v-if="showTags && tags && tags.length > 0" class="flex flex-wrap gap-2">
      <UBadge v-for="tag in tags" :key="tag" variant="soft" size="sm">
        {{ tag }}
      </UBadge>
    </div>
  </div>
</template>
