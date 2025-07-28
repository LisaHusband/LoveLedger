module.exports = {
  presets: [
    // 你的其他 preset，比如：
    '@babel/preset-env',
    '@babel/preset-react',
  ],
  plugins: [
    './babel-plugins/wrapStringsInT.js',
    // 'i18next-extract', // 使用 i18next-extract 插件
  ],
};
