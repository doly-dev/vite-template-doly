import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
// ref: https://github.com/facebook/react/issues/28313#issuecomment-2407428442
import reactHooks from 'eslint-plugin-react-hooks';

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'dist-analyze/',
      'dev-dist/',
      'stylelint.config.cjs',
      'commitlint.config.cjs'
    ]
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh
    },
    languageOptions: {
      parser: tseslint.parser
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/ban-ts-comment': 0,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      ...reactHooks.configs.recommended.rules
    }
  }
);
