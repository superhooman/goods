/** @type {import("eslint").Linter.Config} */
const config = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: true,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended-type-checked',
        'plugin:@typescript-eslint/stylistic-type-checked',
    ],
    rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
        '@typescript-eslint/array-type': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',

        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/no-misused-promises': [
            2,
            {
                checksVoidReturn: { attributes: false },
            },
        ],

        'quotes': ['error', 'single'],
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'eol-last': ['error', 'always'],
        'import/order': [
            'warn',
            {
                'pathGroups': [
                    {
                        'pattern': '**/*.css.ts',
                        'group': 'index',
                        'position': 'after'
                    }
                ],
                'groups': [
                    'builtin',
                    'external',
                    'type',
                    'internal',
                    ['sibling', 'parent'],
                    'index',
                    'object'
                ],
                'newlines-between': 'always'
            }
        ]
    },
};

module.exports = config;
