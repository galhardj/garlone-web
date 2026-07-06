import js from "@eslint/js";
import storybook from "eslint-plugin-storybook";

export default [
  {
    ignores: [".next/**", "node_modules/**", "**/*.ts", "**/*.tsx"],
  },
  js.configs.recommended,
  ...storybook.configs["flat/recommended"],
];
