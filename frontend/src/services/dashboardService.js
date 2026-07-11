import axios from "axios";

const API_URL = "http://localhost:8090/dashboard/stats";

export const getDashboardStats = async () => {
const response = await axios.get(API_URL);
return response.data;
};
