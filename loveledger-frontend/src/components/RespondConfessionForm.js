import React, { useState } from 'react';
import { respondConfession } from '../api';

const RespondConfessionForm = () => {
  const [from, setFrom] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [confessionId, setConfessionId] = useState('');
  const [accept, setAccept] = useState(false);
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await respondConfession(from, privateKey, confessionId, accept);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    }
  };

  return (
    <div>
      <h2>回应表白</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="回应者地址" value={from} onChange={(e) => setFrom(e.target.value)} required />
        <input type="password" placeholder="私钥" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} required />
        <input type="number" placeholder="表白ID" value={confessionId} onChange={(e) => setConfessionId(e.target.value)} required />
        <label>
          <input type="radio" value={true} checked={accept === true} onChange={() => setAccept(true)} />
          接受
        </label>
        <label>
          <input type="radio" value={false} checked={accept === false} onChange={() => setAccept(false)} />
          拒绝
        </label>
        <button type="submit">提交回应</button>
      </form>
      {response && (
        <div>
          <h3>响应</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default RespondConfessionForm;
