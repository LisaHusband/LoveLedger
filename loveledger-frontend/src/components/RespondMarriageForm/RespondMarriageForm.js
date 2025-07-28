import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Space, Radio, Spin } from 'antd'; // 引入 Ant Design 组件
import { respondMarriage } from '../../api'; // 引入 API
import './RespondMarriageForm.css'; // 引入样式文件
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const RespondMarriageForm = () => {
  const [from, setFrom] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [marriageId, setMarriageId] = useState('');
  const [accept, setAccept] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();

  const handleSubmit = async (values) => {
    const { from, privateKey, marriageId, accept } = values;
    setLoading(true);
    try {
      const result = await respondMarriage(from, privateKey, marriageId, accept);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="respond-marriage-form-container">
      <Title level={2}>{t('回应求婚')}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      {/* 表单部分 */}
      <Form onFinish={handleSubmit} className="respond-marriage-form">
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
          name="marriageId"
          rules={[{ required: true, message: t('请输入求婚ID!') }]}
        >
          <Input
            type="number"
            placeholder={t("求婚ID")}
            className="input-field"
            value={marriageId}
            onChange={(e) => setMarriageId(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="accept" rules={[{ required: true, message: t('请选择是否接受!') }]}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio.Group
              value={accept}
              onChange={(e) => setAccept(e.target.value)}
              className="radio-group"
            >
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
            loading={loading} // 按钮的加载状态
          >{t('提交回应')}
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{t('回应成功')}</Title>
          <Card
            title={t("求婚回应结果")}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{t('求婚ID:')}</strong> {response.marriage_id}
              </div>
              <div>
                <strong>{t('是否接受:')}</strong> {response.accept ? t('接受') : t('拒绝')}
              </div>
              <div>
                <strong>{t('交易哈希:')}</strong> <a href={`https://etherscan.io/tx/${response.tx_hash}`} target="_blank" rel="noopener noreferrer">{t('{response.tx_hash}')}</a>
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

export default RespondMarriageForm;

