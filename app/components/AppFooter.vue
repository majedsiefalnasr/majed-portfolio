<script setup lang="ts">
  import Icon from '@/components/ui/Icon.vue'
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

  // Handle theme toggle
  const handleToggleTheme = () => {
    toggleTheme()
  }

  // Handle language switch with navigation
  const handleLanguageSwitch = () => {
    const newLocale = locale.value === 'en' ? 'ar' : 'en'
    setLocale(newLocale)
  }

  // Format copyright text with current year
  const copyrightText = computed(() => {
    return t(props.copyright, {year: new Date().getFullYear()})
  })

  // Theme toggle button icon
  const themeIcon = computed(() => {
    return theme.value === 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'
  })
</script>

<template>
  <footer class="bg-background-default-surface-layer-1 border-t border-border-default mt-auto">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
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
                <Icon :icon="link.icon" class="w-5 h-5" />
              </a>
            </slot>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-4">
            <!-- Theme toggle -->
            <Button
              v-if="showThemeToggle"
              variant="ghost"
              size="icon"
              :aria-label="t('theme.toggle')"
              @click="handleToggleTheme">
              <Icon :icon="themeIcon" class="w-5 h-5" />
            </Button>

            <!-- Language switcher -->
            <Button
              v-if="showLanguageSwitcher"
              variant="ghost"
              size="sm"
              :aria-label="t('language.switch')"
              @click="handleLanguageSwitch">
              {{ locale === 'en' ? 'العربية' : 'English' }}
            </Button>
          </div>
        </div>

        <!-- Bottom row: Copyright -->
        <div class="text-typography-subtle text-sm text-center">
          <slot name="copyright" :text="copyrightText">
            {{ copyrightText }}
          </slot>
        </div>
      </div>
    </div>
  </footer>
</template>
