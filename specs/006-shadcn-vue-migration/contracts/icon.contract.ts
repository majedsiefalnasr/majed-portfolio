/**
 * Icon Component Migration Contract
 * 
 * Defines the transformation from Heroicons (UnoCSS syntax) to Radix Icons (Iconify)
 */

// ============================================================================
// BEFORE: Heroicons with UnoCSS (Nuxt UI)
// ============================================================================

/**
 * Nuxt UI uses UnoCSS icon preset with Heroicons
 * Syntax: i-{collection}-{icon-name}
 * 
 * Examples:
 * - i-heroicons-arrow-left
 * - i-heroicons-arrow-right
 * - i-heroicons-moon
 * - i-heroicons-sun
 * - i-heroicons-clipboard
 * - i-heroicons-ellipsis-vertical
 * 
 * Usage in components:
 * <span class="i-heroicons-moon" />
 * <UButton icon="i-heroicons-arrow-left" />
 */

// ============================================================================
// AFTER: Radix Icons with Iconify (shadcn-vue)
// ============================================================================

/**
 * shadcn-vue uses @iconify/vue with Radix Icons collection
 * Syntax: {collection}:{icon-name}
 * 
 * Installation:
 * bun add @iconify/vue @iconify-json/radix-icons
 * 
 * Usage in components:
 * <Icon icon="radix-icons:moon" />
 */

interface IconifyIconProps {
  icon: string  // Collection:name format (e.g., "radix-icons:moon")
  width?: string | number
  height?: string | number
  color?: string
  inline?: boolean
  class?: string | object
  
  // NOTE: Use Tailwind classes for sizing/colors instead of props
}

// ============================================================================
// ICON MAPPING: Heroicons → Radix Icons
// ============================================================================

/**
 * Common icon conversions used in this portfolio:
 */

export const ICON_MAPPING = {
  // Navigation
  'i-heroicons-arrow-left': 'radix-icons:arrow-left',
  'i-heroicons-arrow-right': 'radix-icons:arrow-right',
  'i-heroicons-chevron-left': 'radix-icons:chevron-left',
  'i-heroicons-chevron-right': 'radix-icons:chevron-right',
  'i-heroicons-chevron-down': 'radix-icons:chevron-down',
  'i-heroicons-chevron-up': 'radix-icons:chevron-up',
  
  // Theme switching
  'i-heroicons-moon': 'radix-icons:moon',
  'i-heroicons-sun': 'radix-icons:sun',
  
  // Actions
  'i-heroicons-clipboard': 'radix-icons:clipboard',
  'i-heroicons-clipboard-check': 'radix-icons:clipboard-copy',
  'i-heroicons-trash': 'radix-icons:trash',
  'i-heroicons-pencil': 'radix-icons:pencil-1',
  'i-heroicons-ellipsis-vertical': 'radix-icons:dots-vertical',
  'i-heroicons-ellipsis-horizontal': 'radix-icons:dots-horizontal',
  
  // Social
  'i-heroicons-link': 'radix-icons:link-2',
  'i-heroicons-globe-alt': 'radix-icons:globe',
  
  // Content
  'i-heroicons-document': 'radix-icons:file',
  'i-heroicons-document-text': 'radix-icons:file-text',
  'i-heroicons-folder': 'radix-icons:folder',
  'i-heroicons-folder-open': 'radix-icons:folder-open',
  'i-heroicons-tag': 'radix-icons:tag',
  'i-heroicons-bookmark': 'radix-icons:bookmark',
  
  // UI States
  'i-heroicons-check': 'radix-icons:check',
  'i-heroicons-x-mark': 'radix-icons:cross-2',
  'i-heroicons-information-circle': 'radix-icons:info-circled',
  'i-heroicons-exclamation-triangle': 'radix-icons:exclamation-triangle',
  'i-heroicons-question-mark-circle': 'radix-icons:question-mark-circled',
  
  // Loading
  'i-heroicons-arrow-path': 'radix-icons:update',  // For spinning loader
  
  // System
  'i-heroicons-cog-6-tooth': 'radix-icons:gear',
  'i-heroicons-magnifying-glass': 'radix-icons:magnifying-glass',
  'i-heroicons-bars-3': 'radix-icons:hamburger-menu',
  
  // Communication
  'i-heroicons-envelope': 'radix-icons:envelope-closed',
  'i-heroicons-envelope-open': 'radix-icons:envelope-open',
  
  // Media
  'i-heroicons-photo': 'radix-icons:image',
  'i-heroicons-play': 'radix-icons:play',
  'i-heroicons-pause': 'radix-icons:pause',
  
  // Other
  'i-heroicons-calendar': 'radix-icons:calendar',
  'i-heroicons-clock': 'radix-icons:clock',
  'i-heroicons-user': 'radix-icons:person',
  'i-heroicons-heart': 'radix-icons:heart',
  'i-heroicons-star': 'radix-icons:star',
} as const

