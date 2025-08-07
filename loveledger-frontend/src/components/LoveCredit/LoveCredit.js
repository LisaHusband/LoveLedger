import React, { useState, useEffect } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getLoveCredit } from '../../api'; // 假设你的 API 请求已配置好
import './LoveCreditForm.css'; // 引入样式文件
import { useIntl } from 'react-intl'; // 使用 React Intl

const { Title } = Typography;

const LoveCreditForm = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [address, setAddress] = useState('');

  const intl = useIntl(); // 使用 React Intl 获取语言包

  const handleFinish = async (values) => {
    const { address } = values;
    setLoading(true); // 开始加载
    try {
      const result = await getLoveCredit(address);  // 发起请求
      setResponse(result);
    } catch (error) {
      setResponse(error);
    } finally {
      setLoading(false); // 加载完成
    }
  };

  useEffect(() => {
    // 设置浏览器标签页的标题
    document.title = intl.formatMessage({ id: '查询爱情信用标题' });  // 使用 React Intl 获取标题
  }, [intl]);

  return (
    <div className="love-credit-form-container">
      <Title level={2}>{intl.formatMessage({ id: '爱情信用查询' })}</Title>

      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      <Form onFinish={handleFinish} className="love-credit-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: intl.formatMessage({ id: '请输入地址!' }) }]}
        >
          <Input
            placeholder={intl.formatMessage({ id: '请输入地址' })}
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
            {intl.formatMessage({ id: '查询爱情信用' })}
          </Button>
        </Form.Item>
      </Form>

      {/* 展示响应内容 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{intl.formatMessage({ id: '查询结果' })}</Title>
          
          <Card
            title={intl.formatMessage({ id: '爱情信用信息' })}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{intl.formatMessage({ id: '信用值： ' })}</strong> {response.love_credit}
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '状态：' })}</strong> 
                {response.love_credit === 0
                  ? intl.formatMessage({ id: '极佳' })
                  : response.love_credit <= 3
                  ? intl.formatMessage({ id: '良好' })
                  : response.love_credit <= 5
                  ? intl.formatMessage({ id: '一般' })
                  : intl.formatMessage({ id: '较差' })}
              </div>
              <div>
                <strong>{intl.formatMessage({ id: '查询地址：' })}</strong> {address}
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoveCreditForm;
