import axios from "axios";

const API_URL = "https://ai-healthcare-management-system-im8h.onrender.com/dashboard/stats";
export const getDashboardStats = async () => {
const response = await axios.get(API_URL);
return response.data;
};
