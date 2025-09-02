// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config({ ignores: ["dist"] }, {
  extends: [js.configs.recommended, ...tseslint.configs.recommended],
  files: ["**/*.{ts,tsx}"],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
  },
  plugins: {
    "react-hooks": reactHooks,
    "react-refresh": reactRefresh,
  },
  rules: {
      "@typescript-eslint/no-explicit-any": "off",
    ...reactHooks.configs.recommended.rules,
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts", ".jsx", ".tsx"],
        moduleDirectory: ["node_modules", "src"], // Ajoutez le répertoire src pour les alias
        map: [
          ["@utils", "./src/utils/"],
          ["@assets", "./src/assets/"],
          ["@pages", "./src/pages/"],
          ["@public", "./public/"],
          ["@dev", "./src/dev/"],
          ["@icons", "./src/assets/icons/"],
          ["@", "./src"],
        ],
      },
    },
  },
}, storybook.configs["flat/recommended"]);