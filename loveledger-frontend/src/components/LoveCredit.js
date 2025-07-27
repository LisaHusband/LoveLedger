import React, { useState, useEffect } from 'react';
import { getLoveCredit } from '../api';
import { useParams } from 'react-router-dom';

const LoveCredit = ({ match }) => {
  const [loveCredit, setLoveCredit] = useState(null);
  const { address } = useParams();

  useEffect(() => {
    const fetchLoveCredit = async () => {
      try {
        const result = await getLoveCredit(address);
        setLoveCredit(result.love_credit);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLoveCredit();
  }, [address]);

  return (
    <div>
      <h2>爱情信用</h2>
      <p>地址：{address}</p>
      {loveCredit !== null ? (
        <div>
          <p>爱情信用：{loveCredit}</p>
          <p>
            状态：{' '}
            {loveCredit === 0
              ? '极佳'
              : loveCredit <= 3
              ? '良好'
              : loveCredit <= 5
              ? '一般'
              : '较差'}
          </p>
        </div>
      ) : (
        <p>加载中...</p>
      )}
    </div>
  );
};

export default LoveCredit;
