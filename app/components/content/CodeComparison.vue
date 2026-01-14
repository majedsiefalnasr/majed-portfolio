<script setup lang="ts">
  import type {CodeComparisonProps} from '~/types/content'

  withDefaults(defineProps<CodeComparisonProps>(), {
    language: 'javascript',
    labels: () => ['Before', 'After'],
  })
</script>

<template>
  <div class="code-comparison bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Before column -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-semibold text-red-600 dark:text-red-400">
            {{ labels[0] }}
          </h4>
          <UIcon name="i-heroicons-minus-circle" class="h-4 w-4 text-red-500" />
        </div>
        <div
          class="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md p-3">
          <slot name="before">
            <pre
              class="text-sm text-red-800 dark:text-red-200"><code>// Before code here</code></pre>
          </slot>
        </div>
      </div>

      <!-- After column -->
      <div class="space-y-2">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-semibold text-green-600 dark:text-green-400">
            {{ labels[1] }}
          </h4>
          <UIcon name="i-heroicons-plus-circle" class="h-4 w-4 text-green-500" />
        </div>
        <div
          class="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-md p-3">
          <slot name="after">
            <pre
              class="text-sm text-green-800 dark:text-green-200"><code>// After code here</code></pre>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>
