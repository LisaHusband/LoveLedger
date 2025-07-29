import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Select, Switch, Typography } from 'antd'; // 引入 Ant Design 组件
import logo from '../../assets/logo.gif';
import './TopBar.css'; // 引入CSS样式
import { getIntl } from '../../i18n';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = Select;

const TopBar = ({ darkMode, toggleDarkMode, handleLanguageChange }) => {
  const language = getIntl().locale;

  return (
    <Header className={`topbar ${darkMode ? 'dark' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
        <Title level={3} className="title">{getIntl().messages['LoveLedger']}</Title>
      </div>
      <Menu theme={darkMode ? 'dark' : 'light'} mode="horizontal" className="navigation">
        <Menu.Item key="home"><Link to="/">{getIntl().messages['主页']}</Link></Menu.Item>
        <Menu.Item key="confess"><Link to="/confess">{getIntl().messages['表白']}</Link></Menu.Item>
        <Menu.Item key="respond_confession"><Link to="/respond_confession">{getIntl().messages['回应表白']}</Link></Menu.Item>
        <Menu.Item key="proposal_marriage"><Link to="/proposal_marriage">{getIntl().messages['求婚']}</Link></Menu.Item>
        <Menu.Item key="respond_marriage"><Link to="/respond_marriage">{getIntl().messages['回应求婚']}</Link></Menu.Item>
        <Menu.Item key="love_credit"><Link to="/love_credit">{getIntl().messages['爱情信用']}</Link></Menu.Item>
        <Menu.Item key="confessions_history"><Link to="/confessions_history">{getIntl().messages['表白历史']}</Link></Menu.Item>
        <Menu.Item key="marriages_history"><Link to="/marriages_history">{getIntl().messages['求婚历史']}</Link></Menu.Item>
        <Menu.Item key="about"><Link to="/about">{getIntl().messages['关于我们']}</Link></Menu.Item>
      </Menu>
      <div className="controls">
        <div className="language-selector">
          <Select
            value={language}
            onChange={handleLanguageChange}
            className="language-dropdown"
            style={{ width: 120 }}
          >
            <Option value="en">{getIntl().messages['English']}</Option>
            <Option value="zh">{getIntl().messages['中文']}</Option>
          </Select>
        </div>
        <div className="dark-mode-toggle">
          <span>{darkMode ? getIntl().messages['亮色模式'] : getIntl().messages['暗色模式']}</span>
          <Switch checked={darkMode} onChange={toggleDarkMode} />
        </div>
      </div>
    </Header>
  );
};

export default TopBar;