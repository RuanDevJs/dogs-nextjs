import axios from "axios";

const api = axios;
api.defaults.baseURL = "http://localhost:3000/api";

export default api;
