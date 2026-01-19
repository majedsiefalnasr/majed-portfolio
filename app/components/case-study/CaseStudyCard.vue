<script setup lang="ts">
import Icon from '@/components/ui/Icon.vue'
import type { CaseStudyCardProps } from '~/types/content'

withDefaults(defineProps<CaseStudyCardProps>(), {
  featured: false,
})
</script>

<template>
  <NuxtLink :to="caseStudy.path" class="block">
    <Card
      class="group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg"
    >
      <!-- Featured badge -->
      <div
        v-if="featured || caseStudy.featured"
        class="absolute end-4 top-4 z-10"
      >
        <Badge variant="default" class="text-xs font-medium"> Featured </Badge>
      </div>

      <!-- Featured image -->
      <div
        v-if="caseStudy.featuredImage"
        class="relative overflow-hidden rounded-t-lg"
      >
        <NuxtImg
          :src="caseStudy.featuredImage"
          :alt="caseStudy.title"
          class="h-48 w-full object-cover transition-transform group-hover:scale-105"
          loading="lazy"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
        />
      </div>

      <CardContent class="pt-6">
        <!-- Project title -->
        <h3 class="text-foreground mb-2 text-xl font-semibold">
          {{ caseStudy.title }}
        </h3>

        <!-- Client and role -->
        <div class="mb-3 space-y-1">
          <p class="text-foreground text-sm font-medium">
            {{ caseStudy.client }}
          </p>
          <p class="text-muted-foreground text-sm">
            {{ caseStudy.role }}
          </p>
        </div>

        <!-- Timeline -->
        <div class="mb-3">
          <p class="text-muted-foreground text-sm">
            <Icon icon="radix-icons:calendar" class="me-1 inline h-4 w-4" />
            {{ caseStudy.timeline }}
          </p>
        </div>

        <!-- Tags -->
        <div v-if="caseStudy.tags && caseStudy.tags.length > 0" class="mb-4">
          <div class="flex flex-wrap gap-1">
            <Badge
              v-for="tag in caseStudy.tags.slice(0, 3)"
              :key="tag"
              variant="secondary"
              class="text-xs"
            >
              {{ tag }}
            </Badge>
            <Badge
              v-if="caseStudy.tags.length > 3"
              variant="secondary"
              class="text-xs"
            >
              +{{ caseStudy.tags.length - 3 }}
            </Badge>
          </div>
        </div>

        <!-- View project link -->
        <div class="mt-4">
          <Button variant="link" class="px-0">
            View project
            <Icon icon="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  </NuxtLink>
</template>
