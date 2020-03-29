module.exports = {
  "env": {
    "node": true,
    "commonjs": true,
    "es6": true,
    "mocha": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "camelcase": [
      "error",
      {"properties": "always"}
    ],
    "indent": [
      "error",
      2
    ],
    "no-console": [
      "error"
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ],
    "semi-style": ["error", "last"],
    "dot-notation": [
      "error"
    ],
    "eqeqeq": [
      "error",
      "always"
    ],
    "no-else-return": [
      "error"
    ],
    "no-useless-return": [
      "error"
    ],
    "no-unused-expressions": [
      "error"
    ],
    "no-undefined": [
      "error"
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    "no-trailing-spaces": [2, { "skipBlankLines": false }],
    "no-multiple-empty-lines": [
      "error"
    ],
    "spaced-comment": [
      "error",
      "always"
    ],
    "keyword-spacing": [
      "error",
      {"overrides": {
        "if": {"after": false},
        "for": {"after": false},
        "while": {"after": false}}}
    ],
    "eol-last": [
      "error",
      "always"
    ],
    "object-curly-spacing": ["error", "always"],
    "comma-spacing": ["error", { "before": false, "after": true }],
    "comma-dangle": ["error", "never"],
    "array-bracket-spacing": ["error", "never"]
  }
};
