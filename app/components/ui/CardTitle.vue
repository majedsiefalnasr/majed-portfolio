<script setup lang="ts">
interface CardTitleProps {
  class?: string
}

const props = defineProps<CardTitleProps>()
</script>

<template>
  <h3 :class="['font-semibold leading-none tracking-tight', props.class].filter(Boolean).join(' ')">
    <slot />
  </h3>
</template>
