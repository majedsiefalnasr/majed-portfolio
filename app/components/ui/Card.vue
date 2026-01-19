<script setup lang="ts">
interface CardProps {
  class?: string
}

const props = defineProps<CardProps>()
</script>

<template>
  <div
    :class="
      ['bg-card text-card-foreground rounded-xl border shadow', props.class]
        .filter(Boolean)
        .join(' ')
    "
  >
    <slot />
  </div>
</template>
