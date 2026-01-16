# Data Model: shadcn-vue UI Component Structure

**Feature**: shadcn-vue UI Library Migration  
**Branch**: `006-shadcn-vue-migration`  
**Date**: 2026-01-16  
**Phase**: 1 (Design)

## Overview

This document defines the component structure, properties, and relationships for the shadcn-vue migration. Since this is a UI library replacement (not a data-layer feature), the "data model" represents component interfaces and composition patterns rather than database entities.

---

## Component Entities

### 1. Button Component

**Location**: `app/components/ui/button.vue`  
**Purpose**: Primary interactive element for user actions

**Props**:

```typescript
interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  as-child?: boolean
  class?: string | object
}
```

**Slots**:

- `default`: Button content (text, icons)

**Usage Pattern**:

```vue
<Button variant="default" size="lg">
  Click me
</Button>

<Button variant="ghost" size="icon">
  <Icon icon="radix-icons:moon" class="h-5 w-5" />
</Button>

<Button variant="link">
  Read more
  <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
</Button>
```

**Migration Notes**:

- Nuxt UI `UButton` (icon prop) → `Button` (size="icon") with slotted Icon
- Nuxt UI `UButton` (trailing-icon) → `Button` with Icon in default slot
- Nuxt UI `UButton` (padded prop) → Handled via class prop with Tailwind utilities

---

### 2. Card Component Family

**Location**: `app/components/ui/card.vue`  
**Purpose**: Container for grouped content with optional header, content, and footer sections

**Components**:

1. `Card` - Root container
2. `CardHeader` - Top section for title/description
3. `CardTitle` - Semantic title element
4. `CardDescription` - Subtitle/description text
5. `CardContent` - Main content area
6. `CardFooter` - Bottom section for actions

**Props** (Card):

```typescript
interface CardProps {
  class?: string | object
}
```

**Props** (CardHeader, CardContent, CardFooter):

```typescript
interface CardSectionProps {
  class?: string | object
}
```

**Props** (CardTitle, CardDescription):

```typescript
interface CardTextProps {
  class?: string | object
  as?: string // Default: 'h3' for CardTitle, 'p' for CardDescription
}
```

**Composition Pattern**:

```vue
<Card class="hover:shadow-lg transition-all">
  <CardHeader>
    <CardTitle>Blog Post Title</CardTitle>
    <CardDescription>Published on Jan 16, 2026</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Post excerpt goes here...</p>
  </CardContent>
  <CardFooter>
    <Button variant="link">
      Read more
      <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
    </Button>
  </CardFooter>
</Card>
```

**Migration Notes**:

- Nuxt UI `UCard` (single component) → shadcn-vue `Card` + sub-components
- Explicit structure (header/content/footer) improves semantic HTML
- More flexible for custom layouts

---

### 3. DropdownMenu Component Family

**Location**: `app/components/ui/dropdown-menu.vue`  
**Purpose**: Contextual menu triggered by a button or other element

**Components**:

1. `DropdownMenu` - Root container
2. `DropdownMenuTrigger` - Element that opens the menu
3. `DropdownMenuContent` - Menu container
4. `DropdownMenuItem` - Individual menu item
5. `DropdownMenuLabel` - Section label
6. `DropdownMenuSeparator` - Visual divider
7. `DropdownMenuCheckboxItem` - Checkable menu item
8. `DropdownMenuRadioGroup` - Radio button group container
9. `DropdownMenuRadioItem` - Radio button menu item

**Props** (DropdownMenu):

```typescript
interface DropdownMenuProps {
  open?: boolean
  defaultOpen?: boolean
  modal?: boolean
}
```

**Props** (DropdownMenuTrigger):

```typescript
interface DropdownMenuTriggerProps {
  'as-child'?: boolean
  class?: string | object
}
```

**Props** (DropdownMenuContent):

```typescript
interface DropdownMenuContentProps {
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  'side-offset'?: number
  class?: string | object
}
```

