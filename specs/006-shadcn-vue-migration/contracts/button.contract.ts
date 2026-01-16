/**
 * Button Component Migration Contract
 *
 * Defines the transformation from Nuxt UI UButton to shadcn-vue Button
 */

// ============================================================================
// BEFORE: Nuxt UI UButton API
// ============================================================================

interface NuxtUIButtonProps {
  // Variants
  variant?: 'solid' | 'outline' | 'soft' | 'ghost' | 'link'
  color?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

  // Icons (Nuxt UI specific - uses UnoCSS icons)
  icon?: string // e.g., 'i-heroicons-arrow-left'
  leadingIcon?: string
  trailingIcon?: string

  // Layout
  block?: boolean
  square?: boolean
  padded?: boolean

  // State
  disabled?: boolean
  loading?: boolean

  // HTML attributes
  type?: 'button' | 'submit' | 'reset'
  to?: string
  href?: string
  target?: string
}

// ============================================================================
// AFTER: shadcn-vue Button API
// ============================================================================

interface ShadcnButtonProps {
  // Variants (simplified, more semantic)
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'

  // Composition
  'as-child'?: boolean // For wrapping NuxtLink or other elements

  // Styling
  class?: string | object

  // NOTE: Icons are NOT props - they go in slots!
  // NOTE: State props (disabled, loading) handled via native HTML attributes
}

// ============================================================================
// MIGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Basic button with text
 *
 * BEFORE:
 * <UButton>Click me</UButton>
 *
 * AFTER:
 * <Button>Click me</Button>
 */

/**
 * Pattern 2: Button with variant
 *
 * BEFORE:
 * <UButton variant="ghost">Cancel</UButton>
 * <UButton variant="outline">Save Draft</UButton>
 * <UButton variant="link">Learn more</UButton>
 *
 * AFTER:
 * <Button variant="ghost">Cancel</Button>
 * <Button variant="outline">Save Draft</Button>
 * <Button variant="link">Learn more</Button>
 */

/**
 * Pattern 3: Button with leading icon (via Nuxt UI icon prop)
 *
 * BEFORE:
 * <UButton icon="i-heroicons-arrow-left">Back</UButton>
 *
 * AFTER:
 * <Button>
 *   <Icon icon="radix-icons:arrow-left" class="mr-2 h-4 w-4" />
 *   Back
 * </Button>
 */

/**
 * Pattern 4: Button with trailing icon
 *
 * BEFORE:
 * <UButton trailing-icon="i-heroicons-arrow-right">Next</UButton>
 * <UButton variant="link" trailing-icon="i-heroicons-arrow-right" :padded="false">
 *   Read more
 * </UButton>
 *
 * AFTER:
 * <Button>
 *   Next
 *   <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
 * </Button>
 * <Button variant="link" class="px-0">
 *   Read more
 *   <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
 * </Button>
 */

/**
 * Pattern 5: Icon-only button (square/icon variant)
 *
 * BEFORE:
 * <UButton icon="i-heroicons-moon" variant="ghost" square />
 * <UButton icon="i-heroicons-clipboard" size="sm" />
 *
 * AFTER:
 * <Button variant="ghost" size="icon">
 *   <Icon icon="radix-icons:moon" class="h-5 w-5" />
 * </Button>
 * <Button size="icon">
 *   <Icon icon="radix-icons:clipboard" class="h-4 w-4" />
 * </Button>
 */

/**
 * Pattern 6: Button as link (with NuxtLink)
 *
 * BEFORE:
 * <UButton to="/blog">View Blog</UButton>
 * <UButton href="https://example.com" target="_blank">External Link</UButton>
 *
 * AFTER:
 * <Button as-child>
 *   <NuxtLink to="/blog">View Blog</NuxtLink>
 * </Button>
 * <Button as-child>
 *   <a href="https://example.com" target="_blank">External Link</a>
 * </Button>
 *
 * NOTE: as-child delegates rendering to child element (NuxtLink, <a>, etc.)
 */

/**
 * Pattern 7: Loading state
 *
 * BEFORE:
 * <UButton :loading="isLoading">Submit</UButton>
 *
 * AFTER:
 * <Button :disabled="isLoading">
 *   <Icon v-if="isLoading" icon="radix-icons:update" class="mr-2 h-4 w-4 animate-spin" />
 *   Submit
 * </Button>
 *
 * NOTE: shadcn-vue doesn't have built-in loading state; implement manually
 */

