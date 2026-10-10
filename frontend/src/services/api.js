import axios from "axios";

const api = axios.create({
  baseURL: "https://vaccination-centre-management-system.onrender.com/api"
});

export default api;