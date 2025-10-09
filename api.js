// frontend/api.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

const API = axios.create({
  baseURL: "http://10.218.22.191:5000/api",
});

// Middleware: kalau ada token, otomatis kirim ke backend
API.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
