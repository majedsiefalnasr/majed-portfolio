import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/require-default-prop': 'off',
    complexity: ['error', 10],
    'max-len': ['error', { code: 100 }],
    '@typescript-eslint/no-magic-numbers': ['error', { ignore: [0, 1, -1] }],
  },
})
