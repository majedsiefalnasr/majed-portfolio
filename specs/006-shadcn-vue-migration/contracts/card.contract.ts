/**
 * Card Component Migration Contract
 *
 * Defines the transformation from Nuxt UI UCard to shadcn-vue Card composition
 */

// ============================================================================
// BEFORE: Nuxt UI UCard API
// ============================================================================

interface NuxtUICardProps {
  // Content props (shorthand for slots)
  title?: string
  description?: string

  // Styling
  ui?: {
    base?: string
    background?: string
    divide?: string
    ring?: string
    rounded?: string
    shadow?: string
    body?: {
      base?: string
      background?: string
      padding?: string
    }
    header?: {
      base?: string
      background?: string
      padding?: string
    }
    footer?: {
      base?: string
      background?: string
      padding?: string
    }
  }

  // NOTE: UCard is a single monolithic component with slots
}

// UCard Slots:
// - #header: Custom header content
// - #default: Body content
// - #footer: Footer content

// ============================================================================
// AFTER: shadcn-vue Card Composition API
// ============================================================================

// Card is composed of multiple sub-components for flexibility
interface ShadcnCardProps {
  class?: string | object
}

interface ShadcnCardHeaderProps {
  class?: string | object
}

interface ShadcnCardTitleProps {
  class?: string | object
  as?: string // Default: 'h3'
}

interface ShadcnCardDescriptionProps {
  class?: string | object
  as?: string // Default: 'p'
}

interface ShadcnCardContentProps {
  class?: string | object
}

interface ShadcnCardFooterProps {
  class?: string | object
}

// ============================================================================
// MIGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Basic card with title and body
 *
 * BEFORE:
 * <UCard>
 *   <template #header>
 *     <h3>Card Title</h3>
 *   </template>
 *   <p>Card body content goes here.</p>
 * </UCard>
 *
 * AFTER:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Card body content goes here.</p>
 *   </CardContent>
 * </Card>
 */

/**
 * Pattern 2: Card with title, description, and content
 *
 * BEFORE:
 * <UCard>
 *   <template #header>
 *     <div>
 *       <h3>Card Title</h3>
 *       <p class="text-sm text-gray-500">Card description</p>
 *     </div>
 *   </template>
 *   <p>Main content here.</p>
 * </UCard>
 *
 * AFTER:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Card Title</CardTitle>
 *     <CardDescription>Card description</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Main content here.</p>
 *   </CardContent>
 * </Card>
 *
 * NOTE: CardDescription has built-in muted text styling
 */

/**
 * Pattern 3: Card with footer
 *
 * BEFORE:
 * <UCard>
 *   <template #header>
 *     <h3>Confirm Action</h3>
 *   </template>
 *   <p>Are you sure you want to proceed?</p>
 *   <template #footer>
 *     <div class="flex justify-end gap-2">
 *       <UButton variant="ghost">Cancel</UButton>
 *       <UButton>Confirm</UButton>
 *     </div>
 *   </template>
 * </UCard>
 *
 * AFTER:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Confirm Action</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Are you sure you want to proceed?</p>
 *   </CardContent>
 *   <CardFooter class="flex justify-end gap-2">
 *     <Button variant="ghost">Cancel</Button>
 *     <Button>Confirm</Button>
 *   </CardFooter>
 * </Card>
 */

/**
 * Pattern 4: Card with only content (no header/footer)
 *
 * BEFORE:
 * <UCard>
 *   <div class="p-6">
 *     <p>Simple card content without header.</p>
 *   </div>
 * </UCard>
 *
 * AFTER:
 * <Card>
 *   <CardContent>
 *     <p>Simple card content without header.</p>
 *   </CardContent>
 * </Card>
 *
 * NOTE: CardContent already has padding; remove manual p-6
 */

/**
 * Pattern 5: BlogPostCard migration (complex example)
 *
 * BEFORE (BlogPostCard.vue):
 * <UCard>
 *   <template #header>
 *     <NuxtImg :src="post.featuredImage" />
 *   </template>
 *   <div class="space-y-2">
 *     <h3>{{ post.title }}</h3>
 *     <p>{{ post.excerpt }}</p>
 *     <BlogPostMeta :post="post" />
 *   </div>
 *   <template #footer>
 *     <UButton variant="link" :to="`/blog/${post.slug}`">
 *       Read more
 *     </UButton>
 *   </template>
 * </UCard>
 *
 * AFTER (BlogPostCard.vue):
 * <Card class="overflow-hidden">
 *   <NuxtImg
 *     :src="post.featuredImage"
 *     class="w-full h-48 object-cover"
 *   />
 *   <CardHeader>
 *     <CardTitle>{{ post.title }}</CardTitle>
 *     <CardDescription>{{ post.excerpt }}</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <BlogPostMeta :post="post" />
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="link" as-child class="px-0">
 *       <NuxtLink :to="`/blog/${post.slug}`">
 *         Read more
 *         <Icon icon="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
 *       </NuxtLink>
 *     </Button>
 *   </CardFooter>
 * </Card>
 *
 * NOTE: Image goes outside CardHeader for full-width effect
 * NOTE: Use overflow-hidden on Card to clip rounded corners
 */

