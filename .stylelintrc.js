module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
  ],
  plugins: [
    'stylelint-order',
  ],
  overrides: [
    {
      files: ['src/**/*.vue'],
      customSyntax: 'postcss-html',
    },
  ],
  rules: {
    'at-rule-no-unknown': [
      true,
      { ignoreAtRules: ['use', 'extends', 'ignores', 'include', 'mixin', 'if', 'else', 'media', 'for'] },
    ],
    'order/order': ['custom-properties', 'declarations'],
    'order/properties-order': ['width', 'height'],
  },
};
