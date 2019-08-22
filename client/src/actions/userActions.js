import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  USER_LOADED
} from "../constants/actions";
import axios from "axios";

export const userLogin = body => dispatch => {
  axios
    .post("/api/users/login", body)
    .then(res => {
      console.log(res);
      console.log(res.data);
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      dispatch({
        type: USER_LOGIN,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Auth failed", err);
    });
};

export const userRegister = body => dispatch => {
  axios
    .post("/api/users/register", body)
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: USER_REGISTER,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Auth failed", err);
    });
};
export const userLogout = () => dispatch => {
  localStorage.removeItem("token");
  dispatch({
    type: USER_LOGOUT
  });
};

/* export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
};
 */
export const userLoaded = () => dispatch => {
  let config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  };
  axios
    .get("/api/users/", config)
    .then(res => {
      console.log(res);
      console.log(res.data);
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      console.log("Auth failed", err);
    });
};

/* export const deleteTrip = id => dispatch => {
    axios
      .delete("/api/trips/delete/" + id)
      .then(res => {
        dispatch({
          type: DELETE_TRIP,
          payload: id
        });
        window.location.href = "/trips";
      })
      .catch(err => console.log("Ups, something went wrong", err));
  }; */
