import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-healthcare-management-system-im8h.onrender.com",
});

export const getFeed = async () => {
  const response = await API.get("/feed");
  return response.data;
};

export default {
  getFeed,
};
