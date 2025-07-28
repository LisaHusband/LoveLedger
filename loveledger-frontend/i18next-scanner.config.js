module.exports = {
  input: [
    'src/**/*.{js,jsx,ts,tsx}',  // 扫描所有的 JavaScript 或 TypeScript 文件
  ],
  output: '.',  // 输出语言文件到指定目录
  options: {
    debug: false,
    lngs: ['en', 'zh'],  // 需要的语言
    defaultLng: 'zh',  // 默认语言
    resource: {
      loadPath: './src/locales/{{lng}}.json',
      savePath: './src/locales/{{lng}}.json',
    },
    keySeparator: false,  // 如果没有键分隔符，设置为 false
    nsSeparator: false,  // 如果没有命名空间分隔符，设置为 false
  },
};
