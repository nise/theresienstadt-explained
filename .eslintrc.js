module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "@babel/eslint-parser",
    ecmaVersion: 2020,
    sourceType: "module",
    requireConfigFile: false,
  },
  rules: {
    "no-console": "off",
    "no-unused-vars": "off",
    "max-len": "off",
    "no-trailing-spaces": "off",
    "no-tabs": "off",
    "no-return-assign": "off",
    camelcase: "off",
    "promise/always-return": "off",
    "promise/catch-or-return": "off",
  },
};
