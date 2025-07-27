import React, { useState, useEffect } from 'react';
import { verifyIdentity } from '../api';

/**
 * 身份验证组件
 *
 * 该组件用于验证当前部署者的身份
 *
 * @returns 一个 React 组件
 */
const IdentityVerification = () => {
  const [address, setAddress] = useState(null);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const result = await verifyIdentity();
        setAddress(result.address);
      } catch (error) {
        console.error(error);
      }
    };

    fetchIdentity();
  }, []);

  return (
    <div>
      <h2>身份验证</h2>
      {address ? (
        <p>当前部署者公钥地址：{address}</p>
      ) : (
        <p>验证中...</p>
      )}
    </div>
  );
};

export default IdentityVerification;
