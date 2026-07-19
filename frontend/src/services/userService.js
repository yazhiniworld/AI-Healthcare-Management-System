import axios from 'axios';

const API = axios.create({
  baseURL: "https://ai-healthcare-management-system-im8h.onrender.com",
});

const getAllUsers = async () => {
  const res = await API.get('/users');
  return res.data;
};

const getUserById = async (id) => {
  const res = await API.get(`/users/${id}`);
  return res.data;
};

const createUser = async (data) => {
  const res = await API.post('/auth/register', data);
  return res.data;
};

const updateUser = async (id, data) => {
  const res = await API.put(`/users/${id}`, data);
  return res.data;
};

const deleteUser = async (id) => {
  const res = await API.delete(`/users/${id}`);
  return res.data;
};

const approveDoctor = async (id) => {
  const res = await API.put(`/users/${id}/approve`);
  return res.data;
};

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  approveDoctor,
};
