// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-12',
  devtools: {enabled: true},

  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/hints',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ],

  css: ['~/assets/css/main.css'],

  site: {
    url: 'https://majed-portfolio.vercel.app',
    name: 'Majed Sief Alnasr - Portfolio',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: './',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        dir: 'ltr',
        file: 'en.json',
        name: 'English',
      },
      {
        code: 'ar',
        language: 'ar-EG',
        dir: 'rtl',
        file: 'ar.json',
        name: 'العربية',
      },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    },
  },

  seo: {
    meta: {
      description: 'Portfolio showcasing work and insights',
      ogImage: '/og-image.svg',
      twitterCard: 'summary_large_image',
    },
  },
})
