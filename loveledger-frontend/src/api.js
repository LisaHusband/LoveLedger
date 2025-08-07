import axios from 'axios';

const BASE_URL = 'http://localhost:5000'; // 后端API的地址
// const BASE_URL = 'https://loveledger.tech/api';

// 请求表白
export const sendConfession = async (from, privateKey, to, title, message) => {
  try {
    const response = await axios.post(`${BASE_URL}/confess`, {
      from, private_key: privateKey, to, title, message
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 回应表白
export const respondConfession = async (from, privateKey, confessionId, accept) => {
  try {
    const response = await axios.post(`${BASE_URL}/respond_confession`, {
      from, private_key: privateKey, confession_id: confessionId, accept
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 求婚
export const registerMarriage = async (from, privateKey, partner) => {
  try {
    const response = await axios.post(`${BASE_URL}/register_marriage`, {
      from, private_key: privateKey, partner
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 回应求婚
export const respondMarriage = async (from, privateKey, marriageId, accept) => {
  try {
    const response = await axios.post(`${BASE_URL}/respond_marriage`, {
      from, private_key: privateKey, marriage_id: marriageId, accept
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// 查询表白历史
export const getConfessionsHistory = async (address) => {
  const response = await axios.get(`${BASE_URL}/confessions_to/${address}`);
  return response.data;
};

// 查询求婚历史
export const getMarriagesHistory = async (address) => {
  const response = await axios.get(`${BASE_URL}/marriages_of/${address}`);
  return response.data;
};

// 查询爱情信用
export const getLoveCredit = async (address) => {
  const response = await axios.get(`${BASE_URL}/love_credit/${address}`);
  return response.data;
};

// 身份验证
export const verifyIdentity = async () => {
  const response = await axios.get(`${BASE_URL}/verify_identity`);
  return response.data;
};

// 获取通讯信息
export const getContactInfo = async (address) => {
  const response = await axios.get(`${BASE_URL}/contact_info`);
  return response.data;
};