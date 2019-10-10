module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
    "prefer-const": 0,
    "no-lonely-if": 0,
    "no-console": "off",
    "no-spaced-func": 1,
    "no-trailing-spaces": 0,
    "no-irregular-whitespace": "off"
  }
}
