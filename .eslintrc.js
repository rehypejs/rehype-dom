module.exports = {
  extends: [
    'airbnb-base'
  ],
  parser: 'babel-eslint',
  env: {
    es6: true
  },
  overrides: [{
    files: ['*.test.*'],
    env: {
      jest: true
    },
    rules: {
      'import/no-extraneous-dependencies': 'off',
    },
  }, {
    files: ['**/src/*'],
    env: {
      browser: true
    },
  }],
  rules: {
    'no-use-before-define': 'off',
  },
};
