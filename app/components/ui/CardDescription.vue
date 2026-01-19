<script setup lang="ts">
interface CardDescriptionProps {
  class?: string
}

const props = defineProps<CardDescriptionProps>()
</script>

<template>
  <p
    :class="
      ['text-muted-foreground text-sm', props.class].filter(Boolean).join(' ')
    "
  >
    <slot />
  </p>
</template>
