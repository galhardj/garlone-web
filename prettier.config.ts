export default {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react|next)(.*)$", // react/next first
    "<THIRD_PARTY_MODULES>", // external packages
    "^@/(.*)$", // internal aliases
    "^[./]", // relative paths
  ],
  importOrderSeparation: true, // blank lines between groups
  importOrderSortSpecifiers: true, // sorts named imports alphabetically
};
