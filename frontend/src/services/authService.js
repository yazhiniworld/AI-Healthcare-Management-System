import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
});

const login = async (payload) => {
  const res = await API.post("/auth/login", payload);
  return res.data;
};

const register = async (payload) => {
  const res = await API.post("/auth/register", payload);
  return res.data;
};

const uploadCertificate = async (file) => {

  const formData = new FormData();

  formData.append("file", file);

  const res = await API.post(
    "/files/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

export default {
  login,
  register,
  uploadCertificate,
  logout,
};