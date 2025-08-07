import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getConfessionsHistory } from '../../api';
import moment from 'moment';  // 引入 moment 来格式化时间
import './ConfessionsHistory.css'; // 引入样式文件
import { useIntl } from 'react-intl'; // 引入 React Intl

const { Title } = Typography;

const ConfessionsHistory = () => {
  const [address, setAddress] = useState('');
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);  // 控制加载状态
  const [response, setResponse] = useState(null);

  const intl = useIntl();  // 获取intl对象

  const handleSubmit = async (values) => {
    const { address } = values;
    setLoading(true); // 开始加载
    try {
      const result = await getConfessionsHistory(address);
      setConfessions(result);
      setResponse(null);
    } catch (error) {
      setResponse(error);
    }
    finally {
      setLoading(false); // 加载完成
    }
  };

  useEffect(() => {
    // 设置浏览器标签页的标题
    document.title = intl.formatMessage({ id: '查询表白历史标题' });  // 使用 React Intl 获取标题
  }, [intl]);

  return (
    <div className="confessions-history-container">
      <Title level={2}>{intl.formatMessage({ id: '查询表白历史' })}</Title>

      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      
      <Form onFinish={handleSubmit} className="confessions-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入地址!' }) }]}
        >
          <Input
            placeholder={intl.formatMessage({ id: '输入地址查询表白历史' })}
            className="input-field"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="submit-button"
            loading={loading} // 按钮的加载状态
          >
            {intl.formatMessage({ id: '查询表白历史' })}
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{intl.formatMessage({ id: '查询响应' })}</Title>
          <Card
            title={intl.formatMessage({ id: "查询失败" })}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{intl.formatMessage({ id: '错误信息:' })}</strong> {response.message}
              </div>
            </Space>
          </Card>
        </div>
      )}

      {/* 展示表白历史 */}
      {confessions.length > 0 && !loading && (
        <div className="confessions-history-list">
          <Title level={3}>{intl.formatMessage({ id: '表白历史' })}</Title>
          {confessions.map((confession, index) => (
            <Card
              key={index}
              title={intl.formatMessage({ id: '表白 ID: 默认隐藏' })}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <strong>{intl.formatMessage({ id: '表白标题:' })}</strong> {confession.title}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '表白信息:' })}</strong> {confession.message}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '发送方:' })}</strong> {confession.sender}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '接收方:' })}</strong> {confession.receiver}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '表白状态:' })}</strong> {confession.status === 0 ? intl.formatMessage({ id: '未接受' }) : intl.formatMessage({ id: '已接受' })}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '时间:' })}</strong> {moment.unix(confession.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </Space>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionsHistory;
