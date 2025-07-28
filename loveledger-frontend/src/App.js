import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ConfessForm from './components/ConfessForm/ConfessForm';
import RespondConfessionForm from './components/RespondConfessionForm/RespondConfessionForm';
import MarriageForm from './components/MarriageForm/MarriageForm';
import RespondMarriageForm from './components/RespondMarriageForm/RespondMarriageForm';
import LoveCredit from './components/LoveCredit/LoveCredit';
import ConfessionsHistory from './components/ConfessionsHistory/ConfessionsHistory';
import MarriagesHistory from './components/MarriagesHistory/MarriagesHistory';
import AboutForm from './components/AboutForm/AboutForm';
import IdentityVerification from './components/IdentityVerification';
import Home from './home';
import TopBar from './components/TopBar/TopBar';
import AppFooter from './components/Footer/Footer';

const App = () => {
  const [darkMode, setDarkMode] = useState(false); // 暗亮模式状态

  // 检测浏览器的亮暗模式预设
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDarkMode(prefersDarkScheme);  // 根据浏览器偏好设置初始化状态
    document.body.classList.toggle('dark-mode', prefersDarkScheme);  // 初始化全局暗黑模式
  }, []);

  // 切换暗亮模式
  const toggleDarkMode = (checked) => {
    setDarkMode(checked);
    document.body.classList.toggle('dark-mode', checked); // 切换全局暗黑模式样式
  };

  // 主题配置
  const themeConfig = {
    token: {
      colorPrimary: darkMode ? '#000000' : '#ffffffff', // 根据模式修改主题色
      colorBgBase: darkMode ? '#1d1d1d' : '#ffffff', // 背景颜色
      colorTextBase: darkMode ? '#ffffff' : '#000000', // 字体颜色
    },
  };

  return (
    <Router>
      <ConfigProvider theme={themeConfig}>
        <div>
          <TopBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> {/* 将模式和切换函数传递给 TopBar */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/confess" element={<ConfessForm />} />
            <Route path="/respond_confession" element={<RespondConfessionForm />} />
            <Route path="/proposal_marriage" element={<MarriageForm />} />
            <Route path="/respond_marriage" element={<RespondMarriageForm />} />
            <Route path="/love_credit" element={<LoveCredit />} />
            <Route path="/confessions_history" element={<ConfessionsHistory />} />
            <Route path="/marriages_history" element={<MarriagesHistory />} />
            <Route path="/about" element={<AboutForm />} />
            <Route path="/verify_identity" element={<IdentityVerification />} />
          </Routes>
          <AppFooter darkMode={darkMode} />
        </div>
      </ConfigProvider>
    </Router>
  );
};

export default App;
