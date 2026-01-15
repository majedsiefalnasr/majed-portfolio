<script setup lang="ts">
  import {queryCollection} from '#imports'

  const route = useRoute()
  const {getContentPath} = useContentLocale()

  const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
  const localizedPath = getContentPath(slug)

  // Fetch case study with locale-specific path
  const {data: study} = await useAsyncData(`case-study-${localizedPath}`, () =>
    queryCollection('caseStudies').path(`/case-studies/${localizedPath}`).first()
  )

  // Handle 404
  if (!study.value) {
    throw createError({statusCode: 404, statusMessage: 'Case study not found'})
  }

  const caseStudy = study.value

  // Get navigation links (locale-specific)
  const {previous, next} = await useContentNavigation(caseStudy.path, 'caseStudies')

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
    {name: caseStudy.title, url: caseStudy.path},
  ])

  // Add hreflang tags for bilingual content
  const basePath = caseStudy.path.replace(/\.ar$/, '')
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
  <Container class="py-12">
    <!-- Hero section -->
    <div class="mb-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <!-- Content -->
        <div class="space-y-6">
          <div class="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <span class="font-medium">{{ caseStudy.client }}</span>
            <span>•</span>
            <span>{{ caseStudy.role }}</span>
            <span>•</span>
            <span>{{ caseStudy.timeline }}</span>
          </div>

          <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100">
            {{ caseStudy.title }}
          </h1>

          <p class="text-lg text-gray-600 dark:text-gray-400">
            {{ caseStudy.excerpt }}
          </p>

          <!-- Tags -->
          <div v-if="caseStudy.tags && caseStudy.tags.length > 0" class="flex flex-wrap gap-2">
            <UBadge v-for="tag in caseStudy.tags" :key="tag" variant="soft" size="sm">
              {{ tag }}
            </UBadge>
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
            <UIcon
              name="i-heroicons-arrow-left"
              class="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <div>
              <div class="text-sm text-gray-500 dark:text-gray-500">Previous</div>
              <div class="font-medium">{{ previous.title }}</div>
            </div>
          </NuxtLink>
        </div>

        <div class="flex-1 text-center">
          <NuxtLink
            to="/case-studies"
            class="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <UIcon name="i-heroicons-arrow-left" class="h-4 w-4" />
            <span>Back to Case Studies</span>
          </NuxtLink>
        </div>

        <div v-if="next" class="flex-1 text-right">
          <NuxtLink
            :to="next.path"
            class="flex items-center justify-end space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors group">
            <div class="text-right">
              <div class="text-sm text-gray-500 dark:text-gray-500">Next</div>
              <div class="font-medium">{{ next.title }}</div>
            </div>
            <UIcon
              name="i-heroicons-arrow-right"
              class="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </Container>
</template>
