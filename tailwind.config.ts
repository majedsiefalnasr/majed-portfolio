import type {Config} from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // Background colors
        background: {
          blanket: 'var(--background-blanket)',
          disabled: 'var(--background-disabled)',
          danger: {
            bold: 'var(--background-danger-bold)',
            default: 'var(--background-danger-default)',
          },
          dashboard: {
            nav: 'var(--background-dashboard-nav)',
            'brand-bold': 'var(--background-dashboard-brand-bold)',
            'brand-default': 'var(--background-dashboard-brand-default)',
            'surface-base': 'var(--background-dashboard-surface-base)',
            'surface-layer-1': 'var(--background-dashboard-surface-layer-1)',
            'surface-layer-2': 'var(--background-dashboard-surface-layer-2)',
          },
          default: {
            'brand-bold': 'var(--background-default-brand-bold)',
            'brand-default': 'var(--background-default-brand-default)',
            'surface-base': 'var(--background-default-surface-base)',
            'surface-layer-1': 'var(--background-default-surface-layer-1)',
            'surface-layer-2': 'var(--background-default-surface-layer-2)',
          },
          discovery: {
            bold: 'var(--background-discovery-bold)',
            default: 'var(--background-discovery-default)',
          },
          information: {
            bold: 'var(--background-information-bold)',
            default: 'var(--background-information-default)',
          },
          neutral: {
            bold: 'var(--background-neutral-bold)',
            default: 'var(--background-neutral-default)',
          },
          selected: {
            bold: 'var(--background-selected-bold)',
            default: 'var(--background-selected-default)',
          },
          success: {
            bold: 'var(--background-success-bold)',
            default: 'var(--background-success-default)',
          },
          warning: {
            bold: 'var(--background-warning-bold)',
            default: 'var(--background-warning-default)',
          },
        },

        // Border colors
        border: {
          default: 'var(--border-default)',
          error: 'var(--border-error)',
          focused: 'var(--border-focused)',
          success: 'var(--border-success)',
          warning: 'var(--border-warning)',
        },

        // Button colors
        button: {
          error: {
            default: 'var(--button-error-default)',
            hover: 'var(--button-error-hover)',
          },
          primary: {
            default: 'var(--button-primary-default)',
            hover: 'var(--button-primary-hover)',
            inverse: {
              default: 'var(--button-primary-inverse-default)',
              hover: 'var(--button-primary-inverse-hover)',
            },
          },
          secondary: {
            default: 'var(--button-secondary-default)',
            hover: 'var(--button-secondary-hover)',
          },
        },

        // Icon colors
        icon: {
          brand: 'var(--icon-brand)',
          danger: 'var(--icon-danger)',
          default: 'var(--icon-default)',
          disabled: 'var(--icon-disabled)',
          discovery: 'var(--icon-discovery)',
          information: 'var(--icon-information)',
          inverse: 'var(--icon-inverse)',
          link: 'var(--icon-link)',
          selected: 'var(--icon-selected)',
          subtle: 'var(--icon-subtle)',
          'subtle-inverse': 'var(--icon-subtle-inverse)',
          success: 'var(--icon-success)',
          warning: 'var(--icon-warning)',
          'warning-inverse': 'var(--icon-warning-inverse)',
        },

        // Typography colors
        typography: {
          body: 'var(--typography-body)',
          brand: 'var(--typography-brand)',
          disabled: 'var(--typography-disabled)',
          inverse: 'var(--typography-inverse)',
          link: 'var(--typography-link)',
          subtle: 'var(--typography-subtle)',
          'subtle-inverse': 'var(--typography-subtle-inverse)',
          title: 'var(--typography-title)',
          'title-inverse': 'var(--typography-title-inverse)',
        },

        // Palette colors
        palettes: {
          grayscale: {
            100: 'var(--palettes-grayscale-100)',
            200: 'var(--palettes-grayscale-200)',
            300: 'var(--palettes-grayscale-300)',
            400: 'var(--palettes-grayscale-400)',
          },
          static: {
            black: 'var(--palettes-static-black)',
            white: 'var(--palettes-static-white)',
            blue: 'var(--palettes-static-blue)',
            green: 'var(--palettes-static-green)',
            orange: 'var(--palettes-static-orange)',
            red: 'var(--palettes-static-red)',
            brand: 'var(--palettes-static-brand)',
          },
          blue: {
            base: 'var(--palettes-blue-base)',
            20: 'var(--palettes-blue-20)',
            40: 'var(--palettes-blue-40)',
            60: 'var(--palettes-blue-60)',
          },
          green: {
            base: 'var(--palettes-green-base)',
            20: 'var(--palettes-green-20)',
            40: 'var(--palettes-green-40)',
            60: 'var(--palettes-green-60)',
          },
          orange: {
            base: 'var(--palettes-orange-base)',
            20: 'var(--palettes-orange-20)',
            40: 'var(--palettes-orange-40)',
            60: 'var(--palettes-orange-60)',
          },
          red: {
            base: 'var(--palettes-red-base)',
            20: 'var(--palettes-red-20)',
            40: 'var(--palettes-red-40)',
            60: 'var(--palettes-red-60)',
          },
          yellow: {
            base: 'var(--palettes-yellow-base)',
            20: 'var(--palettes-yellow-20)',
            40: 'var(--palettes-yellow-40)',
            60: 'var(--palettes-yellow-60)',
          },
          primary: {
            100: 'var(--palettes-primary-100)',
            200: 'var(--palettes-primary-200)',
            700: 'var(--palettes-primary-700)',
            900: 'var(--palettes-primary-900)',
          },
          neutral: {
            100: 'var(--palettes-neutral-100)',
            200: 'var(--palettes-neutral-200)',
            700: 'var(--palettes-neutral-700)',
            900: 'var(--palettes-neutral-900)',
            1200: 'var(--palettes-neutral-1200)',
          },
        },
      },

      fontFamily: {
        sans: [
          'Geist',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
    },
  },
}
