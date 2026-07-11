// src/services/patientService.js

import axios from "axios";

const API_URL = "http://localhost:8090/patients";
const PORTAL_URL = "http://localhost:8090/patient";

export const getAllPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPatientByUserId = async (userId) => {
  const response = await axios.get(`${PORTAL_URL}/profile/${userId}`);
  return response.data;
};

export const getPatientReports = async (userId) => {
  const response = await axios.get(`${PORTAL_URL}/reports/${userId}`);
  return response.data;
};

export const addPatient = async (patient) => {
  const response = await axios.post(API_URL, patient);
  return response.data;
};

export const updatePatient = async (id, patient) => {
  const response = await axios.put(`${API_URL}/${id}`, patient);
  return response.data;
};

export const deletePatient = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export default {
  getAllPatients,
  getPatientByUserId,
  getPatientReports,
  addPatient,
  updatePatient,
  deletePatient,
};