import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8090",
  headers: {
    "Content-Type": "application/json",
  },
});

const mapDoctor = (doctor) => ({
  id: doctor.doctorId,
  name: doctor.doctorName,
  specialization: doctor.specialization,
  experience: doctor.experience,
  phone: doctor.phone,
  title: doctor.specialization,
  availability: "Available",
});

export const getAllDoctors = async () => {
  try {
    const response = await API.get("/doctors");
    return response.data.map(mapDoctor);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const searchDoctors = async (query) => {
  try {
    const response = await API.get("/doctors/search", {
      params: { q: query },
    });
    return response.data.map(mapDoctor);
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw error;
  }
};

export const addDoctor = async (doctor) => {
  try {
    const payload = {
      doctorName: doctor.name,
      specialization: doctor.specialization,
      experience: parseInt(doctor.experience, 10),
      phone: doctor.phone,
    };

    const response = await API.post("/doctors", payload);
    return mapDoctor(response.data);
  } catch (error) {
    console.error("Error adding doctor:", error);
    throw error;
  }
};

export const updateDoctor = async (doctorId, doctor) => {
  try {
    const payload = {
      doctorId,
      doctorName: doctor.doctorName || doctor.name,
      specialization: doctor.specialization,
      experience: parseInt(doctor.experience, 10),
      phone: doctor.phone,
    };

    const response = await API.put(`/doctors/${doctorId}`, payload);
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
};

export const deleteDoctor = async (id) => {
  try {
    await API.delete(`/doctors/${id}`);
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
};

export const getDoctorsBySpecialization = async (specialization) => {
  try {
    const response = await API.get(`/doctors/specialization/${specialization}`);
    return response.data.map(mapDoctor);
  } catch (error) {
    console.error("Error fetching specialization:", error);
    throw error;
  }
};

export const getDoctorsByExperience = async (experience) => {
  try {
    const response = await API.get(`/doctors/experience/${experience}`);
    return response.data.map(mapDoctor);
  } catch (error) {
    console.error("Error fetching experience:", error);
    throw error;
  }
};

export const getDoctorByUserId = async (userId) => {
  try {
    const response = await API.get(`/doctors/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    throw error;
  }
};

export default {
  getAllDoctors,
  searchDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsBySpecialization,
  getDoctorsByExperience,
  getDoctorByUserId,
};