/**
 * Pattern 6: CaseStudyCard migration (with metrics)
 *
 * BEFORE (CaseStudyCard.vue):
 * <UCard>
 *   <template #header>
 *     <div class="flex items-center justify-between">
 *       <h3>{{ caseStudy.title }}</h3>
 *       <span class="text-sm text-gray-500">{{ caseStudy.client }}</span>
 *     </div>
 *   </template>
 *   <div class="space-y-4">
 *     <p>{{ caseStudy.excerpt }}</p>
 *     <CaseStudyMetrics :metrics="caseStudy.metrics" />
 *   </div>
 *   <template #footer>
 *     <UButton variant="outline" :to="`/case-studies/${caseStudy.slug}`">
 *       View Case Study
 *     </UButton>
 *   </template>
 * </UCard>
 *
 * AFTER (CaseStudyCard.vue):
 * <Card>
 *   <CardHeader>
 *     <div class="flex items-center justify-between">
 *       <CardTitle>{{ caseStudy.title }}</CardTitle>
 *       <span class="text-sm text-muted-foreground">{{ caseStudy.client }}</span>
 *     </div>
 *     <CardDescription>{{ caseStudy.excerpt }}</CardDescription>
 *   </CardHeader>
 *   <CardContent>
 *     <CaseStudyMetrics :metrics="caseStudy.metrics" />
 *   </CardContent>
 *   <CardFooter>
 *     <Button variant="outline" as-child>
 *       <NuxtLink :to="`/case-studies/${caseStudy.slug}`">
 *         View Case Study
 *       </NuxtLink>
 *     </Button>
 *   </CardFooter>
 * </Card>
 *
 * NOTE: text-gray-500 → text-muted-foreground (use CSS variable)
 */

/**
 * Pattern 7: Card with custom background (dark mode support)
 *
 * BEFORE:
 * <UCard :ui="{ background: 'bg-gray-50 dark:bg-gray-800' }">
 *   <p>Content with custom background</p>
 * </UCard>
 *
 * AFTER:
 * <Card class="bg-muted">
 *   <CardContent>
 *     <p>Content with custom background</p>
 *   </CardContent>
 * </Card>
 *
 * NOTE: Use shadcn-vue semantic colors (bg-muted) for dark mode support
 */

/**
 * Pattern 8: Interactive card (clickable)
 *
 * BEFORE:
 * <NuxtLink :to="`/blog/${post.slug}`">
 *   <UCard class="hover:shadow-lg transition-shadow">
 *     <template #header>
 *       <h3>{{ post.title }}</h3>
 *     </template>
 *     <p>{{ post.excerpt }}</p>
 *   </UCard>
 * </NuxtLink>
 *
 * AFTER:
 * <Card
 *   as-child
 *   class="cursor-pointer transition-shadow hover:shadow-lg"
 * >
 *   <NuxtLink :to="`/blog/${post.slug}`">
 *     <CardHeader>
 *       <CardTitle>{{ post.title }}</CardTitle>
 *     </CardHeader>
 *     <CardContent>
 *       <p>{{ post.excerpt }}</p>
 *     </CardContent>
 *   </NuxtLink>
 * </Card>
 *
 * NOTE: Use as-child to delegate rendering to NuxtLink
 * NOTE: Add cursor-pointer for visual feedback
 */

/**
 * Pattern 9: Card grid layout
 *
 * BEFORE:
 * <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   <UCard v-for="post in posts" :key="post.id">
 *     <template #header>
 *       <h3>{{ post.title }}</h3>
 *     </template>
 *     <p>{{ post.excerpt }}</p>
 *   </UCard>
 * </div>
 *
 * AFTER:
 * <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
 *   <Card v-for="post in posts" :key="post.id">
 *     <CardHeader>
 *       <CardTitle>{{ post.title }}</CardTitle>
 *     </CardHeader>
 *     <CardContent>
 *       <p>{{ post.excerpt }}</p>
 *     </CardContent>
 *   </Card>
 * </div>
 *
 * NOTE: Grid layout stays the same; only Card structure changes
 */

