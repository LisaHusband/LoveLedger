import React, { useState, useEffect } from 'react';
import { getMarriagesHistory } from '../api';
import { useParams } from 'react-router-dom';

const MarriagesHistory = ({ match }) => {
  const [marriages, setMarriages] = useState([]);
  const { address } = useParams();

  useEffect(() => {
    const fetchMarriages = async () => {
      try {
        const result = await getMarriagesHistory(address);
        setMarriages(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMarriages();
  }, [address]);

  return (
    <div>
      <h2>{address} 的求婚历史</h2>
      <ul>
        {marriages.length > 0 ? (
          marriages.map((marriage, index) => (
            <li key={index}>
              <p>配偶A：{marriage.partnerA}</p>
              <p>配偶B：{marriage.partnerB}</p>
              <p>状态：{marriage.status === 0 ? '未接受' : '已接受'}</p>
              <p>时间戳：{new Date(marriage.timestamp * 1000).toLocaleString()}</p>
            </li>
          ))
        ) : (
          <p>没有求婚历史</p>
        )}
      </ul>
    </div>
  );
};

export default MarriagesHistory;
