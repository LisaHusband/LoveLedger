import React, { useState, useEffect } from 'react';
import { Card, Typography, Space, Spin } from 'antd';
import './AboutForm.css';  
import { getContactInfo } from '../../api';
import { useIntl } from 'react-intl';  // 引入 React Intl

const { Title, Paragraph } = Typography;

const AboutForm = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intl = useIntl();  // 使用 useIntl 来获取国际化方法

  // 获取联系方式，只请求一次
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const data = await getContactInfo();
        setContactInfo(data);
      } catch (error) {
        setError(intl.formatMessage({ id: '加载联系方式失败' }));
      } finally {
        setLoading(false);
      }
    };

    fetchContactInfo();
    // 设置浏览器标签页的标题
  document.title = intl.formatMessage({ id: '关于标题' });  // 使用 React Intl 获取标题
  }, [intl]);
  return (
    <div className="about-page-container">
      <Title level={2}>{intl.formatMessage({ id: "关于本项目" })}</Title>

      {/* 项目介绍 */}
      <Card className="project-intro-card">
        <Title level={3}>{intl.formatMessage({ id: "项目介绍" })}</Title>
        <Paragraph>
          {intl.formatMessage({ id: '本项目旨在创建一个去中心化的表白系统，通过区块链技术提供一个安全可靠的表白过程。' })}
          {intl.formatMessage({ id: '用户可以通过输入自己的公钥和私钥来发送和接收表白信息，同时能够查看历史记录以及参与婚姻提案的回应。' })}
        </Paragraph>
        <Paragraph>
          {intl.formatMessage({ id: '我们希望通过这个项目为情侣提供一个有趣且安全的方式，来表达彼此的感情，所有的表白和婚姻提案信息将永久保存在区块链中，不可篡改。' })}
        </Paragraph>
      </Card>

      {/* 加载动画 */}
      {loading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}

      {/* 错误信息 */}
      {error && <div className="error-message">{error}</div>}

      {/* 联系方式部分 */}
      {!loading && contactInfo && (
        <Card className="contact-info-card">
          <Title level={3}>{intl.formatMessage({ id: "联系方式" })}</Title>
          <Space direction="vertical" size="large">
            <div>
              <strong>Email:</strong> <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
            </div>
            <div>
              <strong>Discord:</strong> <a href={contactInfo.discord} target="_blank" rel="noopener noreferrer">{intl.formatMessage({ id: '点击加入 Discord' })}</a>
            </div>
            <div>
              <strong>{intl.formatMessage({ id: "GitHub 仓库:" })}</strong> <a href={contactInfo.github_repo} target="_blank" rel="noopener noreferrer">{intl.formatMessage({ id: '查看 GitHub 仓库' })}</a>
            </div>
          </Space>
        </Card>
      )}
    </div>
  );
};

export default AboutForm;
