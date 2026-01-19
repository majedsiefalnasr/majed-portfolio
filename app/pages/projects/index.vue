<template>
  <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div class="mb-12">
      <h1 class="text-foreground mb-4 text-4xl font-bold">Projects</h1>
      <p class="text-muted-foreground text-lg">Check out my latest work</p>
    </div>
    <p class="text-muted-foreground">Coming soon...</p>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useSEO({
  title: t('nav.projects', 'Projects'),
  description: 'Explore my portfolio of web development projects',
  ogType: 'website',
})
</script>
