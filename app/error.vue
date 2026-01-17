<script setup lang="ts">
  import Icon from '@/components/ui/Icon.vue'
  /**
   * Custom 404 Error Page
   *
   * Provides SEO-optimized error page with helpful navigation
   * and proper HTTP status code (404)
   */

  const error = useError()
  const {t: _t} = useI18n()

  // Check if we're in development mode
  const isDev = computed(() => import.meta.dev)

  // SEO metadata for error page
  useSeoMeta({
    title: '404 - Page Not Found',
    description:
      'The page you are looking for could not be found. Browse our blog posts and case studies or return to the homepage.',
    robots: 'noindex,follow', // Don't index error pages
  })

  // Determine if this is an Arabic route (starts with ar/)
  const route = useRoute()
  const isArabicRoute = route.path.startsWith('/ar/')

  // Clear error and navigate to home
  const handleClearError = () => clearError({redirect: isArabicRoute ? '/ar' : '/'})

  // Suggested pages to visit
  const suggestions = [
    {
      title: 'Home',
      description: 'Return to the homepage',
      to: isArabicRoute ? '/ar' : '/',
      icon: 'i-heroicons-home',
    },
    {
      title: 'Blog',
      description: 'Read technical articles and tutorials',
      to: isArabicRoute ? '/ar/blog' : '/blog',
      icon: 'i-heroicons-document-text',
    },
    {
      title: 'Case Studies',
      description: 'View portfolio projects and case studies',
      to: isArabicRoute ? '/ar/case-studies' : '/case-studies',
      icon: 'i-heroicons-briefcase',
    },
  ]
</script>

<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="mx-auto max-w-2xl text-center">
      <!-- Error Code -->
      <div class="mb-8">
        <h1 class="text-9xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      </div>

      <!-- Error Message -->
      <div class="mb-12">
        <h2 class="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
          {{ error?.statusMessage || 'Page Not Found' }}
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
      </div>

      <!-- Navigation Suggestions -->
      <div class="mb-12">
        <h3 class="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
          Here are some helpful links:
        </h3>
        <div class="grid gap-4 md:grid-cols-3">
          <Card
            v-for="suggestion in suggestions"
            :key="suggestion.to"
            class="hover:shadow-lg transition-shadow">
            <CardContent class="pt-6">
              <NuxtLink :to="suggestion.to" class="block">
                <div class="text-center">
                  <Icon :icon="suggestion.icon" class="mx-auto mb-3 h-8 w-8 text-primary-500" />
                  <h4 class="mb-2 font-semibold text-gray-900 dark:text-white">
                    {{ suggestion.title }}
                  </h4>
                  <p class="text-sm text-gray-600 dark:text-gray-400">
                    {{ suggestion.description }}
                  </p>
                </div>
              </NuxtLink>
            </CardContent>
          </Card>
        </div>
      </div>

      <!-- Primary Action -->
      <div>
        <Button size="lg" @click="handleClearError">
          <Icon icon="radix-icons:arrow-left" class="me-2 h-4 w-4" />
          Return to Homepage
        </Button>
      </div>

      <!-- Error Details (Development Only) -->
      <div v-if="error && isDev" class="mt-12 text-start">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm"> Error Details (Development Only) </CardTitle>
          </CardHeader>
          <CardContent>
            <div class="space-y-2 text-sm">
              <div>
                <span class="font-medium">Status Code:</span>
                {{ error.statusCode }}
              </div>
              <div v-if="error.statusMessage">
                <span class="font-medium">Message:</span>
                {{ error.statusMessage }}
              </div>
              <div v-if="error.message">
                <span class="font-medium">Details:</span>
                {{ error.message }}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
