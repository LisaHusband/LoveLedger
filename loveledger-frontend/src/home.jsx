import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Typography } from 'antd';
import { verifyIdentity } from './api';
import './Home.css';

const { Title, Text } = Typography;

const Home = () => {
  const [operatorAddress, setOperatorAddress] = useState('');

  // 获取当前运营者地址
  useEffect(() => {
    const fetchOperatorAddress = async () => {
      try {
        const result = await verifyIdentity();
        setOperatorAddress(result.address); // 从后端获取当前运营者地址
      } catch (error) {
        console.error('Failed to fetch operator address:', error);
      }
    };
    fetchOperatorAddress();
  }, []);

  return (
    <div className="home-container">
      {/* 中央内容区域 */}
      <main className="content">
        <h2>欢迎来到 LoveLedger</h2>
        <div className="content_text">
          <div className="text-container">
            <p className="detail">LoveLedger 是一个基于区块链的爱情信任平台，允许用户发起表白、回应表白、进行求婚和回应求婚。</p>
            <p className="promise">通过区块链技术确保每一份爱的承诺都有可信的记录。</p>
          </div>
        </div>

        {/* 显示官方地址和运营者地址 */}
        <div className="address-info">
          <Card title="官方地址" bordered={false} style={{ marginBottom: 20 }}>
            <Text>0xF93AAc54614A568A24Afbb9BD043d15358D2476A</Text>
          </Card>
          <Card title="当前运营者地址" bordered={false}>
            <Text>{operatorAddress || '加载中...'}</Text>
          </Card>
        </div>

        {/* Ant Design 按钮 */}
        <div className="buttons">
          {/* <Link to="/confess">
            <Button type="primary" size="large" style={{ marginRight: 10 }}>
              发起表白
            </Button>
          </Link>
          <Link to="/proposal_marriage">
            <Button type="default" size="large">
              求婚
            </Button>
          </Link> */}
        </div>
      </main>

      {/* 页脚
      <footer className="footer">
        <p>© 2025 LoveChain. All Rights Reserved.</p>
      </footer> */}
    </div>
  );
};

export default Home;
