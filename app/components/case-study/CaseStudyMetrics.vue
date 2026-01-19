<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { CaseStudyMetricsProps } from '~/types/content'

withDefaults(defineProps<CaseStudyMetricsProps>(), {
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
      ]"
    >
      <div
        v-for="metric in metrics"
        :key="metric.label"
        class="metric-item bg-card rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md"
      >
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="text-foreground mb-1 text-2xl font-bold">
              {{ metric.value }}
            </div>
            <div class="text-muted-foreground text-sm">
              {{ metric.label }}
            </div>
          </div>
          <div v-if="metric.icon" class="ms-4">
            <Icon :icon="metric.icon" class="text-primary-500 h-8 w-8" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
