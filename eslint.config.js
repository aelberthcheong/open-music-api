import js from "@eslint/js";
import json from "@eslint/json";
import globals from "globals";
import { defineConfig } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
    { ignores: ["node_modules"] },

    {
        files: ["**/*.{js,mjs,cjs}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.node },
        rules: {
            // Terkadang variable perlu diabaikan e.g. express middleware, node-pg-migrate...
            // dikarenakan itu kita pastikan variable dapat diabaikan secara eksplisit dengan penambahan prefix '_'
            // behave sama persis dengan `deno lint`.
            "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    },
    {
        files: ["src/**/*.json", "postman/**/*.json"],
        plugins: { json },
        language: "json/json",
        extends: ["json/recommended"],
    },

    // override config-config diatas yang dapat menyebabkan conflict dengan prettier
    eslintConfigPrettier,
]);
