import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";

//TODO: (07/07/2026) Setup eslint
export default [
  {
    ignores: [".next/**", "node_modules/**", "**/*.ts", "**/*.tsx"],
  },
  js.configs.recommended,
  ...storybook.configs["flat/recommended"],
];
