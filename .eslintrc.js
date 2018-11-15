module.exports = {
  extends: 'airbnb-base',
  env: {
    browser: true
  },
  rules: {
    'no-console': ['error', { allow: ['info', 'warn', 'error'] }],
    curly: ['error', 'multi-line'],
    "linebreak-style": 0,
  },
  plugins: ['import'],
};
