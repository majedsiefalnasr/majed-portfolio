<script setup lang="ts">
  import type {CaseStudyCardProps} from '~/types/content'

  const props = withDefaults(defineProps<CaseStudyCardProps>(), {
    featured: false,
  })

  // Handle card click
  const router = useRouter()
  const handleClick = () => {
    router.push(props.caseStudy.path)
  }
</script>

<template>
  <UCard
    class="cursor-pointer transition-all hover:shadow-lg group relative overflow-hidden"
    @click="handleClick">
    <!-- Featured badge -->
    <div v-if="featured || caseStudy.featured" class="absolute top-4 right-4 z-10">
      <UBadge variant="solid" color="primary" class="text-xs font-medium"> Featured </UBadge>
    </div>

    <!-- Featured image -->
    <div v-if="caseStudy.featuredImage" class="mb-4 -mx-6 -mt-6 relative">
      <NuxtImg
        :src="caseStudy.featuredImage"
        :alt="caseStudy.title"
        class="w-full h-48 object-cover rounded-t-lg transition-transform group-hover:scale-105"
        loading="lazy" />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-t-lg"></div>
    </div>

    <!-- Project title -->
    <h3 class="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
      {{ caseStudy.title }}
    </h3>

    <!-- Client and role -->
    <div class="mb-3 space-y-1">
      <p class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ caseStudy.client }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ caseStudy.role }}
      </p>
    </div>

    <!-- Timeline -->
    <div class="mb-3">
      <p class="text-sm text-gray-500 dark:text-gray-500">
        <UIcon name="i-heroicons-calendar" class="inline w-4 h-4 mr-1" />
        {{ caseStudy.timeline }}
      </p>
    </div>

    <!-- Tags -->
    <div v-if="caseStudy.tags && caseStudy.tags.length > 0" class="mb-4">
      <div class="flex flex-wrap gap-1">
        <UBadge
          v-for="tag in caseStudy.tags.slice(0, 3)"
          :key="tag"
          variant="soft"
          size="sm"
          class="text-xs">
          {{ tag }}
        </UBadge>
        <UBadge v-if="caseStudy.tags.length > 3" variant="soft" size="sm" class="text-xs">
          +{{ caseStudy.tags.length - 3 }}
        </UBadge>
      </div>
    </div>

    <!-- View project link -->
    <div class="mt-4">
      <UButton variant="link" trailing-icon="i-heroicons-arrow-right" :padded="false">
        View project
      </UButton>
    </div>
  </UCard>
</template>
