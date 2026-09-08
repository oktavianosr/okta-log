import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import perfectionist from 'eslint-plugin-perfectionist';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        plugins: {
            perfectionist,
            'simple-import-sort': simpleImportSort,
        },
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        rules: {
            // 'max-lines': ['error', { max: 500 }],
            // 'no-console': 'error',
            'perfectionist/sort-interfaces': [
                'error',
                { order: 'asc', type: 'natural' },
            ],
            'perfectionist/sort-jsx-props': [
                'error',
                { order: 'asc', type: 'natural' },
            ],
            'perfectionist/sort-object-types': [
                'error',
                { order: 'asc', type: 'natural' },
            ],
            'perfectionist/sort-objects': [
                'error',
                { order: 'asc', type: 'natural' },
            ],
            'perfectionist/sort-union-types': [
                'error',
                { order: 'asc', type: 'natural' },
            ],
            'simple-import-sort/exports': 'error',
            'simple-import-sort/imports': 'error',
        },
    },
]);
