import eslintPluginAstro from "eslint-plugin-astro";
import oxlint from "eslint-plugin-oxlint";

const ASTRO_FILES = ["*.astro", "**/*.astro"];

export default [
  ...eslintPluginAstro.configs.recommended,
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
  {
    files: ASTRO_FILES,
    rules: {
      "no-console": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
    },
  },
  {
    ignores: [
      "dist/**",
      ".worktrees/**",
      "tmp/**",
      ".astro",
      "**/worker-configuration.d.ts",
      "**/*.ts",
      "**/*.tsx",
      "**/*.mts",
      "**/*.cts",
      "**/*.js",
      "**/*.mjs",
      "**/*.cjs",
    ],
  },
];
