import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 导入 Ant Design 组件
import { registerMarriage } from '../../api';  // 导入 API 请求函数
import './MarriageForm.css';  // 引入样式文件
import { useIntl } from 'react-intl'; // 使用 React Intl

const { Title } = Typography;

const MarriageForm = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);  // 控制加载状态

  const intl = useIntl();  // 获取 intl 实例

  const handleFinish = async (values) => {
    const { from, privateKey, partner } = values;
    setLoading(true); // 开始加载
    try {
      const result = await registerMarriage(from, privateKey, partner);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    }
    finally {
      setLoading(false); // 加载完成
    }
  };

  useEffect(() => {
    // 设置浏览器标签页的标题
    document.title = intl.formatMessage({ id: '求婚标题' });  // 使用 React Intl 获取标题
  }, [intl]);

  return (
    <div className="marriage-form-container">
      <Title level={2}>{intl.formatMessage({ id: '求婚' })}</Title>

      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      <Form onFinish={handleFinish} className="marriage-form">
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
          name="partner"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入配偶地址!' }) }]}
        >
          <Input placeholder={intl.formatMessage({ id: "配偶" })} className="input-field" />
        </Form.Item>
        
        <Form.Item>
          <Button
            type="default"
            htmlType="submit"
            className="submit-button"
            loading={loading} // 按钮的加载状态
          >
            {intl.formatMessage({ id: '提交求婚' })}
          </Button>
        </Form.Item>
      </Form>

      {/* 响应部分 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{intl.formatMessage({ id: '求婚响应' })}</Title>
          
          {/* 使用 Card 来展示响应数据 */}
          <Card
            title={intl.formatMessage({ id: "求婚成功！" })}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{intl.formatMessage({ id: '求婚信息 ID:' })}</strong> {response.marriage_id}
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '交易哈希:' })}</strong> 
                <a href={`https://etherscan.io/tx/${response.tx_hash}`} target="_blank" rel="noopener noreferrer">
                  {response.tx_hash}
                </a>
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '现在你可以将ID作为你们的订婚信物交给对方，对方会选择接受还是拒绝或者忽略' })}</strong>
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MarriageForm;
