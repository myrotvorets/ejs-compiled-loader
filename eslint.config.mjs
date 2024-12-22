import Config from '@myrotvorets/eslint-config-myrotvorets-ts';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        ignores: ['test/bundle.js'],
    },
    ...Config,
    {
        languageOptions: {
            globals: {
                ...globals.node,
            },
        },
    },
];
