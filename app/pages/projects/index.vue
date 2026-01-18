<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-4">
        Projects
      </h1>
      <p class="text-lg text-muted-foreground">
        Check out my latest work
      </p>
    </div>
    <p class="text-muted-foreground">
      Coming soon...
    </p>
  </div>
</template>

<script setup lang="ts">
  const {t} = useI18n()

  useSEO({
    title: t('nav.projects', 'Projects'),
    description: 'Explore my portfolio of web development projects',
    ogType: 'website',
  })
</script>
