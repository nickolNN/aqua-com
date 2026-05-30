module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "react-hooks", "jsx-a11y", "import"],
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
  ignorePatterns: ["node_modules/", "dist/", "public/", "tailwind.config.ts", "vite.config.ts"],
};