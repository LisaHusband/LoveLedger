import React, { useState } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [formData, setFormData] = useState({
    to: "",
    title: "",
    message: "",
    partner: "",
  });

  // 更新表单数据
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 发送表白请求
  const handleConfess = async () => {
    try {
      const response = await axios.post("http://localhost:5000/confess", {
        to: formData.to,
        title: formData.title,
        message: formData.message,
      });
      setTxHash(response.data.tx_hash);
      setError("");
    } catch (err) {
      setError("表白失败，请检查输入数据");
    }
  };

  // 注册婚姻请求
  const handleMarriage = async () => {
    try {
      const response = await axios.post("http://localhost:5000/register_marriage", {
        partner: formData.partner,
      });
      setTxHash(response.data.tx_hash);
      setError("");
    } catch (err) {
      setError("婚姻登记失败，请检查输入数据");
    }
  };

  // 忠诚度互动请求
  const handleLoyalty = async () => {
    try {
      const response = await axios.post("http://localhost:5000/loyalty_interaction", {
        partner: formData.partner,
      });
      setTxHash(response.data.tx_hash);
      setError("");
    } catch (err) {
      setError("忠诚度互动失败，请检查输入数据");
    }
  };

  // 获取表白记录
  const handleGetConfessions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/confessions");
      setConfessions(response.data);
      setError("");
    } catch (err) {
      setError("获取表白记录失败");
    }
  };

  return (
    <div className="App">
      <h1>LoveLedger</h1>
      
      <h2>表白</h2>
      <input
        type="text"
        name="to"
        placeholder="接收表白的地址"
        value={formData.to}
        onChange={handleChange}
      />
      <input
        type="text"
        name="title"
        placeholder="表白标题"
        value={formData.title}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="表白内容"
        value={formData.message}
        onChange={handleChange}
      />
      <button onClick={handleConfess}>表白</button>

      <h2>婚姻登记</h2>
      <input
        type="text"
        name="partner"
        placeholder="配偶地址"
        value={formData.partner}
        onChange={handleChange}
      />
      <button onClick={handleMarriage}>登记婚姻</button>

      <h2>忠诚度互动</h2>
      <input
        type="text"
        name="partner"
        placeholder="互动的配偶地址"
        value={formData.partner}
        onChange={handleChange}
      />
      <button onClick={handleLoyalty}>互动</button>

      <h2>表白记录</h2>
      <button onClick={handleGetConfessions}>获取表白记录</button>
      <div>
        {confessions.length > 0 ? (
          <ul>
            {confessions.map((record, index) => (
              <li key={index}>
                <h3>{record.title}</h3>
                <p>{record.message}</p>
                <p>
                  <strong>Sender:</strong> {record.sender}
                </p>
                <p>
                  <strong>Receiver:</strong> {record.receiver}
                </p>
                <p>
                  <strong>Timestamp:</strong> {new Date(record.timestamp * 1000).toLocaleString()}
                </p>
                <hr />
              </li>
            ))}
          </ul>
        ) : (
          <p>没有表白记录。</p>
        )}
      </div>

      {txHash && (
        <div>
          <h3>交易成功！交易哈希：</h3>
          <p>{txHash}</p>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default App;
