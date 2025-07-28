import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Select, Switch, Typography } from 'antd'; // 引入 Ant Design 组件
import logo from '../../assets/logo.gif';
import './TopBar.css'; // 引入CSS样式
import { useTranslation } from 'react-i18next';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;

const TopBar = ({ darkMode, toggleDarkMode }) => {
  const [language, setLanguage] = useState('zh'); // 默认语言为中文
  const { t, i18n } = useTranslation(); // 获取翻译函数

  // 切换语言
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    i18n.changeLanguage(lang); // 更新 i18n 的语言设置
  };

  return (
    <Header className={`topbar ${darkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <Title level={3} className="title">{t('LoveLedger')}</Title>
      </div>
      <Menu theme={darkMode ? 'dark' : 'light'} mode="horizontal" className="navigation">
        <Menu.Item key="home"><Link to="/">{t('主页')}</Link></Menu.Item>
        <Menu.Item key="confess"><Link to="/confess">{t('表白')}</Link></Menu.Item>
        <Menu.Item key="respond_confession"><Link to="/respond_confession">{t('回应表白')}</Link></Menu.Item>
        <Menu.Item key="proposal_marriage"><Link to="/proposal_marriage">{t('求婚')}</Link></Menu.Item>
        <Menu.Item key="respond_marriage"><Link to="/respond_marriage">{t('回应求婚')}</Link></Menu.Item>
        <Menu.Item key="love_credit"><Link to="/love_credit">{t('爱情信用')}</Link></Menu.Item>
        <Menu.Item key="confessions_history"><Link to="/confessions_history">{t('表白历史')}</Link></Menu.Item>
        <Menu.Item key="marriages_history"><Link to="/marriages_history">{t('求婚历史')}</Link></Menu.Item>
        <Menu.Item key="about"><Link to="/about">{t('关于我们')}</Link></Menu.Item>
      </Menu>
      <div className="controls">
        <div className="language-selector">
          <Select
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
            style={{ width: 120 }}
          >
            <Option value="en">{t('English')}</Option>
            <Option value="zh">{t('中文')}</Option>
          </Select>
        </div>
        <div className="dark-mode-toggle">
          <span>{darkMode ? t('暗色模式') : t('亮色模式')}</span>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
      </div>
    </Header>
  );
};

export default TopBar;
