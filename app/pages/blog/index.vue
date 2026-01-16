<script setup lang="ts">
  import type {BlogPost} from '~/types/content'

  const {queryContentByLocale} = useContentLocale()
  const {locale} = useI18n()

  // Route + initial tag (for debugging and filtering visibility)
  const route = useRoute()
  const initialTag = route.query.tag as string | undefined

  // Fetch locale-specific blog posts using queryCollection (Nuxt Content v3)
  // Key includes locale to ensure content refetches when language changes
  const {data: posts} = await useAsyncData(
    () => `blog-posts-${locale.value}`,
    async () => {
      try {
        const result = await queryContentByLocale<BlogPost>('blog')

        // Sort by date (newest first)
        const sorted = (result || []).sort((a: BlogPost, b: BlogPost) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime()
        })

        return sorted ?? []
      } catch {
        // Silently handle errors and return empty array
        return []
      }
    },
    {watch: [locale]}
  )

  // SEO meta tags
  const {t} = useI18n()

  useSEO({
    title: t('blog.title', 'Blog'),
    description: t(
      'blog.description',
      'Read articles about web development, design, and technology'
    ),
    ogType: 'website',
  })
</script>

<template>
  <Container class="py-12">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-4">Blog</h1>
      <p class="text-lg text-muted-foreground">
        Articles about web development, design, and technology
      </p>
    </div>

    <!-- Blog list with filtering -->
    <BlogList :posts="posts || []" :initial-tag="initialTag" />
  </Container>
</template>
