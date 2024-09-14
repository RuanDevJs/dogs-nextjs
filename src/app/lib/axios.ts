import axios from "axios";

const HOST = process.env.NEXT_PUBLIC_API_HOST;
const PORT = process.env.NEXT_PUBLIC_API_PORT;

const api = axios;
api.defaults.baseURL = `http://${HOST}:${PORT}/api`;

export default api;
