<script setup lang="ts">
  import Icon from '@/components/ui/Icon.vue'
  import type {CaseStudyCardProps} from '~/types/content'

  withDefaults(defineProps<CaseStudyCardProps>(), {
    featured: false,
  })
</script>

<template>
  <NuxtLink :to="caseStudy.path" class="block">
    <Card class="cursor-pointer transition-all hover:shadow-lg group relative overflow-hidden">
      <!-- Featured badge -->
      <div v-if="featured || caseStudy.featured" class="absolute top-4 end-4 z-10">
        <Badge variant="default" class="text-xs font-medium"> Featured </Badge>
      </div>

      <!-- Featured image -->
      <div v-if="caseStudy.featuredImage" class="overflow-hidden rounded-t-lg relative">
        <NuxtImg
          :src="caseStudy.featuredImage"
          :alt="caseStudy.title"
          class="w-full h-48 object-cover transition-transform group-hover:scale-105"
          loading="lazy" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <CardContent class="pt-6">
        <!-- Project title -->
        <h3 class="text-xl font-semibold mb-2 text-foreground">
          {{ caseStudy.title }}
        </h3>

        <!-- Client and role -->
        <div class="mb-3 space-y-1">
          <p class="text-sm font-medium text-foreground">
            {{ caseStudy.client }}
          </p>
          <p class="text-sm text-muted-foreground">
            {{ caseStudy.role }}
          </p>
        </div>

        <!-- Timeline -->
        <div class="mb-3">
          <p class="text-sm text-muted-foreground">
            <Icon icon="radix-icons:calendar" class="inline w-4 h-4 me-1" />
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
              class="text-xs">
              {{ tag }}
            </Badge>
            <Badge v-if="caseStudy.tags.length > 3" variant="secondary" class="text-xs">
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
