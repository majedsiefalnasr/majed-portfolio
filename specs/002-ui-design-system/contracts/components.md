# Component Interfaces

This document defines the API contracts for all layout components in the UI & Design System feature.

## AppHeader

Main navigation header with logo and navigation links.

### Props

```typescript
interface AppHeaderProps {
  /** Navigation links (defaults to standard portfolio structure) */
  links?: NavigationLink[]
  /** Show/hide navigation */
  showNav?: boolean
  /** Logo component or image URL */
  logo?: string
}
```

### Prop Details

#### `links`

- **Type**: `NavigationLink[]`
- **Default**: Standard portfolio links (Home, Projects, About, Blog, Contact)
- **Optional**: Yes
- **Description**: Array of navigation links to display

```typescript
interface NavigationLink {
  label: string // i18n key (e.g., 'nav.home')
  to: string // Route path (e.g., '/')
  order: number // Display order
}
```

#### `showNav`

- **Type**: `boolean`
- **Default**: `true`
- **Optional**: Yes
- **Description**: Toggle navigation visibility (useful for minimal layouts)

#### `logo`

- **Type**: `string`
- **Default**: Site name from config
- **Optional**: Yes
- **Description**: Logo image URL or text content

### Slots

#### `logo`

- **Description**: Custom logo content (overrides `logo` prop)
- **Bindings**: None

```vue
<AppHeader>
  <template #logo>
    <NuxtImg src="/logo.svg" alt="Logo" />
  </template>
</AppHeader>
```

#### `nav`

- **Description**: Custom navigation content (overrides `links` prop)
- **Bindings**: `{ links: NavigationLink[] }`

```vue
<AppHeader>
  <template #nav="{ links }">
    <CustomNav :links="links" />
  </template>
</AppHeader>
```

### Events

None (navigation handled by Nuxt routing)

### Example Usage

```vue
<script setup lang="ts">
  const customLinks = [
    {label: 'nav.home', to: '/', order: 1},
    {label: 'nav.work', to: '/work', order: 2},
  ]
</script>

<template>
  <!-- Default usage -->
  <AppHeader />

  <!-- Custom links -->
  <AppHeader :links="customLinks" />

  <!-- Custom logo -->
  <AppHeader logo="/brand/logo.svg" />

  <!-- Slot-based customization -->
  <AppHeader>
    <template #logo>
      <LogoComponent />
    </template>
  </AppHeader>
</template>
```

### Styling

- Uses Tailwind utilities with logical properties
- Logo positioned on start edge (left LTR, right RTL)
- Navigation on end edge (right LTR, left RTL)
- Active link styling applied automatically

### Accessibility

- `<header>` semantic HTML
- `<nav>` with `aria-label="Primary navigation"`
- Active link has `aria-current="page"`
- Keyboard navigable
- Focus indicators visible

---

## AppFooter

Footer with social links, copyright, and theme/language toggles.

### Props

```typescript
interface AppFooterProps {
  /** Social media links */
  socialLinks?: SocialLink[]
  /** Copyright text (supports i18n) */
  copyright?: string
  /** Show/hide theme toggle */
  showThemeToggle?: boolean
  /** Show/hide language switcher */
  showLanguageSwitcher?: boolean
}
```

### Prop Details

#### `socialLinks`

- **Type**: `SocialLink[]`
- **Default**: Standard social links (GitHub, LinkedIn, Twitter, Email)
- **Optional**: Yes
- **Description**: Array of social media links

```typescript
interface SocialLink {
  platform: 'github' | 'linkedin' | 'twitter' | 'email'
  url: string
  icon: string // Icon name
  label: string // i18n key for accessibility
}
```

#### `copyright`

- **Type**: `string`
- **Default**: `'footer.copyright'` (i18n key)
- **Optional**: Yes
- **Description**: Copyright text or i18n key

#### `showThemeToggle`

- **Type**: `boolean`
- **Default**: `true`
- **Optional**: Yes
- **Description**: Show/hide dark mode toggle button

#### `showLanguageSwitcher`

- **Type**: `boolean`
- **Default**: `true`
- **Optional**: Yes
- **Description**: Show/hide language switcher dropdown

### Slots

#### `social`

- **Description**: Custom social links section
- **Bindings**: `{ links: SocialLink[] }`

