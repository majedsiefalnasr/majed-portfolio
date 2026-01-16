<script setup lang="ts">
interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()
</script>

<template>
  <div :class="['rounded-xl border bg-card text-card-foreground shadow', props.class].filter(Boolean).join(' ')">
    <slot />
  </div>
</template>
