# Feature Specification: shadcn-vue UI Library Migration

**Feature Branch**: `006-shadcn-vue-migration`  
**Created**: 2026-01-16  
**Status**: Draft  
**Input**: User description: "change the UI library to shadcn-vue instead of Nuxt/UI. with the help of shadcn MCP server."

## Clarifications

### Session 2026-01-16

- Q: When migrating from Nuxt UI to shadcn-vue, what should be the replacement approach? → A: Complete replacement - Remove all Nuxt UI components and module in one migration
- Q: shadcn-vue components typically use Radix Icons. Should the migration replace the current icon system? → A: Radix Icons - Use shadcn-vue's default Radix Icons for all UI components
- Q: The project currently uses custom Tailwind design tokens. How should these integrate with shadcn-vue's theming? → A: Adopt shadcn defaults - Replace current design system with shadcn-vue's default theme
- Q: shadcn-vue uses a CLI to copy components directly into your project. Where should these components be installed? → A: app/components/ui/ - Dedicated UI component directory (follows shadcn-vue convention)
- Q: With the component library change, how should existing component tests be handled? → A: no tests

## User Scenarios & Testing _(mandatory)_

### User Story 1 - Component Visual Consistency (Priority: P1)

Site visitors interact with UI components (buttons, cards, forms, navigation) that use shadcn-vue's modern, consistent design system with improved visual polish.

**Why this priority**: Ensures a cohesive, professional user experience with shadcn-vue's well-designed default theme. This is the most critical aspect of the migration as it establishes the new visual identity while maintaining usability.

**Independent Test**: Can be fully tested by navigating through all existing pages (homepage, blog listing, blog posts, case studies) and verifying that all interactive elements render with consistent shadcn-vue theming and maintain functional behavior.

**Acceptance Scenarios**:

1. **Given** a visitor on the homepage, **When** they view and interact with navigation, buttons, and cards, **Then** all components display with consistent shadcn-vue default styling, proper spacing, and typography hierarchy
2. **Given** a visitor reading a blog post, **When** they interact with post metadata, tags, and content blocks, **Then** all UI elements render with unified shadcn-vue theme
3. **Given** a visitor browsing case studies, **When** they view case study cards and metrics, **Then** all visual components use shadcn-vue's design system consistently

---

### User Story 2 - Responsive Design Preservation (Priority: P2)

Site visitors on mobile, tablet, and desktop devices experience properly responsive layouts and interactions across all viewport sizes.

**Why this priority**: Mobile traffic is critical for portfolio sites, and responsive design must work flawlessly across all devices. This ensures accessibility and usability for the full audience.

**Independent Test**: Can be fully tested by resizing browser viewport from 320px to 2560px width and verifying that all components adapt appropriately at all breakpoints.

**Acceptance Scenarios**:

1. **Given** a visitor on mobile (320px-768px), **When** they navigate the site, **Then** all components stack vertically, navigation collapses to mobile menu, and touch targets are appropriately sized
2. **Given** a visitor on tablet (768px-1024px), **When** they view content grids, **Then** layouts adjust to show appropriate column counts and maintain readability
3. **Given** a visitor on desktop (1024px+), **When** they browse pages, **Then** content expands to fill available space with appropriate max-widths and multi-column layouts

---

### User Story 3 - Theme Switching Functionality (Priority: P2)

Site visitors can toggle between dark and light themes, with their preference persisting across page navigations and browser sessions.

**Why this priority**: Theme switching is a core user preference feature that enhances accessibility and user comfort. Must work seamlessly with the new UI library.

**Independent Test**: Can be fully tested by clicking the theme toggle button, refreshing the page, and navigating between pages to verify persistence and correct rendering.

**Acceptance Scenarios**:

1. **Given** a visitor viewing the site in light mode, **When** they click the theme toggle, **Then** the entire site switches to dark mode within 200ms with smooth transitions
2. **Given** a visitor who has selected dark mode, **When** they refresh the page or navigate to another page, **Then** dark mode persists without flickering
3. **Given** a visitor with system dark mode preference, **When** they first visit the site, **Then** the site respects their system preference as the default theme

---

### User Story 4 - Bilingual RTL Support (Priority: P2)

Arabic-language visitors experience proper right-to-left (RTL) layout rendering with correct text alignment, component mirroring, and bidirectional text handling.

