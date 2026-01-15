<script setup lang="ts">
  import {queryCollection} from '#imports'

  const route = useRoute()
  const {getContentPath} = useContentLocale()

  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
  const localizedPath = getContentPath(slug)

  // Fetch blog post with locale-specific path
  const {data: post} = await useAsyncData(`blog-${localizedPath}`, () =>
    queryCollection('blog').path(`/blog/${localizedPath}`).first()
  )

  // 404 if post not found
  if (!post.value) {
    throw createError({statusCode: 404, statusMessage: 'Post not found'})
  }

  // Calculate read time
  const readTime = useReadTime(post.value.body)

  // Get previous/next navigation (locale-specific)
  const {queryContentByLocale} = useContentLocale()
  const {data: allPosts} = await useAsyncData('all-blog-posts', () =>
    queryContentByLocale('blog').sort({date: -1}).find()
  )

  const posts = allPosts.value || []
  const currentIndex = posts.findIndex(p => p._path === post.value!.path)
  const navigation = computed(() => ({
    previous: posts[currentIndex + 1] || null,
    next: posts[currentIndex - 1] || null,
  }))

  // SEO
  useContentSEO(post.value, {ogType: 'article'})

  // Ensure Twitter Card type is set to summary_large_image
  useSeoMeta({
    twitterCard: 'summary_large_image',
  })

  // Add Article structured data (BlogPosting)
  useBlogPostStructuredData(post.value)

  // Add BreadcrumbList structured data
  useBreadcrumbSchema([
    {name: 'Home', url: '/'},
    {name: 'Blog', url: '/blog'},
    {name: post.value.title, url: post.value.path},
  ])

  // Add hreflang tags for bilingual content
  const basePath = post.value.path.replace(/\.ar$/, '')
  const alternateLinks = [
    {hreflang: 'en', href: basePath},
    {hreflang: 'ar', href: `${basePath}.ar`},
    {hreflang: 'x-default', href: basePath}, // x-default points to English version
  ]

  useHead({
    link: alternateLinks.map(link => ({
      rel: 'alternate',
      hreflang: link.hreflang,
      href: `https://majedsiefalnasr.dev${link.href}`,
    })),
  })
</script>

<template>
  <Container>
    <div class="mx-auto max-w-3xl py-12">
      <!-- Back to Blog -->
      <UButton to="/blog" variant="ghost" icon="i-heroicons-arrow-left" class="mb-8">
        Back to Blog
      </UButton>

      <!-- Post Header -->
      <header class="mb-8">
        <h1 class="mb-4 text-4xl font-bold">{{ post.title }}</h1>
        <BlogPostMeta
          :date="post.date"
          :read-time="readTime"
          :tags="post.tags"
          :author="post.author"
          :show-tags="true"
          :show-author="true" />
      </header>

      <!-- Featured Image -->
      <div v-if="post.featuredImage" class="mb-8">
        <NuxtImg
          :src="post.featuredImage"
          :alt="post.title"
          class="w-full rounded-lg"
          loading="eager" />
      </div>

      <!-- Content -->
      <article class="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer :value="post" />
      </article>

      <!-- Navigation -->
      <nav class="mt-12 border-t pt-8">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <UButton
            v-if="navigation?.previous"
            :to="navigation.previous.path"
            variant="outline"
            class="justify-start text-left">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Previous</div>
              <div class="font-semibold">{{ navigation.previous.title }}</div>
            </div>
          </UButton>
          <div v-else />
          <UButton
            v-if="navigation?.next"
            :to="navigation.next.path"
            variant="outline"
            class="justify-end text-right">
            <div>
              <div class="text-xs text-gray-500 dark:text-gray-400">Next</div>
              <div class="font-semibold">{{ navigation.next.title }}</div>
            </div>
          </UButton>
        </div>
      </nav>
    </div>
  </Container>
</template>
