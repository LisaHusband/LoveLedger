import { createIntl, createIntlCache} from 'react-intl';

// 设置语言文件
import en from './locales/en.json';
import zh from './locales/zh.json';

const cache = createIntlCache();

const messages = {
  en: en,
  zh: zh,
};

const defaultLanguage = 'en';

let intl = createIntl(
  {
    locale: defaultLanguage,
    messages: messages[defaultLanguage],
  },
  cache
);

export const setIntl = (language) => {
  intl = createIntl(
    {
      locale: language,
      messages: messages[language],
    },
    cache
  );
};

export const getIntl = () => intl;
