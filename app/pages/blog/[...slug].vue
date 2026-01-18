<script setup lang="ts">
  import {queryCollection} from '#imports'
  import Icon from '@/components/ui/Icon.vue'
  import {calculateReadTime} from '~/utils/content/read-time'

  const route = useRoute()
  const {switchContentLanguage, getAvailableLanguages} = useContentLanguage()

  // Determine if this is an Arabic route (starts with ar/blog/)
  const isArabicRoute = route.path.startsWith('/ar/blog/')

  // Fetch blog post by path
  const {data: post} = await useAsyncData(`blog-${route.path}`, () =>
    queryCollection('blog').path(route.path).first()
  )

  // 404 if post not found
  if (!post.value) {
    throw createError({statusCode: 404, statusMessage: 'Post not found', fatal: true})
  }

  // Back button URL based on current language
  const backToBlogUrl = computed(() => (isArabicRoute ? '/ar/blog' : '/blog'))

  const readTime = calculateReadTime(post.value.body)

  // Get previous/next navigation (locale-specific)
  const {data: nav} = await useContentNavigation(post.value!, 'blog')
  const navigation = computed(() => ({
    previous: nav.value?.previous || null,
    next: nav.value?.next || null,
  }))

  // Language switching
  const availableLanguages = computed(() => getAvailableLanguages(post.value!))
  const handleLanguageSwitch = async (newLang: string) => {
    await switchContentLanguage(newLang as 'en' | 'ar', post.value!)
  }

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
    {name: post.value.title, url: post.value._path},
  ])
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-3xl py-12">
      <!-- Back to Blog -->
      <Button variant="ghost" as-child class="mb-8">
        <NuxtLink :to="backToBlogUrl">
          <Icon icon="radix-icons:arrow-left" class="me-2 h-4 w-4" />
          Back to Blog
        </NuxtLink>
      </Button>

      <!-- Post Header -->
      <header class="mb-8">
        <div class="flex items-center justify-between mb-4">
          <h1 class="text-4xl font-bold">{{ post.title }}</h1>
          <!-- Language Switcher -->
          <div v-if="availableLanguages.length > 1" class="flex gap-2">
            <button
              v-for="lang in availableLanguages"
              :key="lang.lang"
              @click="handleLanguageSwitch(lang.lang)"
              :class="[
                'px-3 py-1 text-sm rounded-md transition-colors',
                post.lang === lang.lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
              ]">
              {{ lang.lang === 'en' ? 'English' : 'العربية' }}
            </button>
          </div>
        </div>
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
          <Button
            v-if="navigation?.previous"
            variant="outline"
            as-child
            class="justify-start text-left">
            <NuxtLink :to="navigation.previous.path">
              <div>
                <div class="text-xs text-muted-foreground">Previous</div>
                <div class="font-semibold">{{ navigation.previous.title }}</div>
              </div>
            </NuxtLink>
          </Button>
          <div v-else />
          <Button v-if="navigation?.next" variant="outline" as-child class="justify-end text-right">
            <NuxtLink :to="navigation.next.path">
              <div>
                <div class="text-xs text-muted-foreground">Next</div>
                <div class="font-semibold">{{ navigation.next.title }}</div>
              </div>
            </NuxtLink>
          </Button>
        </div>
      </nav>
    </div>
  </div>
</template>
