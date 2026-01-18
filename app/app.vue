<script setup lang="ts">
  import {Analytics} from '@vercel/analytics/nuxt'
  import {SpeedInsights} from '@vercel/speed-insights/nuxt'

  const {locale, direction} = useLanguage()

  // Update html attributes when locale changes
  useHead({
    htmlAttrs: {
      lang: locale,
      dir: direction,
    },
    // Preconnect to critical domains for performance
    link: [
      {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossorigin: 'anonymous',
      },
    ],
  })
</script>

<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-black dark:text-white">
    <AppHeader />

    <main class="flex-1">
      <NuxtPage />
    </main>

    <AppFooter />
  </div>

  <!-- Vercel Speed Insights -->
  <SpeedInsights />
  <!-- Vercel Analytics -->
  <Analytics />
</template>
