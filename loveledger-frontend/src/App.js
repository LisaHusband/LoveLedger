import React from 'react';
import { ConfigProvider } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // 更新为 Routes
import ConfessForm from './components/ConfessForm/ConfessForm';
import RespondConfessionForm from './components/RespondConfessionForm';
import MarriageForm from './components/MarriageForm';
import RespondMarriageForm from './components/RespondMarriageForm';
import LoveCredit from './components/LoveCredit';
import ConfessionsHistory from './components/ConfessionsHistory';
import MarriagesHistory from './components/MarriagesHistory';
import IdentityVerification from './components/IdentityVerification';
import Home from './home';
import TopBar from './components/TopBar/TopBar';
import AppFooter from './components/Footer/Footer'; 

const App = () => {
  return (
    <Router>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#000000ff',  // 修改默认主题颜色为灰色
        },
      }}
    >
      <div>
        {/* <h1>LoveChain</h1> */}
        <TopBar /> {/* 使用顶部导航栏组件 */}
        <Routes>  {/* 将 Switch 改为 Routes */}
          <Route path="/" element={<Home />} />  {/* 首页路由 */}
          <Route path="/confess" element={<ConfessForm />} /> {/* 用 element 渲染组件 */}
          <Route path="/respond_confession" element={<RespondConfessionForm />} />
          <Route path="/proposal_marriage" element={<MarriageForm />} />
          <Route path="/respond_marriage" element={<RespondMarriageForm />} />
          <Route path="/love_credit/:address" element={<LoveCredit />} />
          <Route path="/confessions_history/:address" element={<ConfessionsHistory />} />
          <Route path="/marriages_history/:address" element={<MarriagesHistory />} />
          <Route path="/verify_identity" element={<IdentityVerification />} />
        </Routes>  {/* 用 Routes 包裹所有路由 */}
        <AppFooter />
      </div>
      </ConfigProvider>
    </Router>
  );
};

export default App;
