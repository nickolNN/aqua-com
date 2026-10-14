/** @type {import("eslint").Linter.Config} */
// ESLint 10 flat config:
// - `language: "TSX"` is not a registered language; the TS parser comes from
//   the @typescript-eslint flat configs via `languageOptions.parser`.
// - `env` and `parserOptions` are eslintrc-only keys and error in flat config.
// - `configs["flat/..."]` entries are arrays; `configs.recommended` is
//   eslintrc-style and cannot be spread into a flat config.
const tsConfigs = require("@typescript-eslint/eslint-plugin").configs;
const reactConfig = require("eslint-plugin-react").configs;
const reactHooksConfig = require("eslint-plugin-react-hooks").configs;
const jsxA11yConfig = require("eslint-plugin-jsx-a11y").configs;
const importConfig = require("eslint-plugin-import").configs;
const prettierConfig = require("eslint-config-prettier");

// eslint-plugin-jsx-a11y / eslint-plugin-import ship eslintrc-style configs
// with a `parserOptions` key, which is incompatible with flat config.
const { parserOptions: _a11yParserOptions, ...jsxA11y } = jsxA11yConfig.recommended;
const { parserOptions: _importParserOptions, ...importRules } = importConfig.recommended;

module.exports = [
  // typescript-eslint: base + eslint-recommended + type-checked rules
  ...tsConfigs["flat/recommended-type-checked"],

  // React config
  {
    name: "react",
    ...reactConfig.flat.recommended,
  },

  // React hooks config
  {
    name: "react-hooks",
    ...reactHooksConfig.recommended,
  },

  // JSX Accessibility config
  {
    name: "jsx-a11y",
    ...jsxA11y,
  },

  // Import config
  {
    name: "import",
    ...importRules,
  },

  // Prettier config (turns off conflicting rules)
  {
    name: "prettier",
    ...prettierConfig,
  },

  // Project-level settings
  {
    name: "project-settings",
    files: ["**/*.ts", "**/*.tsx"],
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
        },
      },
    },
  },

  // Rules overrides
  {
    name: "project-rules",
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-non-null-assertion": "off",
      "prefer-const": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "off",
      "react/no-children-prop": "off",
      "react/jsx-key": "error",
      "react/jsx-props-no-spreading": "off",
      "react/prop-types": "off",
      "react/require-default-props": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/no-unresolved": ["error", { ignore: ["^@"] }],
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
    },
  },

  // Ignore patterns
  {
    name: "ignore-patterns",
    ignores: [
      "node_modules/",
      "dist/",
      "public/",
      "tailwind.config.ts",
      "vite.config.ts",
    ],
  },
];
