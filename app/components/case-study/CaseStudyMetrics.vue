<script setup lang="ts">
  import type {CaseStudyMetricsProps} from '~/types/content'

  const props = withDefaults(defineProps<CaseStudyMetricsProps>(), {
    layout: 'grid',
  })
</script>

<template>
  <div class="case-study-metrics">
    <div
      :class="[
        'gap-6',
        layout === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          : 'flex flex-col space-y-4',
      ]">
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="metric-item bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
              {{ metric.value }}
            </div>
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ metric.label }}
            </div>
          </div>
          <div v-if="metric.icon" class="ml-4">
            <UIcon :name="metric.icon" class="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
