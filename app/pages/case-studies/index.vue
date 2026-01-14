<script setup lang="ts">
  import type {CaseStudy} from '~/types/content'

  const {queryContentByLocale} = useContentLocale()
  const {locale} = useI18n()

  // Fetch locale-specific case studies using queryCollection (Nuxt Content v3)
  const {data: caseStudiesRaw} = await useAsyncData('case-studies', async () => {
    try {
      const result = await queryContentByLocale<CaseStudy>('caseStudies')
      
      console.log('[case-studies/index] fetched case studies:', result?.map((s: any) => ({title: s.title, _path: s._path})))
      console.log('[case-studies/index] total case studies:', result?.length ?? 0)
      return result ?? []
    } catch (error) {
      console.error('[case-studies/index] Error:', error)
      return []
    }
  }, {watch: [locale]})

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

  // Get initial tag from URL
  const route = useRoute()
  const initialTag = route.query.tag as string | undefined

  // SEO meta tags
  const {t} = useI18n()

  useSeoMeta({
    title: t('caseStudies.title', 'Case Studies'),
    description: t(
      'caseStudies.description',
      'Portfolio of web development projects and client work showcasing expertise in modern frameworks and best practices'
    ),
    ogTitle: t('caseStudies.title', 'Case Studies'),
    ogDescription: t(
      'caseStudies.description',
      'Portfolio of web development projects and client work showcasing expertise in modern frameworks and best practices'
    ),
    ogType: 'website',
  })
</script>

<template>
  <Container class="py-12">
    <!-- Header -->
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Case Studies</h1>
      <p class="text-lg text-gray-600 dark:text-gray-400">
        Portfolio of web development projects and client work showcasing expertise in modern
        frameworks and best practices
      </p>
    </div>

    <!-- Case studies list with filtering -->
    <CaseStudyList :case-studies="caseStudies || []" />
  </Container>
</template>
