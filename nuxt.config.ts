// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2026-01-12',
  devtools: {enabled: true},

  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],

  modules: [
    '@nuxtjs/color-mode',
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

  colorMode: {
    classSuffix: '',
  },

  css: ['~/assets/css/main.css'],

  vite: {
    plugins: [tailwindcss()],
  },

  // Hybrid rendering: Pre-render specific routes at build time
  routeRules: {
    '/': {prerender: true},
    '/blog': {prerender: true},
    '/blog/**': {prerender: true}, // Pre-render all blog posts
    '/case-studies': {prerender: true},
    '/case-studies/**': {prerender: true}, // Pre-render all case studies
    '/ar/blog/**': {prerender: true},
    '/ar/case-studies/**': {prerender: true},
  },

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
    url: 'https://majedsiefalnasr.dev',
    name: 'Majed Sief Alnasr',
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

  sitemap: {
    enabled: true,
    xsl: false, // Disable XSL transformation for better performance
    credits: false, // Disable credits comment in sitemap
    // Static pages sitemap configuration
    urls: [
      {
        loc: '/',
        changefreq: 'weekly',
        priority: 1.0,
      },
      {
        loc: '/blog',
        changefreq: 'weekly',
        priority: 0.9,
      },
      {
        loc: '/case-studies',
        changefreq: 'weekly',
        priority: 0.9,
      },
    ],
    // Dynamic content sources are handled by server/api/__sitemap__/* files
    sources: ['/api/__sitemap__/blog', '/api/__sitemap__/case-studies'],
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

  image: {
    // Optimize images for performance (Core Web Vitals)
    format: ['webp', 'avif'], // Modern formats with better compression
    quality: 80, // Balance between quality and file size
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true, // Crawl links to discover routes automatically
      failOnError: false,
    },
  },

  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Automatically discover and add all blog posts and case studies to prerender
      // This ensures all content is pre-rendered at build time
      const {getPrerenderRoutes} = await import('./scripts/get-prerender-routes')
      const routes = await getPrerenderRoutes()

      nitroConfig.prerender = nitroConfig.prerender || {}
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || []

      routes.forEach(route => {
        if (!nitroConfig.prerender!.routes!.includes(route)) {
          nitroConfig.prerender!.routes!.push(route)
        }
      })
    },
  },
})
