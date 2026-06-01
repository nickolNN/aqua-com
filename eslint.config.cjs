/** @type {import("eslint").Linter.Config} */
module.exports = [
  {
    files: ["**/*.ts", "**/*.tsx"],
    linterOptions: {
      maxTopContainerDepth: Infinity,
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
  },

  // Base environment settings
  {
    name: "base-environment",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    env: {
      browser: true,
      node: true,
      es2021: true,
    },
  },

  // Parser and base configs
  {
    name: "typescript-eslint-base",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("@typescript-eslint/eslint-plugin").configs.recommended,
  },

  {
    name: "typescript-eslint-type-checked",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("@typescript-eslint/eslint-plugin").configs["flat/recommended-type-checked"],
  },

  // React config
  {
    name: "react",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("eslint-plugin-react").config.flat.recommended,
  },

  // React hooks config
  {
    name: "react-hooks",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("eslint-plugin-react-hooks").configs.recommended,
  },

  // JSX Accessibility config
  {
    name: "jsx-a11y",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("eslint-plugin-jsx-a11y").configs.recommended,
  },

  // Import config
  {
    name: "import",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("eslint-plugin-import").configs.recommended,
  },

  // Prettier config (turns off conflicting rules)
  {
    name: "prettier",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
    ...require("eslint-config-prettier"),
  },

  // Project-level overrides and settings
  {
    name: "project-settings",
    files: ["**/*.ts", "**/*.tsx"],
    language: "TSX",
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
    language: "TSX",
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
