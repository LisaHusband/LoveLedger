import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Typography, Card, Space, Radio, Spin } from 'antd'; // 引入 Ant Design 组件
import { respondMarriage } from '../../api'; // 引入 API
import './RespondMarriageForm.css'; // 引入样式文件
import { FormattedMessage, useIntl } from 'react-intl'; // 引入 React Intl 组件

const { Title } = Typography;

const RespondMarriageForm = () => {
  const [from, setFrom] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [marriageId, setMarriageId] = useState('');
  const [accept, setAccept] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const intl = useIntl();

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

  useEffect(() => {
    // 设置浏览器标签页的标题
    document.title = intl.formatMessage({ id: '回应求婚标题' }); // 使用 React Intl 获取标题
  }, [intl]);

  return (
    <div className="respond-marriage-form-container">
      <Title level={2}><FormattedMessage id="回应求婚" /></Title>
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
          rules={[{ required: true, message: <FormattedMessage id="请输入回应者地址!" /> }]}
        >
          <Input
            placeholder={intl.formatMessage({ id: '回应者地址' })}
            className="input-field"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="privateKey"
          rules={[{ required: true, message: <FormattedMessage id="请输入私钥!" /> }]}
        >
          <Input.Password
            placeholder={intl.formatMessage({ id: '私钥' })}
            className="input-field"
            value={privateKey}
            onChange={(e) => setPrivateKey(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="marriageId"
          rules={[{ required: true, message: <FormattedMessage id="请输入求婚ID!" /> }]}
        >
          <Input
            type="number"
            placeholder={intl.formatMessage({ id: '求婚ID' })}
            className="input-field"
            value={marriageId}
            onChange={(e) => setMarriageId(e.target.value)}
          />
        </Form.Item>

        <Form.Item name="accept" rules={[{ required: true, message: <FormattedMessage id="请选择是否接受!" /> }]}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Radio.Group
              value={accept}
              onChange={(e) => setAccept(e.target.value)}
              className="radio-group"
            >
              <Radio value={true}><FormattedMessage id="接受" /></Radio>
              <Radio value={false}><FormattedMessage id="拒绝" /></Radio>
            </Radio.Group>
          </Space>
        </Form.Item>

        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="submit-button"
            loading={loading} // 按钮的加载状态
          ><FormattedMessage id="提交回应" />
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应 */}
      {response && (
        <div className="response-container">
          <Title level={4}><FormattedMessage id="回应成功" /></Title>
          <Card
            title={<FormattedMessage id="求婚回应结果" />}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong><FormattedMessage id="求婚ID:" /></strong> {response.marriage_id}
              </div>
              <div>
                <strong><FormattedMessage id="是否接受:" /></strong> {response.accept ? <FormattedMessage id="接受" /> : <FormattedMessage id="拒绝" />}
              </div>
              <div>
                <strong><FormattedMessage id="交易哈希:" /></strong> <a href={`https://etherscan.io/tx/${response.tx_hash}`} target="_blank" rel="noopener noreferrer">{response.tx_hash}</a>
              </div>
              <div>
                <strong><FormattedMessage id="操作状态:" /></strong> {response.status === 'success' ? <FormattedMessage id="成功" /> : <FormattedMessage id="失败" />}
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RespondMarriageForm;
