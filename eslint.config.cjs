/** @type {import("eslint").Linter.Config} */
// ESLint 10 flat config:
// - `env` and `parserOptions` are eslintrc-only keys and error in flat config.
// - Shareable configs shipped eslintrc-style (string-array `plugins`,
//   `parserOptions`) cannot be spread into a flat config; they must be
//   restructured around the plugin objects themselves.
const tsConfigs = require("@typescript-eslint/eslint-plugin").configs;
const reactConfig = require("eslint-plugin-react").configs;
const reactHooksConfig = require("eslint-plugin-react-hooks").configs;
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y");
const importPlugin = require("eslint-plugin-import");
const prettierConfig = require("eslint-config-prettier");

// eslint-plugin-jsx-a11y / eslint-plugin-import ship eslintrc-style configs
// (`plugins` as a string array plus `parserOptions`), which is incompatible
// with flat config. Keep their rules but point `plugins` at the plugin objects.
const {
  parserOptions: _a11yParserOptions,
  rules: jsxA11yRules,
} = jsxA11yPlugin.configs.recommended;
const {
  parserOptions: _importParserOptions,
  rules: importRules,
} = importPlugin.configs.recommended;

module.exports = [
  // typescript-eslint: base + eslint-recommended + recommended rules.
  // Deliberately the non type-checked preset: the type-checked one requires
  // `languageOptions.parserOptions.project`, which this project does not set up.
  ...tsConfigs["flat/recommended"],

  {
    name: "react",
    ...reactConfig.flat.recommended,
  },

  {
    name: "react-hooks",
    ...reactHooksConfig.flat.recommended,
  },

  {
    name: "jsx-a11y",
    plugins: { "jsx-a11y": jsxA11yPlugin },
    rules: jsxA11yRules,
  },

  {
    name: "import",
    plugins: { import: importPlugin },
    rules: importRules,
  },

  {
    name: "prettier",
    ...prettierConfig,
  },

  {
    name: "project-settings",
    files: ["**/*.ts", "**/*.tsx"],
    settings: {
      react: {
        version: "19",
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx", ".mjs"],
        },
      },
    },
  },

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
      // react-hooks v7 additions, disabled project-wide for now:
      // `set-state-in-effect` flags the app's legitimate "hydrate initial
      // state in an effect" pattern, and `refs` flags pre-existing ref
      // usage. Re-enable them (globally or per-file) once that code is
      // migrated, rather than as part of this cleanup.
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/refs": "off",
      "import/no-unresolved": ["error", { ignore: ["^@", "^/src/"] }],
      "import/named": "off",
      "import/namespace": "off",
      "import/default": "off",
    },
  },

  {
    name: "ignore-patterns",
    ignores: [
      "node_modules/",
      "dist/",
      "public/",
      "tailwind.config.ts",
      "vite.config.ts",
      "eslint.config.cjs",
      // Standalone operational scripts (screenshot capture / consistency
      // verification) — not part of the app source.
      "scripts/",
    ],
  },
];
