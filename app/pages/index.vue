<template>
  <div class="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-foreground mb-4 text-4xl font-bold">
        {{ $t('site.title') }}
      </h1>
      <p class="text-muted-foreground text-lg">
        {{ $t('site.description') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags using custom composable
useHomepageSEO()

// Add Person structured data for homepage
usePersonSchema({
  name: 'Majed Sief Alnasr',
  jobTitle: 'Full Stack Developer',
  description: t('site.description'),
  url: 'https://majedsiefalnasr.dev',
  sameAs: [
    // Add social media profiles if available
  ],
})
</script>
