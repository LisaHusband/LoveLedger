// src/i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 引入语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';

// 初始化 i18next
i18n
  .use(initReactI18next) // 绑定 react-i18next
  .init({
    resources: {
      en: en,  // 英文翻译
      zh: zh,  // 中文翻译
    },
    lng: 'zh', // 默认语言
    fallbackLng: 'en', // 后备语言
    interpolation: {
      escapeValue: false, // React 已经自动进行转义
    },
  });

export default i18n;
