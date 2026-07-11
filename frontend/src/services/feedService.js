import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
});

export const getFeed = async () => {
  const response = await API.get("/feed");
  return response.data;
};

export default {
  getFeed,
};
