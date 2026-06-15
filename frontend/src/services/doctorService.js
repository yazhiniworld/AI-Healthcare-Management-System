import axios from "axios";

const API_URL = "http://localhost:8080/doctors";

export const getAllDoctors = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addDoctor = async (doctor) => {
  const response = await axios.post(API_URL, doctor);
  return response.data;
};

export const deleteDoctor = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};