**Why this priority**: The portfolio supports bilingual content (English/Arabic), and RTL support is essential for Arabic users. Components must mirror correctly and maintain usability in RTL mode.

**Independent Test**: Can be fully tested by switching language to Arabic and verifying that all layouts flip horizontally, text aligns right, and interactive elements position correctly for RTL reading.

**Acceptance Scenarios**:

1. **Given** a visitor viewing Arabic content, **When** they navigate pages, **Then** all layouts mirror horizontally with navigation, buttons, and content aligned for RTL
2. **Given** a visitor reading Arabic blog posts, **When** they view code blocks and mixed-direction content, **Then** bidirectional text renders correctly with proper isolation
3. **Given** a visitor using Arabic interface, **When** they interact with forms and inputs, **Then** text entry and placeholders align right and cursors behave correctly for RTL

---

### User Story 5 - Accessibility Standards Compliance (Priority: P3)

All site visitors, including those using screen readers, keyboard navigation, or assistive technologies, can fully interact with all UI components.

**Why this priority**: Ensures the site remains inclusive and compliant with WCAG accessibility standards. While critical for compliance, this can be validated after core visual migration is complete.

**Independent Test**: Can be fully tested by navigating the entire site using only keyboard, running automated accessibility tests (Lighthouse, axe), and verifying screen reader announcements.

**Acceptance Scenarios**:

1. **Given** a visitor navigating with keyboard only, **When** they tab through interactive elements, **Then** all buttons, links, and form controls receive visible focus indicators and are reachable
2. **Given** a visitor using a screen reader, **When** they navigate the site, **Then** all interactive elements have proper ARIA labels and announcements
3. **Given** automated accessibility testing, **When** running Lighthouse and axe-core, **Then** the site maintains a score of 95+ with zero critical violations

---

### Edge Cases

- **What happens when a shadcn-vue component doesn't have a direct equivalent to an existing Nuxt UI component?**
  - **Resolution**: Combine shadcn-vue primitives to replicate functionality, or create custom wrapper component following shadcn-vue composition patterns. Document in contracts/ if this occurs.
- **How does the migration handle custom-styled Nuxt UI components that have project-specific overrides?**
  - **Resolution**: Replace with shadcn-vue components and apply custom styles via Tailwind classes. shadcn-vue components are copied to project, allowing direct modification if needed.
- **What happens if theme switching occurs during a page transition or while content is still loading?**
  - **Resolution**: @nuxtjs/color-mode handles class toggling at document root. CSS transitions ensure smooth visual updates. No special handling required.
- **How are dynamic imports and code-splitting affected by the new component library?**
  - **Resolution**: No impact expected. shadcn-vue components are local files in app/components/ui/, following same Nuxt auto-import and code-splitting behavior as custom components. Verify during T107 (bundle size analysis).
- **What happens when RTL and theme switching interact (e.g., switching to Arabic while in dark mode)?**
  - **Resolution**: Independent mechanisms - RTL via HTML dir attribute, theme via CSS variables. Both work simultaneously without conflict. Verify in US4 testing.
- **How does the migration handle components that are currently using Nuxt UI's auto-imports versus explicit imports?**
  - **Resolution**: Replace all with explicit imports from @/components/ui/. Nuxt auto-imports will work for shadcn-vue components in app/components/ui/ directory.

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: System MUST replace all Nuxt UI component imports with equivalent shadcn-vue components in a single comprehensive migration (no gradual or hybrid approach)
- **FR-002**: System MUST maintain functional behavior and layout structure for all existing UI components (buttons, cards, navigation, forms, typography)
- **FR-003**: System MUST adopt shadcn-vue's default theme including color scheme, spacing, and design tokens
- **FR-004**: System MUST support dark/light theme switching with the same behavior and persistence as the current implementation
- **FR-005**: System MUST maintain RTL layout support for Arabic language content with proper component mirroring
- **FR-006**: System MUST preserve responsive breakpoint behavior across mobile, tablet, and desktop viewports
- **FR-007**: System MUST maintain current accessibility levels (keyboard navigation, ARIA labels, focus management)
- **FR-008**: System MUST handle component prop compatibility by mapping Nuxt UI props to shadcn-vue equivalents
- **FR-009**: System MUST preserve existing component composition patterns (slots, emits, v-model bindings)
- **FR-010**: System MUST completely remove Nuxt UI module dependency from nuxt.config.ts and package.json (no hybrid library approach)
- **FR-011**: System MUST configure shadcn-vue with appropriate Tailwind CSS setup and design tokens using CLI-based installation into app/components/ui/ directory
- **FR-012**: System MUST maintain code-splitting and lazy-loading performance for component imports
- **FR-013**: System MUST preserve existing TypeScript type safety for all component props and events

