module.exports = {
    env: {
      commonjs: true,
      node: true,
      browser: true,
      es6: true,
      jest: true
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {},
    parserOptions: {
      ecmaFeatures: {
        jsx: true
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: ['react', 'react-native'],
    ignorePatterns: ['node_modules/'],
    rules: {
      'react/prop-types': 0,
      camelcase: 0
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  }