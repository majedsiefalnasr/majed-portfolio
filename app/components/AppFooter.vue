<script setup lang="ts">
  import Icon from '@/components/ui/Icon.vue'
  import type {AppFooterProps, SocialLink} from '../types/layout'
  import {STANDARD_SOCIAL_LINKS} from '../types/layout'

  const props = withDefaults(defineProps<AppFooterProps>(), {
    socialLinks: () => STANDARD_SOCIAL_LINKS as SocialLink[],
    copyright: 'footer.copyright',
    showThemeToggle: true,
    showLanguageSwitcher: true,
  })

  const {theme, toggleTheme} = useTheme()
  const {locale, setLocale, t} = useLanguage()

  const nextLocale = computed(() => (locale.value === 'en' ? 'ar' : 'en'))
  const toggleLanguage = () => setLocale(nextLocale.value)

  const copyrightText = computed(() => t(props.copyright, {year: new Date().getFullYear()}))

  const themeIcon = computed(() =>
    theme.value === 'dark' ? 'radix-icons:moon' : 'radix-icons:sun'
  )
</script>

<template>
  <footer class="bg-background-default-surface-layer-1 border-t mt-auto">
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
              @click="toggleTheme">
              <Icon :icon="themeIcon" class="w-5 h-5" />
            </Button>

            <!-- Language switcher -->
            <Button
              v-if="showLanguageSwitcher"
              variant="ghost"
              size="sm"
              :aria-label="t('language.switch')"
              @click="toggleLanguage">
              {{ nextLocale === 'en' ? 'English' : 'العربية' }}
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
