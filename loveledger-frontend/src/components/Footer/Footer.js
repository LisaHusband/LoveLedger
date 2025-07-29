import React from 'react';
import { Layout } from 'antd';  // 使用 Ant Design 的 Layout 组件
import './Footer.css';  // 引入CSS样式
import { getIntl } from '../../i18n';  // 引入 i18n 配置

const { Footer } = Layout;

const AppFooter = ({ darkMode }) => {
  return (
    <Footer className={`footer ${darkMode ? 'dark' : ''}`} >
      <p>{getIntl().messages['© 2025 LoveChain. All Rights Reserved.']}</p>
    </Footer>
  );
};

export default AppFooter;
