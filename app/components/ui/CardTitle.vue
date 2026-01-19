<script setup lang="ts">
interface CardTitleProps {
  class?: string
}

const props = defineProps<CardTitleProps>()
</script>

<template>
  <h3
    :class="
      ['leading-none font-semibold tracking-tight', props.class]
        .filter(Boolean)
        .join(' ')
    "
  >
    <slot />
  </h3>
</template>
