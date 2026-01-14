// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-01-12',
  devtools: {enabled: true},

  modules: [
    '@nuxt/ui',
    '@nuxt/fonts',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ],

  css: ['~/assets/css/main.css'],

  fonts: {
    families: [{name: 'Geist', provider: 'google'}],
    defaults: {
      fallbacks: {
        'sans-serif': [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },

  site: {
    url: 'https://majed-portfolio.vercel.app',
    name: 'Majed Sief Alnasr - Portfolio',
  },

  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        dir: 'ltr',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'ar',
        language: 'ar-EG',
        dir: 'rtl',
        name: 'العربية',
        file: 'ar.json',
      },
    ],
    langDir: './',
    detectBrowserLanguage: {
      useCookie: false,
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

  content: {
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
    },
    markdown: {
      anchorLinks: false,
    },
    ignores: [
      '**/_*.md', // Exclude draft files with underscore prefix
    ],
  },

  nitro: {
    prerender: {
      routes: ['/blog', '/case-studies'],
      crawlLinks: true, // Auto-discover blog posts and case studies
    },
  },
})
