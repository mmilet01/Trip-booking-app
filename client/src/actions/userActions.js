import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_LOADED,
  USER_LOADED_FAIL,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
  FETCH_USER,
  CLEAR_USER,
  LOADING_CURRENT_USER,
} from "../constants/actions";
import axios from "axios";

export const userLoaded = () => (dispatch) => {
  dispatch({
    type: LOADING_CURRENT_USER,
  });
  axios
    .get("/api/users/")
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      if (err.response) {
        localStorage.removeItem("token");
      }
      dispatch({
        type: USER_LOADED_FAIL,
      });
    });
};

export const userLogin = (body) => (dispatch) => {
  axios
    .post("/api/users/login", body)
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_LOGIN,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: USER_LOGIN_FAIL,
          payload: err.response.data.msg,
        });
      }
    });
};

export const userRegister = (body) => (dispatch) => {
  axios
    .post("/api/users/register", body)
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_REGISTER,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      if (err.response) {
        dispatch({
          type: USER_REGISTER_FAIL,
          payload: err.response.data.msg,
        });
      }
    });
};

export const fetchUser = (id) => (dispatch) => {
  axios
    .get("/api/users/user/" + id)
    .then((res) => {
      dispatch({
        type: FETCH_USER,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      console.log("Failure catching user profile", err.response);
    });
};

export const clearUser = () => (dispatch) => {
  dispatch({
    type: CLEAR_USER,
  });
};

export const userLogout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({
    type: USER_LOGOUT,
  });
};

export const clearningErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
