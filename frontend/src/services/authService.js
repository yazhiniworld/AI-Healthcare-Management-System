import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080',
});

const login = async (payload) => {
  const res = await API.post('/auth/login', payload);
  return res.data;
};

const register = async (payload) => {
  const res = await API.post('/auth/register', payload);
  return res.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default { login, register, logout };
