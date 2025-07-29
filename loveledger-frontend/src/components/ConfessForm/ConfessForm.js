import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 导入 Ant Design 组件
import { sendConfession } from '../../api';
import './ConfessForm.css'; 
import { getIntl } from '../../i18n'; // 从i18n获取国际化信息

const { Title } = Typography;

const ConfessForm = () => {
  const intl = getIntl(); // 获取当前的 intl 配置
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);  // 控制加载状态

  const handleFinish = async (values) => {
    // values 会自动包含所有输入框的值
    const { from, privateKey, to, title, message } = values;
    setLoading(true); // 开始加载
    try {
      const result = await sendConfession(from, privateKey, to, title, message);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    }
    finally {
      setLoading(false); // 加载完成
    }
  };

  return (
    <div className="confess-form-container">
      <Title level={2}>{intl.formatMessage({ id: '表白' })}</Title>
      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />{intl.formatMessage({ id: '加载中' })}
        </div>
      )}
      <Form onFinish={handleFinish} className="confess-form">
        <Form.Item
          name="from"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入发送方地址!' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: "发送方" })} className="input-field" />
        </Form.Item>
        <Form.Item
          name="privateKey"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入私钥!' }) }]}
        >
          <Input.Password placeholder={intl.formatMessage({ id: "私钥" })} className="input-field" />
        </Form.Item>
        <Form.Item
          name="to"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入接收方地址!' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: "接收方" })} className="input-field" />
        </Form.Item>
        <Form.Item
          name="title"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入表白标题!' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: "表白标题" })} className="input-field" />
        </Form.Item>
        <Form.Item
          name="message"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入表白信息!' }) }]}
        >
          <Input.TextArea placeholder={intl.formatMessage({ id: "表白信息" })} className="input-field" />
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="submit-button"
            loading={loading} // 按钮的加载状态
          >
            {intl.formatMessage({ id: '提交表白' })}
          </Button>
        </Form.Item>
      </Form>
      {response && (
        <div className="response-container">
          <Title level={4}>{intl.formatMessage({ id: '表白响应' })}</Title>
          
          {/* 使用 Card 来展示响应数据 */}
          <Card
            title={intl.formatMessage({ id: "表白成功！" })}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{intl.formatMessage({ id: '表白信息 ID:' })}</strong> {response.confession_id}
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '交易哈希:' })}</strong> <a href={`https://etherscan.io/tx/${response.tx_hash}`} target="_blank" rel="noopener noreferrer">{response.tx_hash}</a>
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '现在你可以将ID作为你们的定情信物交给对方，对方会选择接受还是拒绝或者忽略' })}</strong>
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ConfessForm;
