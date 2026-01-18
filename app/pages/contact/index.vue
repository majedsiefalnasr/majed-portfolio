<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <div class="mb-12">
      <h1 class="text-4xl font-bold text-foreground mb-4">
        Contact
      </h1>
      <p class="text-lg text-muted-foreground">
        Get in touch
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
    title: t('nav.contact', 'Contact'),
    description: 'Contact me - Full Stack Developer',
    ogType: 'website',
  })
</script>
