<script setup lang="ts">
  import type {ContentImageProps} from '~/types/content'

  withDefaults(defineProps<ContentImageProps>(), {
    lazy: true,
  })
</script>

<template>
  <figure class="my-8">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="lazy ? 'lazy' : 'eager'"
      class="w-full rounded-lg shadow-md"
      sizes="sm:640px md:768px lg:1024px" />
    <figcaption v-if="caption" class="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
      {{ caption }}
    </figcaption>
  </figure>
</template>
