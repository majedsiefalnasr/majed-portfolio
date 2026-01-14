<script setup lang="ts">
  interface MDCErrorProps {
    componentName?: string
    error?: Error | string
  }

  const props = defineProps<MDCErrorProps>()

  const errorMessage = computed(() => {
    if (typeof props.error === 'string') {
      return props.error
    }
    if (props.error instanceof Error) {
      return props.error.message
    }
    return `Failed to render ${props.componentName || 'component'}`
  })
</script>

<template>
  <div
    class="my-4 p-4 border border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950 rounded-lg">
    <div class="flex items-start gap-3">
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
      <div class="flex-1">
        <h3 class="font-semibold text-red-800 dark:text-red-200">
          {{ componentName ? `${componentName} Component Error` : 'Component Error' }}
        </h3>
        <p class="text-sm text-red-700 dark:text-red-300 mt-1">
          {{ errorMessage }}
        </p>
        <p class="text-xs text-red-600 dark:text-red-400 mt-2">
          Please check the component syntax and props in your markdown.
        </p>
      </div>
    </div>
  </div>
</template>
