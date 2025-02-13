/**@type {import('eslint').Linter.Config} */
const config = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'universe/web',
    './base.js',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  rules: {
    'react/prop-types': 'off',
    '@typescript-eslint/consistent-type-assertions': 'warn',
  },
  ignorePatterns: ['**/dist/*', '**/build/*'],
  settings: {
    formComponents: ['Form'],
    linkComponents: [{ name: 'Link', linkAttribute: 'to' }],
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};

module.exports = config;
