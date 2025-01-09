/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: ['universe'],
    plugins: ['unused-imports', 'simple-import-sort', ],
    rules: {
        '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/consistent-indexed-object-style': 'error',
        '@typescript-eslint/consistent-type-definitions': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': 'error',
        'import/no-unresolved': 'error',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'error',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        curly: 'error',
        'sort-imports': off,
        'prefer-template': 'error',
        'import/no-extraneous-dependencies': 'error',
        'simple-import-sort/imports': ['error', {
            groups: [
                ['^\\u0000'],
                ['^react', '^@?\\w'],
                ['^(@masqany|ui|utils|app|types|core|config)(/.*|$)'],
                ['^@?\\w'],
            ],
        }],
    },
}