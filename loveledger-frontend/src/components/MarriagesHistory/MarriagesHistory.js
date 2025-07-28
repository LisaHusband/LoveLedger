import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getMarriagesHistory } from '../../api'; // 假设你已经有这个 API
import moment from 'moment';  // 引入 moment 来格式化时间
import './MarriagesHistory.css'; // 引入样式文件
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const MarriagesHistory = () => {
  const [address, setAddress] = useState('');
  const [marriages, setMarriages] = useState([]);
  const [loading, setLoading] = useState(false);  // 控制加载状态
  const [response, setResponse] = useState(null);

  const { t } = useTranslation();

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
      <Title level={2}>{t('查询求婚历史')}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form onFinish={handleSubmit} className="marriages-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: t('请输入地址!') }]}
        >
          <Input
            placeholder={t("输入地址查询求婚历史")}
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
          >{t('查询求婚历史')}
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{t('查询响应')}</Title>
          <Card
            title={t("查询失败")}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{t('错误信息:')}</strong> {response.message}
              </div>
            </Space>
          </Card>
        </div>
      )}

      {/* 展示求婚历史 */}
      {marriages.length > 0 && !loading && (
        <div className="marriages-history-list">
          <Title level={3}>{t('求婚历史')}</Title>
          {marriages.map((marriage, index) => (
            <Card
              key={index}
              title={t(`求婚 ID: 默认隐藏`)}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <strong>{t('配偶A:')}</strong> {marriage.partnerA}
                </div>
                <div>
                  <strong>{t('配偶B:')}</strong> {marriage.partnerB}
                </div>
                <div>
                  <strong>{t('求婚状态:')}</strong> {marriage.status === 0 ? t('未接受') : t('已接受')}
                </div>
                <div>
                  <strong>{t('时间:')}</strong> {moment.unix(marriage.timestamp).format('YYYY-MM-DD HH:mm:ss')}
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
