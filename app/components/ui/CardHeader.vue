<script setup lang="ts">
interface CardHeaderProps {
  class?: string
}

const props = defineProps<CardHeaderProps>()
</script>

<template>
  <div :class="['flex flex-col gap-y-1.5 p-6', props.class].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>
