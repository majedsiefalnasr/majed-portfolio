<script setup lang="ts">
  import type {ContainerProps} from '../types/layout'
  import {DEFAULT_BREAKPOINTS, DEFAULT_PADDING} from '../types/layout'

  /**
   * Container Component
   *
   * Responsive width-constrained wrapper with automatic horizontal padding.
   * Uses Tailwind default breakpoints for consistency.
   */

  const props = withDefaults(defineProps<ContainerProps>(), {
    as: 'div',
    config: () => ({
      centered: true,
      maxWidth: DEFAULT_BREAKPOINTS,
      padding: DEFAULT_PADDING,
    }),
  })

  // Merge user config with defaults
  const mergedConfig = computed(() => ({
    centered: props.config?.centered ?? true,
    maxWidth: {...DEFAULT_BREAKPOINTS, ...props.config?.maxWidth},
    padding: {...DEFAULT_PADDING, ...props.config?.padding},
  }))

  // Generate responsive classes
  const containerClasses = computed(() => {
    const classes: string[] = []

    // Center with auto margins
    if (mergedConfig.value.centered) {
      classes.push('mx-auto')
    }

    // Responsive max-width (using Tailwind's container utility)
    classes.push('container')

    // Responsive padding (using logical properties for RTL)
    classes.push('px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-8')

    return classes.join(' ')
  })
</script>

<template>
  <component :is="as" :class="containerClasses">
    <slot />
  </component>
</template>
