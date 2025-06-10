import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';
import typescriptParser from '@typescript-eslint/parser';
// import typescriptRecommended from '@typescript-eslint/recommended';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    files: ['**/*.{ts,tsx}'],

    plugins: { js, typescriptPlugin, prettier: prettierPlugin },
    extends: [
      //   'eslint:recommended',
      //   //   'plugin:@typescript-eslint/recommended',
      //   //   'plugin:prettier/recommended',
      prettier,
    ],
    rules: { 'prettier/prettier': 'error', 'no-unused-vars': 'warn', 'no-console': 'off' },
    languageOptions: {
      parser: typescriptParser,
    },
  },
  {
    ignores: [
      'dist',
      'coverage',
      'webpack.config.js',
      'jest.config.js',
      'prettier.config.js',
      '**/test.js',
    ],
  },
]);
