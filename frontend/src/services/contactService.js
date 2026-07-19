import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-healthcare-management-system-im8h.onrender.com",
});

export const sendContactMessage = async (message) => {
  const response = await API.post("/contact", message);
  return response.data;
};

export default {
  sendContactMessage,
};
