import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllAppointments = async () => {
  const response = await API.get("/appointments");
  return response.data;
};

export const bookAppointment = async (appointment) => {
  const response = await API.post("/patient/appointments", appointment);
  return response.data;
};

export const confirmAppointment = async (id) => {
  const response = await API.put(`/appointments/${id}/confirm`);
  return response.data;
};

export const completeAppointment = async (id) => {
  const response = await API.put(`/appointments/${id}/complete`);
  return response.data;
};

export const cancelAppointment = async (id) => {
  const response = await API.put(`/appointments/${id}/cancel`);
  return response.data;
};

export const getAppointmentsByPatientUser = async (userId) => {
  const response = await API.get(`/appointments/patient-user/${userId}`);
  return response.data;
};

export const getAppointmentsByDoctorUser = async (userId) => {
  const response = await API.get(`/appointments/doctor-user/${userId}`);
  return response.data;
};

export const getPatientReports = async (userId) => {
  const response = await API.get(`/patient/reports/${userId}`);
  return response.data;
};

export const uploadReport = async (appointmentId, payload) => {
  const response = await API.post(`/appointments/${appointmentId}/report`, payload);
  return response.data;
};

export default {
  getAllAppointments,
  bookAppointment,
  confirmAppointment,
  completeAppointment,
  cancelAppointment,
  getAppointmentsByPatientUser,
  getAppointmentsByDoctorUser,
  getPatientReports,
  uploadReport,
};

