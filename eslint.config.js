// eslint.config.js
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import pluginPlaywright from 'eslint-plugin-playwright'
import tsParser from '@typescript-eslint/parser'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig([
  // What files to lint
  { name: 'files', files: ['**/*.{js,cjs,mjs,jsx,ts,tsx,vue}'] },

  // Ignores
  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', '**/.vite/**']),

  // Base globals
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // JS rules — only for JS files (avoid taking over .vue)
  {
    ...js.configs.recommended,
    files: ['**/*.{js,cjs,mjs,jsx}'],
  },

  // Vue SFC rules (flat recommended) — handles .vue structure
  ...pluginVue.configs['flat/recommended'],

  // Tell Vue SFCs to parse <script lang="ts"> with TS
  {
    name: 'vue+ts',
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        // vue-eslint-parser is already set by the Vue preset.
        // This makes it delegate <script lang="ts"> to TS:
        parser: tsParser,
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      // avoid false positives
      'no-undef': 'off',
    },
  },

  // Plain TS files
  {
    name: 'ts',
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // For type-aware rules later, add:
        // project: ['./tsconfig.json'],
        // tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      'no-undef': 'off',
    },
  },

  // Vitest (unit tests)
  {
    ...pluginVitest.configs.recommended,
    files: ['**/*.{test,spec}.{js,ts,jsx,tsx}', 'src/**/__tests__/**/*.{js,ts,jsx,tsx}'],
    languageOptions: { globals: { ...globals.vitest } },
  },

  // Playwright (e2e)
  {
    ...pluginPlaywright.configs['flat/recommended'],
    files: ['e2e/**/*.{test,spec}.{js,ts,jsx,tsx}'],
  },

  // Don’t fight Prettier
  skipFormatting,
])