// ============================================================================
// MIGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Standalone icon (UnoCSS class)
 * 
 * BEFORE:
 * <span class="i-heroicons-moon" />
 * <div class="i-heroicons-sun text-xl" />
 * 
 * AFTER:
 * <Icon icon="radix-icons:moon" class="h-5 w-5" />
 * <Icon icon="radix-icons:sun" class="h-6 w-6" />
 * 
 * NOTE: Replace text-* sizing with explicit h-* w-* classes
 */

/**
 * Pattern 2: Icon in button (via UButton icon prop)
 * 
 * BEFORE:
 * <UButton icon="i-heroicons-arrow-left">Back</UButton>
 * 
 * AFTER:
 * <Button>
 *   <Icon icon="radix-icons:arrow-left" class="me-2 h-4 w-4" />
 *   Back
 * </Button>
 * 
 * NOTE: Add spacing (me-2) and sizing (h-4 w-4)
 * NOTE: Use me-* (margin-inline-end) for RTL support
 */

/**
 * Pattern 3: Theme toggle icon (dynamic)
 * 
 * BEFORE (AppHeader.vue):
 * <UButton 
 *   :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'" 
 *   variant="ghost"
 *   @click="toggleTheme"
 * />
 * 
 * AFTER (AppHeader.vue):
 * <Button variant="ghost" size="icon" @click="toggleTheme">
 *   <Icon 
 *     :icon="isDark ? 'radix-icons:sun' : 'radix-icons:moon'" 
 *     class="h-5 w-5"
 *   />
 * </Button>
 * 
 * NOTE: Dynamic icon binding works the same way
 */

/**
 * Pattern 4: Icon with color (semantic color variables)
 * 
 * BEFORE:
 * <span class="i-heroicons-check text-green-500" />
 * <span class="i-heroicons-x-mark text-red-500" />
 * 
 * AFTER:
 * <Icon icon="radix-icons:check" class="h-4 w-4 text-green-600" />
 * <Icon icon="radix-icons:cross-2" class="h-4 w-4 text-destructive" />
 * 
 * NOTE: Use semantic colors (text-destructive) when possible
 */

/**
 * Pattern 5: Loading/spinning icon
 * 
 * BEFORE:
 * <span class="i-heroicons-arrow-path animate-spin" />
 * 
 * AFTER:
 * <Icon icon="radix-icons:update" class="h-4 w-4 animate-spin" />
 * 
 * NOTE: animate-spin works with any icon
 */

/**
 * Pattern 6: Icon in dropdown menu item
 * 
 * BEFORE (AppHeader.vue theme switcher):
 * <UDropdown
 *   :items="[
 *     { label: 'Light', icon: 'i-heroicons-sun' },
 *     { label: 'Dark', icon: 'i-heroicons-moon' },
 *   ]"
 * />
 * 
 * AFTER (AppHeader.vue theme switcher):
 * <DropdownMenu>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>
 *       <Icon icon="radix-icons:sun" class="me-2 h-4 w-4" />
 *       Light
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       <Icon icon="radix-icons:moon" class="me-2 h-4 w-4" />
 *       Dark
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * 
 * NOTE: Icons go in slot content, not as props
 */

/**
 * Pattern 7: Icon-only button
 * 
 * BEFORE:
 * <UButton icon="i-heroicons-clipboard" square variant="ghost" />
 * 
 * AFTER:
 * <Button variant="ghost" size="icon">
 *   <Icon icon="radix-icons:clipboard" class="h-5 w-5" />
 * </Button>
 * 
 * NOTE: Use size="icon" instead of square prop
 */

/**
 * Pattern 8: Icon in card header
 * 
 * BEFORE (BlogPostCard.vue):
 * <div class="flex items-center gap-2">
 *   <span class="i-heroicons-calendar text-gray-400" />
 *   <time>{{ post.date }}</time>
 * </div>
 * 
 * AFTER (BlogPostCard.vue):
 * <div class="flex items-center gap-2">
 *   <Icon icon="radix-icons:calendar" class="h-4 w-4 text-muted-foreground" />
 *   <time>{{ post.date }}</time>
 * </div>
 * 
 * NOTE: Use text-muted-foreground instead of text-gray-400
 */