```vue
<AppFooter>
  <template #social="{ links }">
    <CustomSocialLinks :links="links" />
  </template>
</AppFooter>
```

#### `copyright`

- **Description**: Custom copyright content
- **Bindings**: `{ text: string }`

```vue
<AppFooter>
  <template #copyright>
    <p>&copy; 2026 Custom Copyright</p>
  </template>
</AppFooter>
```

### Events

None (toggles managed by composables internally)

### Example Usage

```vue
<script setup lang="ts">
  const customSocial = [
    {
      platform: 'github',
      url: 'https://github.com/username',
      icon: 'i-simple-icons-github',
      label: 'social.github',
    },
  ]
</script>

<template>
  <!-- Default usage -->
  <AppFooter />

  <!-- Custom social links -->
  <AppFooter :social-links="customSocial" />

  <!-- Hide toggles -->
  <AppFooter :show-theme-toggle="false" :show-language-switcher="false" />

  <!-- Custom copyright -->
  <AppFooter copyright="© 2026 All Rights Reserved" />
</template>
```

### Styling

- Uses Tailwind utilities
- Grid/flex layout for responsive behavior
- Social icons as icon buttons
- Theme toggle with icon (sun/moon)
- Language switcher as dropdown/toggle

### Accessibility

- `<footer>` semantic HTML
- Social links have `aria-label` attributes
- Theme toggle has descriptive `aria-label`
- Language switcher is keyboard navigable
- Sufficient color contrast

---

## Container

Responsive width-constrained wrapper with configurable breakpoints.

### Props

```typescript
interface ContainerProps {
  /** Custom configuration (overrides defaults) */
  config?: ContainerConfig
  /** HTML element tag */
  as?: string
}

interface ContainerConfig {
  maxWidth?: Partial<Record<Breakpoint, string>>
  padding?: Partial<Record<Breakpoint, string>>
  centered?: boolean
}

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl'
```

### Prop Details

#### `config`

- **Type**: `ContainerConfig`
- **Default**: Tailwind default breakpoints and standard padding
- **Optional**: Yes
- **Description**: Override default container behavior

Default values:

```typescript
{
  maxWidth: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1536px' },
  padding: { sm: '1rem', md: '1.5rem', lg: '2rem', xl: '2rem', '2xl': '2rem' },
  centered: true
}
```

#### `as`

- **Type**: `string`
- **Default**: `'div'`
- **Optional**: Yes
- **Description**: HTML element tag to render

### Slots

#### `default`

- **Description**: Container content
- **Bindings**: None

### Example Usage

```vue
<template>
  <!-- Default usage -->
  <Container>
    <h1>Page content</h1>
  </Container>

  <!-- Custom max-width -->
  <Container :config="{maxWidth: {lg: '900px'}}">
    <article>Narrower content</article>
  </Container>

  <!-- As section element -->
  <Container as="section">
    <h2>Section content</h2>
  </Container>

  <!-- No centering -->
  <Container :config="{centered: false}">
    <div>Left-aligned content</div>
  </Container>
</template>
```

### Styling

- Applies `max-width` per breakpoint
- Horizontal padding prevents edge-to-edge
- Centers content with `mx-auto` (if `centered: true`)
- Responsive: width constraints adjust at each breakpoint

### Accessibility

- Purely presentational (no semantic meaning)
- Does not affect screen reader behavior
- Uses div by default (can be changed with `as` prop)

---

## Common Patterns

### Combining Components

```vue
<template>
  <AppHeader />

  <Container as="main">
    <!-- Page content -->
  </Container>

  <AppFooter />
</template>
```

### Theme-Aware Styling

Components automatically respond to theme changes via CSS custom properties:

```vue
<div class="bg-background-default-surface-base text-typography-title">
  <!-- Colors update automatically when theme changes -->
</div>
```

### RTL Layout

Components use logical properties and automatically mirror:

```vue
<!-- In English (LTR) -->
<AppHeader> <!-- Logo left, nav right -->

<!-- In Arabic (RTL) -->
<AppHeader> <!-- Logo right, nav left -->
```

---

## Type Definitions

For complete type definitions, see [types.ts](./types.ts).

---

## Testing

See `test/components/` for component tests covering:

- Prop validation
- Slot rendering
- Responsive behavior
- Accessibility attributes
- RTL mirroring
- Theme integration
