<script setup lang="ts">
  import type {CaseStudy} from '~/types/content'

  const {queryContentByLocale} = useContentLocale()
  const {locale} = useI18n()

  const route = useRoute()

  // Fetch locale-specific case studies using queryCollection (Nuxt Content v3)
  // Key includes locale to ensure content refetches when language changes
  const {data: caseStudiesRaw} = await useAsyncData(
    () => `case-studies-${locale.value}`,
    async () => {
      try {
        const result = await queryContentByLocale<CaseStudy>('caseStudies')
        return result ?? []
      } catch {
        // Silently handle errors and return empty array
        return []
      }
    },
    {watch: [locale]}
  )

  // Sort case studies: featured first, then by order, then by date
  const caseStudies = computed(() => {
    if (!caseStudiesRaw.value) return []
    return [...caseStudiesRaw.value].sort((a, b) => {
      // Featured items first
      if ((a.featured || false) !== (b.featured || false)) {
        return b.featured || false ? 1 : -1
      }
      // Then by custom order (lower = higher priority)
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order
      }
      // Finally by date (newest first)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  })

  // Get initial tag from URL (not used in list rendering)
  const initialTag = route.query.tag as string | undefined

  // SEO meta tags
  const {t} = useI18n()

  useSEO({
    title: t('caseStudies.title', 'Case Studies'),
    description: t(
      'caseStudies.description',
      'Portfolio of web development projects and client work showcasing expertise in modern frameworks and best practices'
    ),
    ogType: 'website',
  })
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-4">Case Studies</h1>
      <p class="text-lg text-muted-foreground">
        Portfolio of web development projects and client work showcasing expertise in modern
        frameworks and best practices
      </p>
    </div>

    <!-- Case studies list with filtering -->
    <CaseStudyList :case-studies="caseStudies || []" :initial-tag="initialTag" />
  </div>
</template>