/**
 * Pattern 10: Nested cards (card within card)
 *
 * BEFORE:
 * <UCard>
 *   <template #header>
 *     <h2>Parent Card</h2>
 *   </template>
 *   <UCard>
 *     <template #header>
 *       <h3>Nested Card</h3>
 *     </template>
 *     <p>Nested content</p>
 *   </UCard>
 * </UCard>
 *
 * AFTER:
 * <Card>
 *   <CardHeader>
 *     <CardTitle as="h2">Parent Card</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <Card class="border-muted">
 *       <CardHeader>
 *         <CardTitle as="h3">Nested Card</CardTitle>
 *       </CardHeader>
 *       <CardContent>
 *         <p>Nested content</p>
 *       </CardContent>
 *     </Card>
 *   </CardContent>
 * </Card>
 *
 * NOTE: Use `as` prop to set semantic heading level
 * NOTE: Use border-muted on nested card for visual hierarchy
 */

// ============================================================================
// MIGRATION CHECKLIST
// ============================================================================

/**
 * When migrating UCard → Card composition:
 *
 * 1. [ ] Replace <UCard> with <Card>
 * 2. [ ] Convert #header slot to <CardHeader>
 * 3. [ ] Extract title from header → <CardTitle>
 * 4. [ ] Extract description from header → <CardDescription>
 * 5. [ ] Wrap default slot content in <CardContent>
 * 6. [ ] Convert #footer slot to <CardFooter>
 * 7. [ ] Remove manual padding (CardContent/CardHeader/CardFooter have default padding)
 * 8. [ ] Update color classes (gray-500 → muted-foreground, etc.)
 * 9. [ ] Use semantic color variables for dark mode support
 * 10. [ ] Add overflow-hidden if card has full-width image
 * 11. [ ] Use as-child for clickable cards with NuxtLink
 * 12. [ ] Set semantic heading levels with `as` prop (h2, h3, etc.)
 * 13. [ ] Test responsive layout (grid, flex)
 * 14. [ ] Verify dark mode appearance
 */

// ============================================================================
// COMMON PITFALLS
// ============================================================================

/**
 * PITFALL 1: Forgetting to wrap content in CardContent
 *
 * ❌ WRONG:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <p>This text has no padding!</p>
 * </Card>
 *
 * ✅ CORRECT:
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Title</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>This text has proper padding.</p>
 *   </CardContent>
 * </Card>
 *
 * Why: Only CardContent/CardHeader/CardFooter have default padding
 */

/**
 * PITFALL 2: Using UCard's ui prop syntax
 *
 * ❌ WRONG:
 * <Card :ui="{ background: 'bg-gray-50' }">
 *   ...
 * </Card>
 *
 * ✅ CORRECT:
 * <Card class="bg-muted">
 *   ...
 * </Card>
 *
 * Why: shadcn-vue uses standard class prop, not ui config object
 */

/**
 * PITFALL 3: Not using semantic heading levels
 *
 * ❌ WRONG:
 * <CardTitle>Always renders as h3</CardTitle>
 *
 * ✅ CORRECT:
 * <CardTitle as="h2">Renders as h2 for main sections</CardTitle>
 * <CardTitle as="h3">Renders as h3 for subsections</CardTitle>
 *
 * Why: Proper heading hierarchy is critical for accessibility
 */

/**
 * PITFALL 4: Adding manual padding to CardContent
 *
 * ❌ WRONG:
 * <CardContent class="p-6">
 *   <p>Over-padded content</p>
 * </CardContent>
 *
 * ✅ CORRECT:
 * <CardContent>
 *   <p>Properly padded content</p>
 * </CardContent>
 *
 * Why: CardContent already has p-6 by default
 */

/**
 * PITFALL 5: Using hardcoded colors instead of semantic variables
 *
 * ❌ WRONG:
 * <CardDescription class="text-gray-500 dark:text-gray-400">
 *   Description
 * </CardDescription>
 *
 * ✅ CORRECT:
 * <CardDescription>
 *   Description (uses text-muted-foreground automatically)
 * </CardDescription>
 *
 * Why: Semantic color variables work with any theme
 */

export type {
  NuxtUICardProps,
  ShadcnCardContentProps,
  ShadcnCardDescriptionProps,
  ShadcnCardFooterProps,
  ShadcnCardHeaderProps,
  ShadcnCardProps,
  ShadcnCardTitleProps,
}
