/**
 * DropdownMenu Component Migration Contract
 *
 * Defines the transformation from Nuxt UI UDropdown to shadcn-vue DropdownMenu
 */

// ============================================================================
// BEFORE: Nuxt UI UDropdown API
// ============================================================================

interface NuxtUIDropdownProps {
  // Trigger
  label?: string
  icon?: string

  // Menu items
  items: Array<
    | {
        label: string
        icon?: string
        click?: () => void
        to?: string
        href?: string
        disabled?: boolean
        slot?: string
      }
    | {
        label: string
        slot: 'divider'
      }
  >

  // Positioning
  placement?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number

  // Styling
  ui?: Record<string, any>
}

// NOTE: UDropdown is monolithic with items array prop

// ============================================================================
// AFTER: shadcn-vue DropdownMenu Composition API
// ============================================================================

// DropdownMenu is composed of multiple sub-components
interface ShadcnDropdownMenuProps {
  // Root props (manages open state)
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}

interface ShadcnDropdownMenuTriggerProps {
  'as-child'?: boolean
  class?: string | object
}

interface ShadcnDropdownMenuContentProps {
  class?: string | object
  side?: 'top' | 'bottom' | 'left' | 'right'
  sideOffset?: number
  align?: 'start' | 'center' | 'end'
  alignOffset?: number
}

interface ShadcnDropdownMenuItemProps {
  class?: string | object
  disabled?: boolean
  'as-child'?: boolean
  inset?: boolean // Add left padding for items with icons
}

interface ShadcnDropdownMenuLabelProps {
  class?: string | object
  inset?: boolean
}

interface ShadcnDropdownMenuSeparatorProps {
  class?: string | object
}

// ============================================================================
// MIGRATION PATTERNS
// ============================================================================

/**
 * Pattern 1: Basic dropdown with text items
 *
 * BEFORE:
 * <UDropdown
 *   label="Actions"
 *   :items="[
 *     { label: 'Edit', click: handleEdit },
 *     { label: 'Delete', click: handleDelete },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="outline">Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem @click="handleEdit">Edit</DropdownMenuItem>
 *     <DropdownMenuItem @click="handleDelete">Delete</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */

/**
 * Pattern 2: Dropdown with icons
 *
 * BEFORE:
 * <UDropdown
 *   icon="i-heroicons-ellipsis-vertical"
 *   :items="[
 *     { label: 'Edit', icon: 'i-heroicons-pencil' },
 *     { label: 'Delete', icon: 'i-heroicons-trash' },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="ghost" size="icon">
 *       <Icon icon="radix-icons:dots-vertical" class="h-5 w-5" />
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>
 *       <Icon icon="radix-icons:pencil-1" class="me-2 h-4 w-4" />
 *       Edit
 *     </DropdownMenuItem>
 *     <DropdownMenuItem>
 *       <Icon icon="radix-icons:trash" class="me-2 h-4 w-4" />
 *       Delete
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Icons go inside DropdownMenuItem as content, not props
 */

/**
 * Pattern 3: Dropdown with divider
 *
 * BEFORE:
 * <UDropdown
 *   label="Account"
 *   :items="[
 *     { label: 'Profile', click: handleProfile },
 *     { label: 'Settings', click: handleSettings },
 *     { label: 'divider', slot: 'divider' },
 *     { label: 'Logout', click: handleLogout },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>Account</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem @click="handleProfile">Profile</DropdownMenuItem>
 *     <DropdownMenuItem @click="handleSettings">Settings</DropdownMenuItem>
 *     <DropdownMenuSeparator />
 *     <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use DropdownMenuSeparator component instead of divider item
 */

/**
 * Pattern 4: Dropdown with navigation links
 *
 * BEFORE:
 * <UDropdown
 *   label="Navigate"
 *   :items="[
 *     { label: 'Home', to: '/' },
 *     { label: 'Blog', to: '/blog' },
 *     { label: 'About', to: '/about' },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="outline">Navigate</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem as-child>
 *       <NuxtLink to="/">Home</NuxtLink>
 *     </DropdownMenuItem>
 *     <DropdownMenuItem as-child>
 *       <NuxtLink to="/blog">Blog</NuxtLink>
 *     </DropdownMenuItem>
 *     <DropdownMenuItem as-child>
 *       <NuxtLink to="/about">About</NuxtLink>
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use as-child with NuxtLink for proper navigation
 */

