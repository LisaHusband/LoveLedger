import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TopBar.css'; // 引入CSS样式
import logo from '../../assets/logo.gif';

const TopBar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [themeColor, setThemeColor] = useState('#f8f8f8ff'); // 默认主题色
  const [language, setLanguage] = useState('en'); // 默认语言为英文

  // 切换暗亮模式
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);  // 切换全局的暗黑模式样式
  };

  // 切换主题颜色
  const handleThemeColorChange = (color) => {
    setThemeColor(color);
    document.documentElement.style.setProperty('--theme-color', color); // 更新根元素的主题颜色
  };

  // 切换语言
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    // 可以在此处加载不同的语言文件，例如通过国际化库（如react-i18next）处理语言切换
  };

  return (
    <header className={`topbar ${darkMode ? 'dark' : ''}`} style={{ backgroundColor: themeColor }}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" /> {/* 替换成你自己的Logo */}
        <h1 className="title">LoveLedger</h1>
      </div>
      <nav className="navigation">
        <ul>
          <li><Link to="/">主页</Link></li>
          <li><Link to="/confess">表白</Link></li>
          <li><Link to="/respond_confession">回应表白</Link></li>
          <li><Link to="/proposal_marriage">求婚</Link></li>
          <li><Link to="/respond_marriage">回应求婚</Link></li>
          <li><Link to="/love_credit/0xAddress">爱情信用</Link></li>
          <li><Link to="/confessions_history">表白历史</Link></li>
          <li><Link to="/marriage_history">求婚历史</Link></li>
          <li><Link to="/about">关于我们</Link></li>
        </ul>
      </nav>
      <div className="controls">
        {/* <button onClick={toggleDarkMode} className="btn-darkmode">
          {darkMode ? '亮色模式' : '暗色模式'}
        </button> */}
        {/* <div className="theme-color">
          <button onClick={() => handleThemeColorChange('#ff6b6b')} style={{ backgroundColor: '#ff6b6b' }}></button>
          <button onClick={() => handleThemeColorChange('#ffd700')} style={{ backgroundColor: '#ffd700' }}></button>
          <button onClick={() => handleThemeColorChange('#1e90ff')} style={{ backgroundColor: '#1e90ff' }}></button>
        </div> */}
        <select value={language} onChange={(e) => handleLanguageChange(e.target.value)} className="language-selector">
          <option value="en">English</option>
          <option value="zh">中文</option>
        </select>
      </div>
    </header>
  );
};

export default TopBar;
