import { defineConfig } from 'vite-plus'

export default defineConfig({
  fmt: {
    semi: false,
    singleQuote: true,
    ignorePatterns: ['dist/**', '**/*.md'],
  },
  lint: {
    ignorePatterns: ['dist/**'],
    rules: {
      curly: ['error', 'all'],
    },
  },
  pack: {
    entry: ['bin/howfar.ts'],
    format: ['es'],
    platform: 'node',
    target: 'node22',
  },
  staged: {
    '*.{ts,js}': ['vp check --fix', 'vp test related --run'],
  },
})
