// src/services/patientService.js

import axios from "axios";

const API_URL = "http://localhost:8080/patients";

export const getAllPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const addPatient = async (patient) => {
  const response = await axios.post(API_URL, patient);
  return response.data;
};