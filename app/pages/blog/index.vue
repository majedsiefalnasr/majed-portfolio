<script setup lang="ts">
  import type {BlogPost} from '~/types/content'

  const {queryContentByLocale} = useContentLocale()
  const {locale} = useI18n()

  // Fetch locale-specific blog posts using queryCollection (Nuxt Content v3)
  const {data: posts} = await useAsyncData('blog-posts', async () => {
    try {
      const result = await queryContentByLocale<BlogPost>('blog')
      
      // Sort by date (newest first)
      const sorted = (result || []).sort((a: BlogPost, b: BlogPost) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      })
      
      console.log('[blog/index] fetched posts:', sorted?.map((p: any) => ({title: p.title, _path: p._path})))
      console.log('[blog/index] total posts:', sorted?.length ?? 0)
      return sorted ?? []
    } catch (error) {
      console.error('[blog/index] Error:', error)
      return []
    }
  }, {watch: [locale]})

  // Get initial tag from URL
  const route = useRoute()
  const initialTag = route.query.tag as string | undefined

  // SEO meta tags
  const {t} = useI18n()

  useSeoMeta({
    title: t('blog.title', 'Blog'),
    description: t(
      'blog.description',
      'Read articles about web development, design, and technology'
    ),
    ogTitle: t('blog.title', 'Blog'),
    ogDescription: t(
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
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Blog</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Articles about web development, design, and technology
      </p>
    </div>

    <!-- Blog list with filtering -->
    <BlogList :posts="posts || []" :initial-tag="initialTag" />
  </Container>
</template>
