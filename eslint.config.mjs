// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: [
    'node_modules/**',
    'dist/**',
    'build/**',
    '.nuxt/**',
    '.output/**',
    '.data/**',
    'coverage/**',
    '*.min.js',
  ],
})
