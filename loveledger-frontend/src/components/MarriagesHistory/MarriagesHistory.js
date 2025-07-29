import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getMarriagesHistory } from '../../api'; // 假设你已经有这个 API
import moment from 'moment';  // 引入 moment 来格式化时间
import './MarriagesHistory.css'; // 引入样式文件
import { useIntl } from 'react-intl'; // 使用 React Intl

const { Title } = Typography;

const MarriagesHistory = () => {
  const [address, setAddress] = useState('');
  const [marriages, setMarriages] = useState([]);
  const [loading, setLoading] = useState(false);  // 控制加载状态
  const [response, setResponse] = useState(null);

  const intl = useIntl(); // 使用 React Intl 的 useIntl

  const handleSubmit = async (values) => {
    const { address } = values;
    setLoading(true); // 开始加载
    try {
      const result = await getMarriagesHistory(address);
      setMarriages(result);
      setResponse(null);
    } catch (error) {
      setResponse(error);
    }
    finally {
      setLoading(false); // 加载完成
    }
  };

  return (
    <div className="marriages-history-container">
      <Title level={2}>{intl.formatMessage({ id: '查询求婚历史' })}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form onFinish={handleSubmit} className="marriages-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入地址!' }) }]}
        >
          <Input
            placeholder={intl.formatMessage({ id: "输入地址查询求婚历史" })}
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
            {intl.formatMessage({ id: '查询求婚历史' })}
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

      {/* 展示求婚历史 */}
      {marriages.length > 0 && !loading && (
        <div className="marriages-history-list">
          <Title level={3}>{intl.formatMessage({ id: '求婚历史' })}</Title>
          {marriages.map((marriage, index) => (
            <Card
              key={index}
              title={intl.formatMessage({ id: `求婚 ID: 默认隐藏` })}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <strong>{intl.formatMessage({ id: '配偶A:' })}</strong> {marriage.partnerA}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '配偶B:' })}</strong> {marriage.partnerB}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '求婚状态:' })}</strong> {marriage.status === 0 ? intl.formatMessage({ id: '未接受' }) : intl.formatMessage({ id: '已接受' })}
                </div>
                <div>
                  <strong>{intl.formatMessage({ id: '时间:' })}</strong> {moment.unix(marriage.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </div>
              </Space>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarriagesHistory;