/**
 * Pattern 8: Disabled state
 *
 * BEFORE:
 * <UButton :disabled="!isValid">Submit</UButton>
 *
 * AFTER:
 * <Button :disabled="!isValid">Submit</Button>
 *
 * NOTE: Native HTML disabled attribute works the same
 */

/**
 * Pattern 9: Size variants
 *
 * BEFORE:
 * <UButton size="sm">Small</UButton>
 * <UButton size="md">Medium (default)</UButton>
 * <UButton size="lg">Large</UButton>
 *
 * AFTER:
 * <Button size="sm">Small</Button>
 * <Button>Default</Button>
 * <Button size="lg">Large</Button>
 *
 * NOTE: shadcn-vue has fewer size options (sm, default, lg, icon)
 */

/**
 * Pattern 10: Custom styling with Tailwind classes
 *
 * BEFORE:
 * <UButton class="w-full">Full Width</UButton>
 *
 * AFTER:
 * <Button class="w-full">Full Width</Button>
 *
 * NOTE: Class prop works identically; cn() utility handles merging
 */

// ============================================================================
// MIGRATION CHECKLIST
// ============================================================================

/**
 * When migrating UButton → Button:
 *
 * 1. [ ] Replace <UButton> with <Button>
 * 2. [ ] Map variant prop (if different from Nuxt UI)
 * 3. [ ] Map size prop (default, sm, lg, icon)
 * 4. [ ] Convert icon props to <Icon> components in slots:
 *        - icon → leading Icon in slot
 *        - leadingIcon → leading Icon in slot
 *        - trailingIcon → trailing Icon in slot
 * 5. [ ] Convert Heroicons to Radix Icons (icon names)
 * 6. [ ] Add proper spacing classes to icons (mr-2, ml-2)
 * 7. [ ] Handle link behavior with as-child + NuxtLink
 * 8. [ ] Replace padded={false} with class="px-0"
 * 9. [ ] Implement custom loading state if needed
 * 10. [ ] Verify TypeScript types compile
 * 11. [ ] Test accessibility (keyboard nav, ARIA)
 * 12. [ ] Verify visual appearance matches design
 */

// ============================================================================
// COMMON PITFALLS
// ============================================================================

/**
 * PITFALL 1: Forgetting to use as-child with NuxtLink
 *
 * ❌ WRONG:
 * <Button>
 *   <NuxtLink to="/blog">View Blog</NuxtLink>
 * </Button>
 *
 * ✅ CORRECT:
 * <Button as-child>
 *   <NuxtLink to="/blog">View Blog</NuxtLink>
 * </Button>
 *
 * Why: Without as-child, Button renders its own <button>, creating nested interactive elements
 */

/**
 * PITFALL 2: Incorrect icon spacing
 *
 * ❌ WRONG:
 * <Button>
 *   <Icon icon="radix-icons:arrow-right" />
 *   Next
 * </Button>
 *
 * ✅ CORRECT:
 * <Button>
 *   Next
 *   <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
 * </Button>
 *
 * Why: Icons need spacing (ml-2, mr-2) and size classes (h-4 w-4)
 */

/**
 * PITFALL 3: Using Heroicons syntax instead of Radix Icons
 *
 * ❌ WRONG:
 * <Icon icon="i-heroicons-arrow-left" />
 *
 * ✅ CORRECT:
 * <Icon icon="radix-icons:arrow-left" />
 *
 * Why: Iconify uses different syntax; Radix Icons prefix is "radix-icons:"
 */

/**
 * PITFALL 4: Not handling RTL for icon positioning
 *
 * ❌ WRONG:
 * <Button>
 *   Next
 *   <Icon icon="radix-icons:arrow-right" class="ml-2" />
 * </Button>
 *
 * ✅ CORRECT:
 * <Button>
 *   Next
 *   <Icon icon="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
 * </Button>
 *
 * Why: Use ms-* (margin-inline-start) instead of ml-* for RTL support
 */

export type {NuxtUIButtonProps, ShadcnButtonProps}