**Props** (DropdownMenuItem):

```typescript
interface DropdownMenuItemProps {
  disabled?: boolean
  'as-child'?: boolean
  class?: string | object
}
```

**Composition Pattern**:

```vue
<DropdownMenu>
  <DropdownMenuTrigger as-child>
    <Button variant="outline">
      Options
      <Icon icon="radix-icons:chevron-down" class="ml-2 h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Actions</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem @click="handleEdit">
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem @click="handleDelete">
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### 4. Badge Component

**Location**: `app/components/ui/badge.vue`  
**Purpose**: Small status indicator or label

**Props**:

```typescript
interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  class?: string | object
}
```

**Usage Pattern**:

```vue
<Badge variant="default">New</Badge>
<Badge variant="secondary">TypeScript</Badge>
<Badge variant="outline">Draft</Badge>
```

---

### 5. Alert Component Family

**Location**: `app/components/ui/alert.vue`  
**Purpose**: Display important messages to users

**Components**:

1. `Alert` - Root container
2. `AlertTitle` - Alert heading
3. `AlertDescription` - Alert body text

**Props** (Alert):

```typescript
interface AlertProps {
  variant?: 'default' | 'destructive'
  class?: string | object
}
```

**Props** (AlertTitle, AlertDescription):

```typescript
interface AlertTextProps {
  class?: string | object
}
```

**Composition Pattern**:

```vue
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>
    There was an error processing your request.
  </AlertDescription>
</Alert>
```

---

### 6. Icon Component (from @iconify/vue)

**Location**: External dependency (not in `app/components/ui/`)  
**Purpose**: Render Radix Icons throughout the application

**Props**:

```typescript
interface IconProps {
  icon: string // Format: 'radix-icons:icon-name'
  class?: string | object
  width?: string | number
  height?: string | number
  inline?: boolean
  flip?: 'horizontal' | 'vertical' | 'both'
  rotate?: number | string
}
```

**Usage Pattern**:

```vue
<Icon icon="radix-icons:moon" class="h-5 w-5" />
<Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
<Icon icon="radix-icons:clipboard" />
```

**Icon Catalog** (commonly used):

- Navigation: `arrow-left`, `arrow-right`, `chevron-down`, `chevron-up`, `hamburger-menu`
- UI State: `moon`, `sun`, `check`, `cross-2`, `eye-open`, `eye-none`
- Actions: `clipboard`, `share-1`, `download`, `upload`, `pencil-1`, `trash`
- Indicators: `dot-filled`, `circle`, `info-circled`, `exclamation-triangle`

---

## Custom Component Adaptations

### 7. BlogPostCard (Custom Component)

**Location**: `app/components/blog/BlogPostCard.vue`  
**Purpose**: Display blog post preview with metadata

**Internal Structure** (migrated):

```vue
<template>
  <NuxtLink :to="post.path" class="block">
    <Card class="transition-all hover:shadow-lg">
      <div v-if="post.featuredImage" class="mb-4 -mx-6 -mt-6">
        <NuxtImg
          :src="post.featuredImage"
          :alt="post.title"
          class="w-full h-48 object-cover rounded-t-lg"
          loading="lazy" />
      </div>

      <CardHeader>
        <CardTitle>{{ post.title }}</CardTitle>
      </CardHeader>

      <CardContent>
        <BlogPostMeta
          :date="post.date"
          :read-time="readTime"
          :tags="showTags ? post.tags : undefined"
          :author="post.author"
          class="mb-3" />
        <p v-if="showExcerpt && excerpt" class="text-muted-foreground line-clamp-3">
          {{ excerpt }}
        </p>
      </CardContent>

      <CardFooter>
        <Button variant="link" class="px-0">
          Read more
          <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
