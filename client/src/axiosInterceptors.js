import axios from "axios";

export default {
  ConfigureErrorHandling() {
    axios.interceptors.request.use((req) => {
      req.headers.Authorization = "Bearer " + localStorage.getItem("token");
      // Important: request interceptors **must** return the request
      return new Promise((resolve) => setTimeout(() => resolve(req), 1000));
    });

    // Add a response interceptor to check errors?
    axios.interceptors.response.use((res) => {
      return res;
    });
  },
};
