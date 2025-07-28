// src/components/Footer.js

import React from 'react';
import { Layout } from 'antd';  // 使用 Ant Design 的 Layout 组件
import './Footer.css';  // 引入CSS样式
import { useTranslation } from 'react-i18next';

const { Footer } = Layout;

const AppFooter = ({ darkMode }) => {
  const { t } = useTranslation();
  return (
    <Footer className={`footer ${darkMode ? 'dark' : ''}`} >
      <p>{t('© 2025 LoveChain. All Rights Reserved.')}</p>
    </Footer>
  );
};

export default AppFooter;