/**
 * Pattern 5: Dropdown with disabled items
 *
 * BEFORE:
 * <UDropdown
 *   label="Actions"
 *   :items="[
 *     { label: 'Edit', click: handleEdit },
 *     { label: 'Delete', click: handleDelete, disabled: !canDelete },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>Actions</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem @click="handleEdit">Edit</DropdownMenuItem>
 *     <DropdownMenuItem @click="handleDelete" :disabled="!canDelete">
 *       Delete
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */

/**
 * Pattern 6: Dropdown with label/section headers
 *
 * BEFORE:
 * <UDropdown
 *   label="View"
 *   :items="[
 *     { label: 'Sort By', slot: 'label' },
 *     { label: 'Date', click: handleSortDate },
 *     { label: 'Title', click: handleSortTitle },
 *   ]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="outline">View</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuLabel>Sort By</DropdownMenuLabel>
 *     <DropdownMenuItem @click="handleSortDate">Date</DropdownMenuItem>
 *     <DropdownMenuItem @click="handleSortTitle">Title</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use DropdownMenuLabel for non-interactive section headers
 */

/**
 * Pattern 7: Theme switcher dropdown (AppHeader.vue)
 *
 * BEFORE (AppHeader.vue):
 * <UDropdown
 *   :items="[
 *     { label: 'Light', click: () => setTheme('light') },
 *     { label: 'Dark', click: () => setTheme('dark') },
 *     { label: 'System', click: () => setTheme('system') },
 *   ]"
 * >
 *   <template #default="{ open }">
 *     <UButton
 *       icon="i-heroicons-moon"
 *       variant="ghost"
 *     />
 *   </template>
 * </UDropdown>
 *
 * AFTER (AppHeader.vue):
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="ghost" size="icon">
 *       <Icon icon="radix-icons:moon" class="h-5 w-5" />
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="end">
 *     <DropdownMenuItem @click="setTheme('light')">
 *       <Icon icon="radix-icons:sun" class="me-2 h-4 w-4" />
 *       Light
 *     </DropdownMenuItem>
 *     <DropdownMenuItem @click="setTheme('dark')">
 *       <Icon icon="radix-icons:moon" class="me-2 h-4 w-4" />
 *       Dark
 *     </DropdownMenuItem>
 *     <DropdownMenuItem @click="setTheme('system')">
 *       <Icon icon="radix-icons:desktop" class="me-2 h-4 w-4" />
 *       System
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use align="end" to align menu with right edge of trigger
 */

/**
 * Pattern 8: Language switcher dropdown (AppHeader.vue)
 *
 * BEFORE (AppHeader.vue):
 * <UDropdown
 *   :items="[
 *     { label: 'English', click: () => switchLanguage('en') },
 *     { label: 'العربية', click: () => switchLanguage('ar') },
 *   ]"
 * >
 *   <template #default>
 *     <UButton variant="ghost">
 *       {{ currentLang === 'en' ? 'EN' : 'AR' }}
 *     </UButton>
 *   </template>
 * </UDropdown>
 *
 * AFTER (AppHeader.vue):
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button variant="ghost">
 *       {{ currentLang === 'en' ? 'EN' : 'AR' }}
 *     </Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent align="end">
 *     <DropdownMenuItem @click="switchLanguage('en')">
 *       English
 *     </DropdownMenuItem>
 *     <DropdownMenuItem @click="switchLanguage('ar')">
 *       العربية
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 */

/**
 * Pattern 9: Dropdown with alignment control
 *
 * BEFORE:
 * <UDropdown
 *   placement="bottom-end"
 *   :items="[...]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>...</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent side="bottom" align="end">
 *     ...
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use side (top/bottom/left/right) and align (start/center/end)
 */

