import axios from "axios";

export default {
  UseInterceptors() {
    axios.interceptors.request.use((req) => {
      req.headers.Authorization = "Bearer " + localStorage.getItem("token");
      // Important: request interceptors **must** return the request
      return new Promise((resolve) => setTimeout(() => resolve(req), 2000));
    });

    // Possibility to a response interceptor to check errors
    axios.interceptors.response.use((res) => {
      return res;
    });
  },
};
