<script setup lang="ts">
interface CardFooterProps {
  class?: string
}

const props = defineProps<CardFooterProps>()
</script>

<template>
  <div :class="['flex items-center p-6 pt-0', props.class].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>
