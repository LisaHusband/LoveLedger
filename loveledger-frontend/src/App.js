import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [txHash, setTxHash] = useState("");
  const [error, setError] = useState("");
  const [confessions, setConfessions] = useState([]);
  const [formData, setFormData] = useState({
    from: "",
    private_key: "",
    to: "",
    title: "",
    message: "",
    partner: "",
  });

  // 统一更新表单数据
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 表白请求
  const handleConfess = async () => {
    setTxHash("");
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/confess", {
        from: formData.from,
        private_key: formData.private_key,
        to: formData.to,
        title: formData.title,
        message: formData.message,
      });
      setTxHash(response.data.tx_hash);
    } catch (err) {
      setError("表白失败，请检查输入数据或私钥");
    }
  };

  // 婚姻登记请求
  const handleMarriage = async () => {
    setTxHash("");
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/register_marriage", {
        from: formData.from,
        private_key: formData.private_key,
        partner: formData.partner,
      });
      setTxHash(response.data.tx_hash);
    } catch (err) {
      setError("婚姻登记失败，请检查输入数据或私钥");
    }
  };

  // 忠诚度互动请求
  const handleLoyalty = async () => {
    setTxHash("");
    setError("");
    try {
      const response = await axios.post("http://localhost:5000/loyalty_interaction", {
        from: formData.from,
        private_key: formData.private_key,
        partner: formData.partner,
      });
      setTxHash(response.data.tx_hash);
    } catch (err) {
      setError("忠诚度互动失败，请检查输入数据或私钥");
    }
  };

  // 获取所有表白记录
  const handleGetConfessions = async () => {
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/confessions");
      setConfessions(response.data);
    } catch (err) {
      setError("获取表白记录失败");
    }
  };

  return (
    <div className="App" style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1>LoveLedger</h1>

      <h2>身份信息（仅测试环境使用）</h2>
      <input
        type="text"
        name="from"
        placeholder="发送者地址 (from)"
        value={formData.from}
        onChange={handleChange}
      />
      <input
        type="password"
        name="private_key"
        placeholder="发送者私钥 (private_key)"
        value={formData.private_key}
        onChange={handleChange}
      />

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
        rows={4}
      />
      <button onClick={handleConfess}>发送表白</button>

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
      <button onClick={handleLoyalty}>记录互动</button>

      <h2>表白记录</h2>
      <button onClick={handleGetConfessions}>获取表白记录</button>
      {confessions.length > 0 ? (
        <ul>
          {confessions.map((rec, idx) => (
            <li key={idx} style={{ marginBottom: 15 }}>
              <h3>{rec.title}</h3>
              <p>{rec.message}</p>
              <p>
                <strong>发送者:</strong> {rec.sender}
              </p>
              <p>
                <strong>接收者:</strong> {rec.receiver}
              </p>
              <p>
                <strong>时间:</strong>{" "}
                {new Date(rec.timestamp * 1000).toLocaleString()}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>暂无表白记录</p>
      )}

      {txHash && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ color: "green" }}>交易成功！交易哈希：</h3>
          <p style={{ wordBreak: "break-all" }}>{txHash}</p>
          <p>
            <a
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              查看交易详情
            </a>
          </p>
        </div>
      )}

      {error && (
        <p style={{ color: "red", marginTop: 20, fontWeight: "bold" }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default App;
