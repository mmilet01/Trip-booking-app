import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import interceptors from "./axiosInterceptors";

axios.interceptors.request.use((req) => {
  // `req` is the Axios request config, so you can modify
  // the `headers`.
  console.log("intercepting at DOMLVL");
  console.log(req);

  return req;
});

console.log("ConfigureErrorHandling");
interceptors.ConfigureErrorHandling();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
