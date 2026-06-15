import axios from "axios";

const API_URL = "http://localhost:8080/appointments";

export const getAllAppointments = async () => {
const response = await axios.get(API_URL);
return response.data;
};

export const confirmAppointment = async (id) => {
const response = await axios.put(
`${API_URL}/${id}/confirm`
);
return response.data;
};

export const completeAppointment = async (id) => {
const response = await axios.put(
`${API_URL}/${id}/complete`
);
return response.data;
};

export const cancelAppointment = async (id) => {
const response = await axios.put(
`${API_URL}/${id}/cancel`
);
return response.data;
};
