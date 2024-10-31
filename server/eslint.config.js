import js from "@eslint/js";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            globals: {
                process: 'readonly',
                console: 'readonly'
            },
            parserOptions: {
                ecmaVersion: 2021,
                sourceType: 'module'
            }
        },
        rules: {
            "camelcase": "error",
            "eqeqeq": "warn",
            "func-style": "warn",
            "max-depth": "warn",
            "no-var": "error",
            "prefer-arrow-callback": "warn",
            "prefer-const": "error",
            "prefer-promise-reject-errors": "warn",
            "require-await": "error",
            "yoda": "warn",
            "semi": "error"
        }
    }
];