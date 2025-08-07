import React, { useState, useEffect } from 'react';
import { useIntl } from 'react-intl'; // 引入 React Intl
import { Card, Typography, Spin } from 'antd';  // 引入 Ant Design 组件
import { verifyIdentity } from './api'; // 引入 API
import './Home.css';  // 引入样式文件

const { Title, Text } = Typography;

const Home = () => {
  const [operatorAddress, setOperatorAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const intl = useIntl(); // 获取 intl 实例

  // 获取当前运营者地址
  useEffect(() => {
    const fetchOperatorAddress = async () => {
      try {
        const result = await verifyIdentity();
        setOperatorAddress(result.address); // 从后端获取当前运营者地址
      } catch (error) {
        console.error('Failed to fetch operator address:', error);
      } finally {
        setLoading(false); // 结束加载
      }
    };
    fetchOperatorAddress();
  
    // 设置浏览器标签页的标题
  document.title = intl.formatMessage({ id: '首页标题' });  // 使用 React Intl 获取标题
  }, [intl]);

  return (
    <div className="home-container">
      {/* 中央内容区域 */}
      <main className="content">
        <Title level={2}>{intl.formatMessage({ id: '欢迎来到 LoveLedger' })}</Title>
        
        {/* 详细介绍文本 */}
        <div className="content-text">
          <p className="detail">{intl.formatMessage({ id: 'LoveLedger 是一个基于区块链的爱情信任平台，允许用户发起表白、回应表白、进行求婚和回应求婚。' })}</p>
          <p className="promise">{intl.formatMessage({ id: 'LoveLedger 通过区块链技术确保每一份爱的承诺都有可信的记录。' })}</p>
        </div>

        {/* 显示官方地址和运营者地址 */}
        <div className="address-info">
          <Card title={intl.formatMessage({ id: '官方地址' })} bordered={false} className="address-card">
            <Text>{'0xF93AAc54614A568A24Afbb9BD043d15358D2476A'}</Text>
          </Card>
          
          <Card title={intl.formatMessage({ id: '当前运营者地址' })} bordered={false} className="address-card">
            {loading ? <Spin size="small" /> : <Text>{operatorAddress || intl.formatMessage({ id: 'noAddress' })}</Text>}
          </Card>

          {/* 显示Beta测试说明，如发现有功能问题，请在更多，关于页面通过邮箱进行反馈 */}
          <Card title={intl.formatMessage({ id: 'Beta测试说明' })} bordered={false} className="address-card">
            <Text>{intl.formatMessage({ id: 'Beta测试说明描述' })}</Text>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Home;