```

**Dependencies**:

- `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` from shadcn-vue
- `Button` from shadcn-vue
- `Icon` from @iconify/vue
- `BlogPostMeta` (custom component - minimal changes)

---

### 8. CaseStudyCard (Custom Component)

**Location**: `app/components/case-study/CaseStudyCard.vue`  
**Purpose**: Display case study preview with client and role info

**Internal Structure** (migrated):

```vue
<template>
  <NuxtLink :to="caseStudy.path" class="block">
    <Card class="cursor-pointer transition-all hover:shadow-lg group relative overflow-hidden">
      <!-- Featured image section -->
      <div v-if="caseStudy.featuredImage" class="relative h-48 overflow-hidden">
        <NuxtImg
          :src="caseStudy.featuredImage"
          :alt="caseStudy.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform"
          loading="lazy" />
      </div>

      <CardHeader>
        <div class="flex items-center justify-between mb-2">
          <Badge variant="secondary">{{ caseStudy.client }}</Badge>
          <span class="text-sm text-muted-foreground">{{ caseStudy.role }}</span>
        </div>
        <CardTitle>{{ caseStudy.title }}</CardTitle>
        <CardDescription v-if="showExcerpt && excerpt">{{ excerpt }}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button variant="link" class="px-0">
          View case study
          <Icon icon="radix-icons:arrow-right" class="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  </NuxtLink>
</template>
```

**Dependencies**:

- `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardFooter` from shadcn-vue
- `Badge` from shadcn-vue
- `Button` from shadcn-vue
- `Icon` from @iconify/vue

---

### 9. AppHeader (Custom Component)

**Location**: `app/components/AppHeader.vue`  
**Purpose**: Site header with navigation and theme toggle

**Internal Structure** (migrated):

```vue
<template>
  <header class="bg-background border-b border-border sticky top-0 z-50">
    <Container>
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="text-foreground text-xl font-semibold hover:text-primary transition-colors">
          {{ logo || 'MS' }}
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav v-if="showNav" class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="[
              'text-sm font-medium transition-colors hover:text-primary',
              link.active ? 'text-foreground' : 'text-muted-foreground',
            ]">
            {{ t(link.label) }}
          </NuxtLink>
        </nav>

        <!-- Theme Toggle -->
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="outline" size="icon">
              <Icon icon="radix-icons:moon" class="h-5 w-5 dark:hidden" />
              <Icon icon="radix-icons:sun" class="h-5 w-5 hidden dark:block" />
              <span class="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem @click="colorMode.preference = 'light'">Light</DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'dark'">Dark</DropdownMenuItem>
            <DropdownMenuItem @click="colorMode.preference = 'system'">System</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Container>
  </header>
</template>
```

**Dependencies**:

- `Button` from shadcn-vue
- `DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem` from shadcn-vue
- `Icon` from @iconify/vue
- `Container` (custom component - retained)

---

## Component Relationship Diagram

```
shadcn-vue Components (app/components/ui/)
├── Button
├── Card
│   ├── CardHeader
│   ├── CardTitle
│   ├── CardDescription
│   ├── CardContent
│   └── CardFooter
├── DropdownMenu
│   ├── DropdownMenuTrigger
│   ├── DropdownMenuContent
│   ├── DropdownMenuItem
│   ├── DropdownMenuLabel
│   └── DropdownMenuSeparator
├── Badge
└── Alert
    ├── AlertTitle
    └── AlertDescription

External Dependencies
└── @iconify/vue
    └── Icon

Custom Components (consume shadcn-vue)
├── app/components/
│   ├── AppHeader (uses Button, DropdownMenu, Icon)
│   ├── AppFooter (uses Button, Icon)
│   ├── AppContainer (no shadcn-vue deps)
│   ├── blog/
│   │   ├── BlogPostCard (uses Card, Button, Icon)
│   │   ├── BlogPostMeta (minimal/no shadcn-vue deps)
│   │   └── BlogList (uses Button, Icon for pagination)
│   ├── case-study/
│   │   ├── CaseStudyCard (uses Card, Badge, Button, Icon)
│   │   ├── CaseStudyList (uses Button, Icon for pagination)
│   │   └── CaseStudyMetrics (uses Badge)
│   └── content/
│       ├── CodeBlock (uses Button, Icon for copy button)
│       └── [other MDC components - minimal changes]
```

---

## Type Definitions

### Shared Types

**File**: `app/types/ui.ts` (NEW)

```typescript
// shadcn-vue Button variant types
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon'

