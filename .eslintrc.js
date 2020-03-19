module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: "eslint:recommended",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
    __dirname: "readonly",
    process: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {}
};
