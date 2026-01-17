<script setup lang="ts">
  import {queryCollection} from '#imports'
  import Icon from '@/components/ui/Icon.vue'

  const route = useRoute()
  const {switchContentLanguage, getAvailableLanguages} = useContentLanguage()

  // Determine if this is an Arabic route (starts with ar/case-studies/)
  const isArabicRoute = route.path.startsWith('/ar/case-studies/')

  // Fetch case study by path
  const {data: study} = await useAsyncData(`case-study-${route.path}`, () =>
    queryCollection('caseStudies')
      .all()
      .then(items => items.find(item => item.path === route.path) || null)
  )

  // Handle 404
  if (!study.value) {
    throw createError({statusCode: 404, statusMessage: 'Case study not found'})
  }

  const caseStudy = study.value

  // Back button URL based on current language
  const backToCaseStudiesUrl = computed(() =>
    isArabicRoute ? '/ar/case-studies' : '/case-studies'
  )

  // Get navigation links (locale-specific)
  const {previous, next} = await useContentNavigation(caseStudy.path, 'caseStudies')

  // Language switching
  const availableLanguages = computed(() => getAvailableLanguages(caseStudy))
  const handleLanguageSwitch = async (newLang: string) => {
    await switchContentLanguage(newLang as 'en' | 'ar', caseStudy)
  }

  // SEO meta tags
  useContentSEO(caseStudy, {ogType: 'article'})

  // Ensure Twitter Card type is set to summary_large_image
  useSeoMeta({
    twitterCard: 'summary_large_image',
  })

  // Add CreativeWork structured data
  useCaseStudyStructuredData(caseStudy)

  // Add BreadcrumbList structured data
  useBreadcrumbSchema([
    {name: 'Home', url: '/'},
    {name: 'Case Studies', url: '/case-studies'},
    {name: caseStudy.title, url: caseStudy._path},
  ])
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Hero section -->
    <div class="mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Content -->
        <div class="space-y-6">
          <div class="flex items-center space-x-4 text-sm text-muted-foreground">
            <span class="font-medium">{{ caseStudy.client }}</span>
            <span>•</span>
            <span>{{ caseStudy.role }}</span>
            <span>•</span>
            <span>{{ caseStudy.timeline }}</span>
          </div>

          <h1 class="text-4xl font-bold text-foreground">
            {{ caseStudy.title }}
          </h1>

          <p class="text-lg text-muted-foreground">
            {{ caseStudy.excerpt }}
          </p>

          <!-- Language Switcher -->
          <div v-if="availableLanguages.length > 1" class="flex gap-2 mt-4">
            <button
              v-for="lang in availableLanguages"
              :key="lang.lang"
              @click="handleLanguageSwitch(lang.lang)"
              :class="[
                'px-3 py-1 text-sm rounded-md transition-colors',
                caseStudy.lang === lang.lang
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600',
              ]">
              {{ lang.lang === 'en' ? 'English' : 'العربية' }}
            </button>
          </div>

          <!-- Tags -->
          <div v-if="caseStudy.tags && caseStudy.tags.length > 0" class="flex flex-wrap gap-2">
            <Badge v-for="tag in caseStudy.tags" :key="tag" variant="secondary">
              {{ tag }}
            </Badge>
          </div>
        </div>

        <!-- Featured image -->
        <div v-if="caseStudy.featuredImage" class="relative">
          <NuxtImg
            :src="caseStudy.featuredImage"
            :alt="caseStudy.title"
            class="w-full h-64 lg:h-80 object-cover rounded-lg shadow-lg"
            loading="lazy" />
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="prose prose-lg dark:prose-invert max-w-none">
      <ContentRenderer :value="caseStudy" />
    </div>

    <!-- Navigation -->
    <div class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div class="flex items-center justify-between">
        <div v-if="previous" class="flex-1">
          <NuxtLink
            :to="previous.path"
            class="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
            <Icon
              icon="radix-icons:arrow-left"
              class="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-500">Previous</div>
              <div class="font-medium">{{ previous.title }}</div>
            </div>
          </NuxtLink>
        </div>

        <div class="flex-1 text-center">
          <NuxtLink
            :to="backToCaseStudiesUrl"
            class="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Icon icon="radix-icons:arrow-left" class="h-4 w-4" />
            <span>Back to Case Studies</span>
          </NuxtLink>
        </div>

        <div v-if="next" class="flex-1 text-end">
          <NuxtLink
            :to="next.path"
            class="flex items-center justify-end space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
            <div class="text-end">
              <div class="text-sm text-gray-500 dark:text-gray-500">Next</div>
              <div class="font-medium">{{ next.title }}</div>
            </div>
            <Icon
              icon="radix-icons:arrow-right"
              class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
