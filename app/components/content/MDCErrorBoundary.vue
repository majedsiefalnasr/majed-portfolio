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
    class="my-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900 dark:bg-red-950"
  >
    <div class="flex items-start gap-3">
      <UIcon
        name="i-heroicons-exclamation-triangle"
        class="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400"
      />
      <div class="flex-1">
        <h3 class="font-semibold text-red-800 dark:text-red-200">
          {{
            componentName
              ? `${componentName} Component Error`
              : 'Component Error'
          }}
        </h3>
        <p class="mt-1 text-sm text-red-700 dark:text-red-300">
          {{ errorMessage }}
        </p>
        <p class="mt-2 text-xs text-red-600 dark:text-red-400">
          Please check the component syntax and props in your markdown.
        </p>
      </div>
    </div>
  </div>
</template>
