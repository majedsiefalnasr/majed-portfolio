<script setup lang="ts">
  import type {BlogPostCardProps} from '~/types/content'

  const props = withDefaults(defineProps<BlogPostCardProps>(), {
    showExcerpt: true,
    showTags: true,
  })

  // Calculate read time
  const readTime = computed(() => useReadTime(props.post.body))

  // Get excerpt
  const excerpt = computed(() => useExcerpt(props.post))

  // Handle card click
  const router = useRouter()
  const handleClick = () => {
    router.push(props.post.path)
  }
</script>

<template>
  <UCard class="cursor-pointer transition-all hover:shadow-lg" @click="handleClick">
    <!-- Featured image (optional) -->
    <div v-if="post.featuredImage" class="mb-4 -mx-6 -mt-6">
      <NuxtImg
        :src="post.featuredImage"
        :alt="post.title"
        class="w-full h-48 object-cover rounded-t-lg"
        loading="lazy" />
    </div>

    <!-- Post title -->
    <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
      {{ post.title }}
    </h3>

    <!-- Metadata -->
    <BlogPostMeta
      :date="post.date"
      :read-time="readTime"
      :tags="showTags ? post.tags : undefined"
      :author="post.author"
      class="mb-3" />

    <!-- Excerpt -->
    <p v-if="showExcerpt && excerpt" class="text-gray-600 dark:text-gray-400 line-clamp-3">
      {{ excerpt }}
    </p>

    <!-- Read more link -->
    <div class="mt-4">
      <UButton variant="link" trailing-icon="i-heroicons-arrow-right" :padded="false">
        Read more
      </UButton>
    </div>
  </UCard>
</template>
