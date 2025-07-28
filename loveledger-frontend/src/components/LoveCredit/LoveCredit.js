import React, { useState } from 'react';
import { Input, Button, Form, Typography, Card, Spin, Space } from 'antd'; // 引入 Ant Design 组件
import { getLoveCredit } from '../../api'; // 假设你的 API 请求已配置好
import './LoveCreditForm.css'; // 引入样式文件
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const LoveCreditForm = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false); // 控制加载状态
  const [address, setAddress] = useState('');

  const { t } = useTranslation();

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

  return (
    <div className="love-credit-form-container">
      <Title level={2}>{t('爱情信用查询')}</Title>

      {/* 显示加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      <Form onFinish={handleFinish} className="love-credit-form">
        <Form.Item
          name="address"
          rules={[{ required: true, message: t('请输入地址!') }]}
        >
          <Input
            placeholder={t("请输入地址")}
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
          >{t('查询爱情信用')}</Button>
        </Form.Item>
      </Form>

      {/* 展示响应内容 */}
      {response && (
        <div className="response-container">
          <Title level={4}>{t('查询结果')}</Title>
          
          <Card
            title={t("爱情信用信息")}
            bordered={false}
            style={{ width: '100%', marginTop: 20 }}
            className="response-card"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <strong>{t('信用值： ')}</strong> {response.love_credit}
              </div>
              <div>
                <strong>{t('状态：')}</strong> 
                {response.love_credit === 0
                  ? t('极佳')
                  : response.love_credit <= 3
                  ? t('良好')
                  : response.love_credit <= 5
                  ? t('一般')
                  : t('较差')}
              </div>
              <div>
                <strong>{t('查询地址：')}</strong> {address}
              </div>
            </Space>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LoveCreditForm;
