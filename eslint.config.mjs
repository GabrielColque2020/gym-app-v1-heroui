import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";
import reactPlugin from "eslint-plugin-react";

export default [
    ...tseslint.configs.recommended,
    {
        files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
        plugins: {
            "react": reactPlugin,
            "react-hooks": reactHooks
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            "@typescript-eslint/no-unused-vars": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "react/jsx-curly-brace-presence": [
                "error",
                {
                    props: "always",
                    children: "never"
                }
            ],
            "react/jsx-curly-spacing": [
                "error",
                {
                    when: "always",
                    children: true
                }
            ],
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off"
        },
        settings: {
            react: {
                version: "detect"
            }
        }
    }
];