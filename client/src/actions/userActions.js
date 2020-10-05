import {
  USER_LOGOUT,
  USER_LOADED_SUCCESSFULLY,
  USER_LOADED_FAIL,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_USER,
  LOAD_USER_DATA,
  LOADING_CURRENT_USER,
  USER_FETCHED_SUCCESSFULLY,
  LOADING_USER_FAILED,
  USER_LOGIN_SUCCESSFULLY,
  USER_REGISTERED_SUCCESSFULLY,
  USER_REGISTER_START,
  USER_LOGIN_START,
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
        type: USER_LOADED_SUCCESSFULLY,
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
  dispatch({
    type: USER_LOGIN_START,
  });
  axios
    .post("/api/users/login", body)
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_LOGIN_SUCCESSFULLY,
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
  dispatch({
    type: USER_REGISTER_START,
  });
  axios
    .post("/api/users/register", body)
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_REGISTERED_SUCCESSFULLY,
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
  dispatch({
    type: LOAD_USER_DATA,
  });
  axios
    .get("/api/users/user/" + id)
    .then((res) => {
      dispatch({
        type: USER_FETCHED_SUCCESSFULLY,
        payload: res.data.user,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING_USER_FAILED,
      });
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

export const clearningErrors = () => (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
