import React, { useState, useEffect } from 'react';
import { getConfessionsHistory } from '../api';
import { useParams } from 'react-router-dom';

const ConfessionsHistory = ({ match }) => {
  const [confessions, setConfessions] = useState([]);
  const { address } = useParams();

  useEffect(() => {
    const fetchConfessions = async () => {
      try {
        const result = await getConfessionsHistory(address);
        setConfessions(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchConfessions();
  }, [address]);

  return (
    <div>
      <h2>{address} 的表白历史</h2>
      <ul>
        {confessions.length > 0 ? (
          confessions.map((confession, index) => (
            <li key={index}>
              <p>标题：{confession.title}</p>
              <p>信息：{confession.message}</p>
              <p>发送方：{confession.sender}</p>
              <p>状态：{confession.status === 0 ? '未接受' : '已接受'}</p>
            </li>
          ))
        ) : (
          <p>没有表白历史</p>
        )}
      </ul>
    </div>
  );
};

export default ConfessionsHistory;
