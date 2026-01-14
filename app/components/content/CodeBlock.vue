<script setup lang="ts">
  import {ref} from 'vue'

  export interface CodeBlockProps {
    code: string // Code content
    language?: string // Language for highlighting
    filename?: string // Optional filename display
    showLineNumbers?: boolean // Show line numbers (default: false)
    highlights?: number[] // Line numbers to highlight
  }

  const props = withDefaults(defineProps<CodeBlockProps>(), {
    language: 'typescript',
    showLineNumbers: false,
    highlights: () => [],
    filename: undefined,
  })

  const emit = defineEmits<{
    copy: [code: string]
  }>()

  const copied = ref(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.code)
      copied.value = true
      emit('copy', props.code)
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }
</script>

<template>
  <div class="code-block group relative">
    <!-- Filename bar (optional) -->
    <div
      v-if="filename"
      class="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-t">
      <UIcon
        name="i-heroicons-document-code"
        class="h-4 w-4 mr-2 text-gray-600 dark:text-gray-400" />
      <span class="text-sm font-mono text-gray-600 dark:text-gray-400">{{ filename }}</span>
    </div>

    <!-- Code container -->
    <div class="relative bg-gray-900 dark:bg-gray-950 rounded-b overflow-hidden">
      <!-- Copy button -->
      <UButton
        :icon="copied ? 'i-heroicons-check' : 'i-heroicons-document-duplicate'"
        :color="copied ? 'green' : 'gray'"
        variant="ghost"
        size="sm"
        class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
        @click="copyToClipboard">
        {{ copied ? 'Copied' : 'Copy' }}
      </UButton>

      <!-- Code content -->
      <pre
        class="p-4 overflow-x-auto text-sm leading-relaxed text-gray-100 font-mono"
        :class="{'pt-12': filename}"><code class="language-none">{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
  .code-block {
    @apply my-4;
  }
</style>
