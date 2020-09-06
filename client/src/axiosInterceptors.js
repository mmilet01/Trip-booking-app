import axios from "axios";

export default {
  ConfigureErrorHandling() {
    axios.interceptors.request.use((req) => {
      console.log(`${req.method} ${req.url} LOOOOOOOOOOOOOOOOOL`, req);
      // Important: request interceptors **must** return the request.
      return new Promise((resolve) => setTimeout(() => resolve(req), 1000));

      return req;
    });
    // Add a response interceptor
    axios.interceptors.response.use((res) => {
      console.log(res, "RESSSSSSSSSS");
      return res;
    });
  },
};
