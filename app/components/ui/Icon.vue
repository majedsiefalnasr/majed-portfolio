<script setup lang="ts">
  import {Icon as IconifyIcon} from '@iconify/vue'

  interface IconProps {
    icon: string
    class?: string
    width?: string | number
    height?: string | number
  }

  withDefaults(defineProps<IconProps>(), {
    class: 'h-4 w-4',
    width: undefined,
    height: undefined,
  })
</script>

<template>
  <IconifyIcon :icon="icon" :class="$props.class" :width="width" :height="height" />
</template>
