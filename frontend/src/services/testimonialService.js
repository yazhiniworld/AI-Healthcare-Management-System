import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-healthcare-management-system-im8h.onrender.com",
});

export const getTestimonials = async () => {
  const response = await API.get("/testimonials");
  return response.data;
};

export default {
  getTestimonials,
};