/**
 * Pattern 9: Icon in link (trailing icon)
 * 
 * BEFORE:
 * <UButton 
 *   variant="link" 
 *   trailing-icon="i-heroicons-arrow-right"
 *   to="/blog"
 * >
 *   Read more
 * </UButton>
 * 
 * AFTER:
 * <Button variant="link" as-child class="px-0">
 *   <NuxtLink to="/blog">
 *     Read more
 *     <Icon icon="radix-icons:arrow-right" class="ms-2 h-4 w-4" />
 *   </NuxtLink>
 * </Button>
 * 
 * NOTE: Trailing icon goes after text in slot
 */

/**
 * Pattern 10: Icon sizing scale
 * 
 * Size reference for common use cases:
 * - h-3 w-3 (12px): Very small icons, badges
 * - h-4 w-4 (16px): Default for buttons, menu items, inline text
 * - h-5 w-5 (20px): Default for icon-only buttons
 * - h-6 w-6 (24px): Larger emphasis icons
 * - h-8 w-8 (32px): Hero icons, feature highlights
 * 
 * BEFORE (UnoCSS text sizes):
 * text-xs → h-3 w-3
 * text-sm → h-4 w-4
 * text-base → h-5 w-5
 * text-lg → h-6 w-6
 * text-xl → h-8 w-8
 * 
 * AFTER (Explicit sizing):
 * <Icon icon="..." class="h-4 w-4" />
 */

// ============================================================================
// MIGRATION CHECKLIST
// ============================================================================

/**
 * When migrating icons:
 * 
 * 1. [ ] Replace UnoCSS icon classes (i-heroicons-*) with Icon component
 * 2. [ ] Map Heroicons names to Radix Icons using ICON_MAPPING
 * 3. [ ] Add explicit sizing classes (h-4 w-4, h-5 w-5, etc.)
 * 4. [ ] Add spacing for icons in buttons (me-2 for leading, ms-2 for trailing)
 * 5. [ ] Use me-*/ms-* (inline margin) instead of ml-*/mr-* for RTL support
 * 6. [ ] Convert text-* sizing to h-* w-* sizing
 * 7. [ ] Replace hardcoded colors (text-gray-400) with semantic variables (text-muted-foreground)
 * 8. [ ] Update dynamic icon bindings (:icon prop)
 * 9. [ ] Test icon appearance in light and dark modes
 * 10. [ ] Verify icon alignment with adjacent text
 * 11. [ ] Check RTL layout (icons should flip position correctly)
 * 12. [ ] Ensure icon ARIA labels for accessibility (when icon-only)
 */

// ============================================================================
// COMMON PITFALLS
// ============================================================================

/**
 * PITFALL 1: Using Heroicons syntax with Iconify
 * 
 * ❌ WRONG:
 * <Icon icon="i-heroicons-moon" />
 * 
 * ✅ CORRECT:
 * <Icon icon="radix-icons:moon" />
 * 
 * Why: Iconify uses collection:name format, not UnoCSS i-collection-name
 */

/**
 * PITFALL 2: Not specifying icon size
 * 
 * ❌ WRONG:
 * <Icon icon="radix-icons:moon" />
 * 
 * ✅ CORRECT:
 * <Icon icon="radix-icons:moon" class="h-5 w-5" />
 * 
 * Why: Iconify icons default to 1em which may be inconsistent
 */

/**
 * PITFALL 3: Using ml-/mr- instead of me-/ms- for RTL
 * 
 * ❌ WRONG:
 * <Icon icon="radix-icons:arrow-left" class="mr-2" />
 * 
 * ✅ CORRECT:
 * <Icon icon="radix-icons:arrow-left" class="me-2" />
 * 
 * Why: me-* (margin-inline-end) automatically flips in RTL layouts
 */

/**
 * PITFALL 4: Not checking if icon exists in Radix Icons
 * 
 * If icon doesn't exist in Radix Icons collection:
 * 
 * Option 1: Find alternative Radix icon
 * Option 2: Use different Iconify collection (e.g., lucide)
 * Option 3: Add custom SVG component
 * 
 * Browse Radix Icons: https://www.radix-ui.com/icons
 * Browse all Iconify icons: https://icon-sets.iconify.design/
 */

/**
 * PITFALL 5: Inconsistent icon sizing
 * 
 * ❌ WRONG (mixing sizes):
 * <Icon icon="radix-icons:calendar" class="h-4 w-4" />
 * <Icon icon="radix-icons:clock" class="h-5 w-5" />
 * 
 * ✅ CORRECT (consistent sizing):
 * <Icon icon="radix-icons:calendar" class="h-4 w-4" />
 * <Icon icon="radix-icons:clock" class="h-4 w-4" />
 * 
 * Why: Consistent sizing creates visual harmony
 */

export type { IconifyIconProps }
