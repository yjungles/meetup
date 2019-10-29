import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

instance.interceptors.request.use(config => {
  config.headers["Accept"] = "application/json";
  config.headers["Content-Type"] = "application/json";

  // Precisa que data seja um objeto para enviar o Content-Type
  if (!config.data) {
    config.data = {};
  }

  return config;
});

export default instance;
