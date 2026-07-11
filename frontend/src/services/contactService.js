import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
});

export const sendContactMessage = async (message) => {
  const response = await API.post("/contact", message);
  return response.data;
};

export default {
  sendContactMessage,
};