### Component Migration Mapping

The following Nuxt UI components are currently in use and require shadcn-vue equivalents:

- **Navigation Components**: Header navigation, mobile menu, footer navigation
- **Content Cards**: Blog post cards, case study cards, feature cards
- **Typography**: Headings, body text, code blocks, inline code
- **Buttons**: Primary, secondary, ghost, and icon buttons with Radix Icons integration
- **Icons**: Radix Icons (shadcn-vue default) replacing current icon library
- **Layout Components**: Container, grid, spacing utilities
- **Theme Toggle**: Dark/light mode switch component

### Key Entities _(optional - not applicable for this migration)_

This migration does not introduce new data entities. It replaces the presentation layer only.

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: All existing pages render with consistent shadcn-vue default theme applied uniformly across all components and pages
- **SC-002**: Lighthouse performance score remains above 90 after migration (no performance degradation)
- **SC-003**: Lighthouse accessibility score remains at 95+ after migration
- **SC-004**: Bundle size for UI components decreases or stays within 5% of current size (no bloat from library change)
- **SC-005**: Theme switching completes within 200ms with no visual flashing or layout shifts
- **SC-006**: RTL layout works correctly on all pages when Arabic language is selected (verified by visual inspection)
- **SC-007**: Zero console errors or warnings related to component usage in both development and production builds
- **SC-008**: Build time remains within 10% of current build duration
- **SC-009**: All interactive components maintain current keyboard navigation patterns

## Assumptions

1. **Design System Compatibility**: shadcn-vue provides sufficient component primitives to replicate all existing Nuxt UI component functionality
2. **Tailwind CSS Integration**: The project's Tailwind CSS configuration will be updated to use shadcn-vue's default theme configuration
3. **Component Customization**: shadcn-vue components are sufficiently customizable to match the current design without extensive workarounds
4. **Vue 3 Compatibility**: shadcn-vue is fully compatible with the Nuxt 4 (Vue 3) setup currently in use
5. **Type Safety**: shadcn-vue provides TypeScript definitions that are compatible with the project's strict TypeScript mode
6. **MCP Server Availability**: The shadcn MCP server is accessible and can assist with component generation and configuration
7. **Icon Library**: Radix Icons (shadcn-vue's default icon system) will replace the current icon library seamlessly

## Dependencies

- **Tailwind CSS**: Must ensure shadcn-vue's Tailwind preset is compatible with existing configuration
- **TypeScript**: Strict mode must be maintained with full type coverage
- **Nuxt Content**: Content rendering and MDC components must work with new UI components
- **i18n**: Bilingual support must continue to work with new components
- **Theme Composable**: `useTheme()` composable may need updates to work with shadcn-vue theming

## Migration Constraints

- **Consistent Design System**: End users will experience a cohesive shadcn-vue default theme across all pages
- **No Feature Removal**: All current UI functionality must be preserved
- **Backward Compatibility**: Content files (markdown) should not require updates
- **Deployment Safety**: Migration should be atomic (single deployment) with rollback capability
- **Development Continuity**: Other team members should be able to continue development with minimal disruption

## Post-Migration Validation

After completing the migration, the following validation steps must be performed:

1. **Theme Consistency Testing**: Verify shadcn-vue default theme is applied uniformly across all pages
2. **Manual Testing**: Complete user journey testing across all user stories
3. **Performance Testing**: Run Lighthouse audits on all main pages
4. **Accessibility Audit**: Run axe-core and manual screen reader testing
5. **Browser Compatibility**: Test on Chrome, Firefox, Safari, and Edge (latest versions)
6. **Mobile Testing**: Test on iOS Safari and Android Chrome
7. **RTL Testing**: Verify all Arabic pages render correctly with shadcn-vue components
8. **Theme Testing**: Verify dark/light mode works on all pages with shadcn-vue's theming
9. **Build Verification**: Ensure production build succeeds with no errors
10. **Bundle Analysis**: Compare bundle sizes before and after migration
