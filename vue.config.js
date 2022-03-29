const { defineConfig } = require('@vue/cli-service');
const StylelintWebpackPlugin = require('stylelint-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,

  configureWebpack: {
    plugins: [
      new StylelintWebpackPlugin({
        context: 'src',
        configFile: '.stylelintrc.js',
        files: '**/*.{s?(a|c)ss,vue}',
      }),
    ],
  },
});
