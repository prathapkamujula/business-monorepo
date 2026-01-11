module.exports = {
    root: true,
    env: {
        es2021: true,
        node: true,
        browser: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
    ],
    rules: {
        'prettier/prettier': 'error',

        // sensible defaults
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',

        'import/order': [
            'warn',
            {
                groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                'newlines-between': 'always',
            },
        ],
    },
    ignorePatterns: ['dist', 'build', 'node_modules', '*.config.js'],
    overrides: [
        // React apps only
        {
            files: ['apps/**/src/**/*.{ts,tsx}'],
            plugins: ['react', 'react-hooks'],
            extends: ['plugin:react/recommended', 'plugin:react-hooks/recommended'],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            rules: {
                'react/react-in-jsx-scope': 'off', // Vite + React 17+
            },
        },

        // Shared packages (no React assumptions)
        {
            files: ['packages/**/src/**/*.{ts,js}'],
            env: {
                node: true,
            },
        },
    ],
};