// shadcn-vue Badge variant types
export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

// shadcn-vue Alert variant types
export type AlertVariant = 'default' | 'destructive'

// Radix Icons type (string literal pattern)
export type RadixIcon = `radix-icons:${string}`

// Common icon names (autocomplete friendly)
export const COMMON_ICONS = {
  // Navigation
  ARROW_LEFT: 'radix-icons:arrow-left' as const,
  ARROW_RIGHT: 'radix-icons:arrow-right' as const,
  CHEVRON_DOWN: 'radix-icons:chevron-down' as const,
  CHEVRON_UP: 'radix-icons:chevron-up' as const,

  // Theme
  MOON: 'radix-icons:moon' as const,
  SUN: 'radix-icons:sun' as const,

  // Actions
  CLIPBOARD: 'radix-icons:clipboard' as const,
  CHECK: 'radix-icons:check' as const,
  CROSS: 'radix-icons:cross-2' as const,
} as const
```

---

## State Management

No global state is required for shadcn-vue components. All component state is local and managed via:

1. **Props**: Passed from parent to child
2. **Emits**: Events bubbled from child to parent
3. **Composables**: Shared logic (e.g., `useColorMode` for theme)
4. **Slots**: Content projection for composition

---

## Performance Considerations

1. **Tree-shaking**: Only imported components are bundled
2. **Code-splitting**: Components can be lazy-loaded with `defineAsyncComponent`
3. **CSS Variables**: Minimal runtime overhead for theming
4. **Icon Loading**: Iconify only bundles used icons (not entire icon set)

---

## Accessibility

All shadcn-vue components are built with:

1. **ARIA Attributes**: Proper roles, labels, and descriptions
2. **Keyboard Navigation**: Full keyboard support (Tab, Enter, Escape, Arrow keys)
3. **Focus Management**: Visible focus indicators and logical focus trapping
4. **Screen Reader Support**: Semantic HTML and announcements

---

## RTL Support

shadcn-vue components use Tailwind CSS directional utilities:

1. **Spacing**: `ml-*` → `ms-*` (start), `mr-*` → `me-*` (end)
2. **Text Alignment**: `text-left` → `text-start`, `text-right` → `text-end`
3. **Icons**: Components handle RTL mirroring automatically

**Example**:

```vue
<!-- LTR -->
<Button variant="link">
  Read more
  <Icon icon="radix-icons:arrow-right" class="ml-2" />
</Button>

<!-- RTL (automatic via dir="rtl" on html element) -->
<!-- Icon position flips automatically with ms-2 -->
```

---

## Migration Validation Checklist

- [ ] All `UCard` replaced with `Card` + sub-components
- [ ] All `UButton` replaced with `Button` + Icon slots
- [ ] All icon props converted to `<Icon>` components
- [ ] All Heroicons replaced with Radix Icons
- [ ] Theme toggle updated to use shadcn-vue DropdownMenu
- [ ] Custom components refactored to use shadcn-vue primitives
- [ ] TypeScript types updated for shadcn-vue components
- [ ] Accessibility maintained (ARIA, keyboard nav)
- [ ] RTL layout tested for Arabic content
- [ ] Performance validated (bundle size, Lighthouse scores)

---

## Next Steps

1. Generate API contracts in `contracts/` directory
2. Create quickstart guide for developers
3. Update agent context with shadcn-vue knowledge
4. Re-evaluate Constitution Check
