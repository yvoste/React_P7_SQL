import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Attribue le header Authorization avec le token à toutes les requêtes axios
http.interceptors.request.use(function (config) {
  let token = false;
  if (localStorage.getItem("userToken")) {
    token = localStorage.getItem("userToken");
  }
  config.headers.Authorization = token ? `Bearer ${token}` : " ";
  return config;
});

export default http;
