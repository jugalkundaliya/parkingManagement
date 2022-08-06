import axios from "axios";
import config from "../config.json";
import { toast } from "react-toastify";
axios.defaults.baseURL = config.apiUrl;

const setJwt = (jwt) => {
  axios.defaults.headers.common["Authorization"] = "bearer " + jwt;
};

axios.interceptors.response.use(null, (error) => {
  error.response.status === 401 && localStorage.removeItem("token");
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    // Here all the unexpected errors which are not of 400s are handled.
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
