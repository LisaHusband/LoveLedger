import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Space, Radio, Spin } from 'antd'; // 引入 Ant Design 组件
import { respondConfession } from '../../api';
import './RespondConfessionForm.css'; // 引入样式文件
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const RespondConfessionForm = () => {
  const [from, setFrom] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [confessionId, setConfessionId] = useState('');
  const [accept, setAccept] = useState(false);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // 控制加载状态

  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const { from, privateKey, confessionId, accept } = values;
    setLoading(true); // 开始加载
    try {
      const result = await respondConfession(from, privateKey, confessionId, accept);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    } finally {
      setLoading(false); // 加载完成
    }
  };

  return (
    <div className="respond-form-container">
      <Title level={2}>{t('回应表白')}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
      <Form onFinish={handleSubmit} className="respond-form">
        <Form.Item
          name="from"
          rules={[{ required: true, message: t('请输入回应者地址!') }]}
        >
          <Input
            placeholder={t("回应者地址")}
            className="input-field"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="privateKey"
          rules={[{ required: true, message: t('请输入私钥!') }]}
        >
          <Input.Password
            placeholder={t("私钥")}
            className="input-field"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="confessionId"
          rules={[{ required: true, message: t('请输入表白ID!') }]}
        >
          <Input
            placeholder={t("表白ID")}
            type="number"
            className="input-field"
            value={confessionId}
            onChange={(e) => setConfessionId(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="accept"
          rules={[{ required: true, message: t('请选择是否接受!') }]}
        >
          <Space>
            <Radio.Group onChange={(e) => setAccept(e.target.value)} value={accept}>
              <Radio value={true}>{t('接受')}</Radio>
              <Radio value={false}>{t('拒绝')}</Radio>
            </Radio.Group>
          </Space>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="submit-button"
            loading={loading}
          >{t('提交回应')}
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{t('回应成功')}</Title>
          <Card
            title={t("表白回应结果")}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{t('表白ID:')}</strong> {response.confession_id}
              </div>
              <div>
                <strong>{t('交易哈希:')}</strong> {response.tx_hash}
              </div>
              <div>
                <strong>{t('回应状态:')}</strong> {response.accept ? t('接受') : t('拒绝')}
              </div>
              <div>
                <strong>{t('操作状态:')}</strong> {response.status === 'success' ? t('成功') : t('失败')}
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RespondConfessionForm;
