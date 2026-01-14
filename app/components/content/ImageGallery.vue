<script setup lang="ts">
  import type {ImageGalleryProps} from '~/types/content'

  const props = withDefaults(defineProps<ImageGalleryProps>(), {
    columns: 3,
    gap: 'md',
  })

  const modalOpen = ref(false)
  const currentIndex = ref(0)

  const openModal = (index: number) => {
    currentIndex.value = index
    modalOpen.value = true
  }

  const closeModal = () => {
    modalOpen.value = false
  }

  const nextImage = () => {
    currentIndex.value = (currentIndex.value + 1) % props.images.length
  }

  const prevImage = () => {
    currentIndex.value = currentIndex.value === 0 ? props.images.length - 1 : currentIndex.value - 1
  }

  // Keyboard navigation
  const handleKeydown = (event: KeyboardEvent) => {
    if (!modalOpen.value) return

    switch (event.key) {
      case 'ArrowRight':
        nextImage()
        break
      case 'ArrowLeft':
        prevImage()
        break
      case 'Escape':
        closeModal()
        break
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', handleKeydown)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown)
  })

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  }

  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }
</script>

<template>
  <div class="image-gallery">
    <div :class="['grid', columnClasses[columns], gapClasses[gap]]">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="gallery-item cursor-pointer group relative overflow-hidden rounded-lg"
        @click="openModal(index)">
        <NuxtImg
          :src="image.src"
          :alt="image.alt"
          class="w-full h-48 object-cover transition-transform group-hover:scale-105"
          loading="lazy" />
        <div
          class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <UIcon
            name="i-heroicons-eye"
            class="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <div
          v-if="image.caption"
          class="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-sm">
          {{ image.caption }}
        </div>
      </div>
    </div>

    <!-- Modal -->
    <UModal v-model="modalOpen" @close="closeModal">
      <div class="relative max-w-4xl mx-auto">
        <!-- Close button -->
        <button
          class="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors"
          @click="closeModal">
          <UIcon name="i-heroicons-x-mark" class="h-6 w-6" />
        </button>

        <!-- Navigation buttons -->
        <button
          v-if="images.length > 1"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          @click="prevImage">
          <UIcon name="i-heroicons-chevron-left" class="h-8 w-8" />
        </button>

        <button
          v-if="images.length > 1"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors"
          @click="nextImage">
          <UIcon name="i-heroicons-chevron-right" class="h-8 w-8" />
        </button>

        <!-- Current image -->
        <div class="relative">
          <NuxtImg
            :src="images[currentIndex].src"
            :alt="images[currentIndex].alt"
            class="w-full max-h-[80vh] object-contain"
            loading="lazy" />
          <div
            v-if="images[currentIndex].caption"
            class="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
            {{ images[currentIndex].caption }}
          </div>
        </div>

        <!-- Image counter -->
        <div v-if="images.length > 1" class="text-center mt-4 text-gray-600 dark:text-gray-400">
          {{ currentIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </UModal>
  </div>
</template>
