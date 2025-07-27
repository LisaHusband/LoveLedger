import React, { useState } from 'react';
import { registerMarriage } from '../api';

const MarriageForm = () => {
  const [from, setFrom] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [partner, setPartner] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await registerMarriage(from, privateKey, partner);
      setResponse(result);
    } catch (error) {
      setResponse(error);
    }
  };

  return (
    <div>
      <h2>求婚</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="发送方" value={from} onChange={(e) => setFrom(e.target.value)} required />
        <input type="password" placeholder="私钥" value={privateKey} onChange={(e) => setPrivateKey(e.target.value)} required />
        <input type="text" placeholder="配偶" value={partner} onChange={(e) => setPartner(e.target.value)} required />
        <button type="submit">提交求婚</button>
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

export default MarriageForm;
