// src/components/Footer.js

import React from 'react';
import { Layout } from 'antd';  // 使用 Ant Design 的 Layout 组件
import './Footer.css';  // 引入CSS样式

const { Footer } = Layout;

const AppFooter = () => {
  return (
    <Footer className="footer">
      <p>© 2025 LoveChain. All Rights Reserved.</p>
    </Footer>
  );
};

export default AppFooter;
