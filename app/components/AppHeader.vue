<script setup lang="ts">
  import type {AppHeaderProps, NavigationLink} from '../types/layout'
  import {STANDARD_NAV_LINKS} from '../types/layout'

  /**
   * AppHeader Component
   *
   * Main navigation header with logo and navigation links.
   * Logo positioned on start edge (left for LTR, right for RTL).
   */

  const props = withDefaults(defineProps<AppHeaderProps>(), {
    links: () => STANDARD_NAV_LINKS as unknown as NavigationLink[],
    showNav: true,
  })

  const {t} = useLanguage()
  const route = useRoute()
  const localePath = useLocalePath()

  // Compute active state and localized paths for navigation links
  const navLinks = computed(() => {
    return props.links.map(link => {
      const localizedPath = localePath(link.to)
      return {
        ...link,
        to: localizedPath,
        active: route.path === localizedPath,
      }
    })
  })
</script>

<template>
  <header
    class="bg-background-default-surface-layer-1 border-b border-border-default sticky top-0 z-50">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo (start edge - left for LTR, right for RTL) -->
        <div class="flex-shrink-0">
          <slot name="logo">
            <NuxtLink
              :to="localePath('/')"
              class="text-typography-title text-xl font-semibold hover:text-typography-link transition-colors"
              :aria-label="t('nav.home')">
              {{ logo || 'MS' }}
            </NuxtLink>
          </slot>
        </div>

        <!-- Navigation (end edge - right for LTR, left for RTL) -->
        <nav v-if="showNav" class="flex items-center gap-6" aria-label="Main navigation">
          <slot name="nav" :links="navLinks">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              :class="[
                'text-sm font-medium transition-colors',
                link.active
                  ? 'text-typography-link'
                  : 'text-typography-body hover:text-typography-title',
              ]"
              :aria-current="link.active ? 'page' : undefined">
              {{ t(link.label) }}
            </NuxtLink>
          </slot>
        </nav>
      </div>
    </div>
  </header>
</template>
