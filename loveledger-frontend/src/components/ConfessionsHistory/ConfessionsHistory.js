import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getConfessionsHistory } from '../../api';
import moment from 'moment';  // 引入 moment 来格式化时间
import './ConfessionsHistory.css'; // 引入样式文件
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const ConfessionsHistory = () => {
  const [address, setAddress] = useState('');
  const [confessions, setConfessions] = useState([]);
  const [loading, setLoading] = useState(false);  // 控制加载状态
  const [response, setResponse] = useState(null);

  const { t } = useTranslation();

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

  return (
    <div className="confessions-history-container">
      <Title level={2}>{t('查询表白历史')}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />{t('')}</div>
      )}
      <Form onFinish={handleSubmit} className="confessions-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: t('请输入地址!') }]}
        >
          <Input
            placeholder={t("输入地址查询表白历史")}
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
          >{t('查询表白历史')}</Button>
        </Form.Item>{t('')}</Form>

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
              </div>{t('')}</Space>
          </Card>{t('')}</div>
      )}

      {/* 展示表白历史 */}
      {confessions.length > 0 && !loading && (
        <div className="confessions-history-list">
          <Title level={3}>{t('表白历史')}</Title>
          {confessions.map((confession, index) => (
            <Card
              key={index}
              title={t(`表白 ID: 默认隐藏`)}
              bordered={false}
              style={{ marginBottom: 16 }}
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <strong>{t('表白标题:')}</strong> {confession.title}
                </div>
                <div>
                  <strong>{t('表白信息:')}</strong> {confession.message}
                </div>
                <div>
                  <strong>{t('发送方:')}</strong> {confession.sender}
                </div>
                <div>
                  <strong>{t('接收方:')}</strong> {confession.receiver}
                </div>
                <div>
                  <strong>{t('表白状态:')}</strong> {confession.status === 0 ? t('未接受') : t('已接受')}
                </div>
                <div>
                  <strong>{t('时间:')}</strong> {moment.unix(confession.timestamp).format('YYYY-MM-DD HH:mm:ss')}
                </div>{t('')}
              </Space>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConfessionsHistory;
