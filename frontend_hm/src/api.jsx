import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getStaff = () => API.get("/staff");
export const getStaffById = (id) => API.get(`/staff/${id}`);
export const createStaff = (data) => API.post("/staff", data);
export const updateStaff = (id, data) => API.put(`/staff/${id}`, data);
export const deleteStaff = (id) => API.delete(`/staff/${id}`);

export const getDoctors = () => API.get("/doctor");
export const createDoctor = (data) => API.post("/doctor/add", data);
export const getDoctorById = (id) => API.get(`/doctor/${id}`);
export const updateDoctor = (id, data) => API.put(`/doctor/${id}`, data);
export const deleteDoctor = (id) => API.delete(`/doctor/${id}`);

// Pharmacy APIs
export const getMedicines = () => API.get("/pharma");
export const addMedicine = (data) => API.post("/pharma", data);
export const updateMedicine = (id, data) => API.put(`/pharma/${id}`, data);
export const deleteMedicine = (id) => API.delete(`/pharma/${id}`);