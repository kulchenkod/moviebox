import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(function(config) {
  const newConfig = {
    ...config,
    params: {
      ...config.params,
      language: "ru-RU",
      api_key: process.env.REACT_APP_API_KEY
    }
  };
  return newConfig;
});
