import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
});

export const getTestimonials = async () => {
  const response = await API.get("/testimonials");
  return response.data;
};

export default {
  getTestimonials,
};
