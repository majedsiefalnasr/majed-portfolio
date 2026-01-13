<script setup lang="ts">
  import type {AppFooterProps, SocialLink} from '../types/layout'
  import {STANDARD_SOCIAL_LINKS} from '../types/layout'

  /**
   * AppFooter Component
   *
   * Footer with social links, copyright, and theme/language toggles.
   */

  const props = withDefaults(defineProps<AppFooterProps>(), {
    socialLinks: () => STANDARD_SOCIAL_LINKS as unknown as SocialLink[],
    copyright: 'footer.copyright',
    showThemeToggle: true,
    showLanguageSwitcher: true,
  })

  const {theme, toggleTheme} = useTheme()
  const {locale, setLocale, t} = useLanguage()

  // Debug: Log when composables are initialized
  console.log('[AppFooter] Initialized with:', {
    theme: theme.value,
    locale: locale.value,
    toggleTheme: typeof toggleTheme,
    setLocale: typeof setLocale,
  })

  // Debug wrapper for toggleTheme
  const handleToggleTheme = () => {
    console.log('[AppFooter] Toggle theme clicked, current theme:', theme.value)
    toggleTheme()
    console.log('[AppFooter] After toggle, new theme:', theme.value)
  }

  // Debug wrapper for setLocale
  const handleLanguageSwitch = () => {
    console.log('[AppFooter] Current locale before switch:', locale.value)
    const newLocale = locale.value === 'en' ? 'ar' : 'en'
    console.log('[AppFooter] Language switch clicked, current:', locale.value, '→ new:', newLocale)
    setLocale(newLocale)
    console.log('[AppFooter] After switch, locale:', locale.value)
  }

  // Format copyright text with current year
  const copyrightText = computed(() => {
    return t(props.copyright, {year: new Date().getFullYear()})
  })

  // Theme toggle button icon
  const themeIcon = computed(() => {
    return theme.value === 'dark' ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
  })
</script>

<template>
  <footer class="bg-background-default-surface-layer-1 border-t border-border-default mt-auto">
    <Container>
      <div class="py-8 flex flex-col gap-6">
        <!-- Top row: Social links, Theme toggle, Language switcher -->
        <div class="flex items-center justify-between flex-wrap gap-4">
          <!-- Social links -->
          <div class="flex items-center gap-4">
            <slot name="social" :links="socialLinks">
              <a
                v-for="link in socialLinks"
                :key="link.platform"
                :href="link.url"
                :aria-label="t(link.label)"
                target="_blank"
                rel="noopener noreferrer"
                class="text-icon-subtle hover:text-icon-default transition-colors">
                <UIcon :name="link.icon" class="w-5 h-5" />
              </a>
            </slot>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-4">
            <!-- Theme toggle -->
            <button
              v-if="showThemeToggle"
              @click="handleToggleTheme"
              :aria-label="t('theme.toggle')"
              class="p-2 rounded-lg bg-background-default-surface-base hover:bg-background-neutral-default transition-colors">
              <UIcon :name="themeIcon" class="w-5 h-5 text-icon-subtle" />
            </button>

            <!-- Language switcher -->
            <button
              v-if="showLanguageSwitcher"
              @click="handleLanguageSwitch"
              :aria-label="t('language.switch')"
              class="px-3 py-2 rounded-lg bg-background-default-surface-base hover:bg-background-neutral-default text-typography-body text-sm font-medium transition-colors">
              {{ locale === 'en' ? 'العربية' : 'English' }}
            </button>
          </div>
        </div>

        <!-- Bottom row: Copyright -->
        <div class="text-typography-subtle text-sm text-center">
          <slot name="copyright" :text="copyrightText">
            {{ copyrightText }}
          </slot>
        </div>
      </div>
    </Container>
  </footer>
</template>