/**
 * Pattern 10: Dropdown with custom offset
 *
 * BEFORE:
 * <UDropdown
 *   :offset="8"
 *   :items="[...]"
 * />
 *
 * AFTER:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>...</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent :sideOffset="8">
 *     ...
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * NOTE: Use sideOffset (distance from trigger) and alignOffset
 */

// ============================================================================
// MIGRATION CHECKLIST
// ============================================================================

/**
 * When migrating UDropdown → DropdownMenu:
 *
 * 1. [ ] Replace <UDropdown> with <DropdownMenu> wrapper
 * 2. [ ] Add <DropdownMenuTrigger as-child> with Button
 * 3. [ ] Convert label/icon props to Button content
 * 4. [ ] Add <DropdownMenuContent> wrapper
 * 5. [ ] Convert items array to individual <DropdownMenuItem> elements
 * 6. [ ] Move item icons from props to slot content
 * 7. [ ] Replace divider items with <DropdownMenuSeparator />
 * 8. [ ] Replace label items with <DropdownMenuLabel>
 * 9. [ ] Convert to/href items to as-child + NuxtLink/a
 * 10. [ ] Map placement prop to side + align props
 * 11. [ ] Map offset prop to sideOffset
 * 12. [ ] Convert click handlers to @click on items
 * 13. [ ] Add proper icon spacing (me-2 for RTL support)
 * 14. [ ] Test keyboard navigation
 * 15. [ ] Verify focus management and accessibility
 */

// ============================================================================
// COMMON PITFALLS
// ============================================================================

/**
 * PITFALL 1: Not using as-child on trigger
 *
 * ❌ WRONG:
 * <DropdownMenuTrigger>
 *   <Button>Trigger</Button>
 * </DropdownMenuTrigger>
 *
 * ✅ CORRECT:
 * <DropdownMenuTrigger as-child>
 *   <Button>Trigger</Button>
 * </DropdownMenuTrigger>
 *
 * Why: Without as-child, you get nested button elements
 */

/**
 * PITFALL 2: Using items array prop (doesn't exist)
 *
 * ❌ WRONG:
 * <DropdownMenu :items="menuItems">
 *   ...
 * </DropdownMenu>
 *
 * ✅ CORRECT:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem v-for="item in menuItems" :key="item.id">
 *       {{ item.label }}
 *     </DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * Why: shadcn-vue uses composition pattern, not items prop
 */

/**
 * PITFALL 3: Forgetting DropdownMenuContent wrapper
 *
 * ❌ WRONG:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuItem>Item</DropdownMenuItem>
 * </DropdownMenu>
 *
 * ✅ CORRECT:
 * <DropdownMenu>
 *   <DropdownMenuTrigger as-child>
 *     <Button>Menu</Button>
 *   </DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 *
 * Why: DropdownMenuContent is required for positioning and portal
 */

/**
 * PITFALL 4: Not using as-child for navigation items
 *
 * ❌ WRONG:
 * <DropdownMenuItem>
 *   <NuxtLink to="/blog">Blog</NuxtLink>
 * </DropdownMenuItem>
 *
 * ✅ CORRECT:
 * <DropdownMenuItem as-child>
 *   <NuxtLink to="/blog">Blog</NuxtLink>
 * </DropdownMenuItem>
 *
 * Why: Without as-child, you get nested interactive elements
 */

/**
 * PITFALL 5: Using wrong separator component
 *
 * ❌ WRONG:
 * <DropdownMenuItem>
 *   <hr />
 * </DropdownMenuItem>
 *
 * ✅ CORRECT:
 * <DropdownMenuSeparator />
 *
 * Why: Use semantic DropdownMenuSeparator for proper styling and accessibility
 */

export type {
  NuxtUIDropdownProps,
  ShadcnDropdownMenuContentProps,
  ShadcnDropdownMenuItemProps,
  ShadcnDropdownMenuLabelProps,
  ShadcnDropdownMenuProps,
  ShadcnDropdownMenuSeparatorProps,
  ShadcnDropdownMenuTriggerProps,
}
