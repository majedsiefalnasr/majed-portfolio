<script setup lang="ts">
  import {Button} from '@/components/ui/button'
  import {Card, CardContent} from '@/components/ui/card'
  import Icon from '@/components/ui/Icon.vue'
  import type {BlogPostCardProps} from '~/types/content'

  const props = withDefaults(defineProps<BlogPostCardProps>(), {
    showExcerpt: true,
    showTags: true,
  })

  // Calculate read time
  const readTime = computed(() => useReadTime(props.post.body))

  // Get excerpt
  const excerpt = computed(() => useExcerpt(props.post))
</script>

<template>
  <NuxtLink :to="post.path" class="block">
    <Card class="transition-all hover:shadow-lg">
      <!-- Featured image (optional) -->
      <div v-if="post.featuredImage" class="overflow-hidden rounded-t-lg">
        <NuxtImg
          :src="post.featuredImage"
          :alt="post.title"
          class="w-full h-48 object-cover"
          loading="lazy" />
      </div>

      <CardContent class="pt-6">
        <!-- Post title -->
        <h3 class="text-xl font-semibold mb-3 text-foreground">
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
        <p v-if="showExcerpt && excerpt" class="text-muted-foreground line-clamp-3">
          {{ excerpt }}
        </p>

        <!-- Read more link -->
        <div class="mt-4">
          <Button variant="link" class="px-0">
            Read more
            <Icon icon="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
