<script setup lang="ts">
interface CardContentProps {
  class?: string
}

const props = defineProps<CardContentProps>()
</script>

<template>
  <div :class="['p-6 pt-0', props.class].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>
