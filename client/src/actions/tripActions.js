import {
  FETCHING_USER_TRIPS_SUCCESSFULLY,
  CLEAR_TRIP,
  TRIP_EDITED_SUCCESSFULLY,
  LOAD_SINGLE_TRIP,
  EDITING_TRIP,
  LOADING_SINGLE_TRIP_FAILED,
  LOAD_TRIPS,
  DELETING_TRIP,
  TRIP_DELETED_SUCCESSFULLY,
  TRIP_DELETING_FAILED,
  LOADING_TRIPS_FAILED,
  TRIP_CREATION_FAILED,
  TRIP_EDITING_FAILED,
  POSTING_COMMENT,
  POSTING_COMMENT_FAILED,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  TRIPS_FETCHED_SUCCESSFULLY,
  LOAD_USER_TRIPS_FAILED,
  LOAD_USER_TRIPS,
  TRIP_CREATED_SUCCESSFULLY,
  COMMENT_POSTED_SUCCESSFULLY,
  CREATING_TRIP,
} from "../constants/tripActionsConstants";
import axios from "axios";

export const fetchTrips = () => (dispatch) => {
  dispatch({ type: LOAD_TRIPS });
  axios
    .get("/api/trips")
    .then((res) => {
      dispatch({
        type: TRIPS_FETCHED_SUCCESSFULLY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING_TRIPS_FAILED,
      });
    });
};

export const fetchSingleTrip = (id) => (dispatch, getState) => {
  /*  const { state } = getState();  */
  dispatch({ type: LOAD_SINGLE_TRIP });
  axios
    .get("/api/trips/show/" + id)
    .then((res) => {
      dispatch({
        type: SINGLE_TRIP_FETCHED_SUCCESSFULLY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADING_SINGLE_TRIP_FAILED,
      });
    });
};

export const createTrip = (data, history) => (dispatch) => {
  dispatch({ type: CREATING_TRIP });
  axios
    .post("/api/trips", data)
    .then((res) => {
      dispatch({ type: TRIP_CREATED_SUCCESSFULLY });
      history.push("/trips");
    })
    .catch((err) => {
      dispatch({ type: TRIP_CREATION_FAILED });
    });
};

export const editTrip = (data, id, history) => (dispatch) => {
  dispatch({ type: EDITING_TRIP });
  axios
    .put("/api/trips/edit/" + id, data)
    .then((res) => {
      dispatch({
        type: TRIP_EDITED_SUCCESSFULLY,
        payload: data,
      });
      history.push("/trip/" + id);
    })
    .catch((err) => {
      dispatch({
        type: TRIP_EDITING_FAILED,
      });
    });
};

export const deleteTrip = (id, history) => (dispatch) => {
  dispatch({ type: DELETING_TRIP });
  axios
    .delete("/api/trips/delete/" + id)
    .then(() => {
      dispatch({
        type: TRIP_DELETED_SUCCESSFULLY,
      });
      history.push("/profile");
    })
    .catch((err) => {
      dispatch({ type: TRIP_DELETING_FAILED });
    });
};

export const clearTrip = () => (dispatch) => {
  dispatch({
    type: CLEAR_TRIP,
  });
};

export const addComment = (id, comment) => (dispatch) => {
  dispatch({ type: POSTING_COMMENT });
  axios
    .post("/api/trips/comment/" + id, {
      comment,
    })
    .then((res) => {
      dispatch({
        type: COMMENT_POSTED_SUCCESSFULLY,
        payload: res.data.comment,
      });
    })
    .catch((err) => {
      dispatch({ type: POSTING_COMMENT_FAILED });
    });
};

export const fetchUserTrips = (id) => (dispatch) => {
  dispatch({
    type: LOAD_USER_TRIPS,
  });
  axios
    .get("/api/trips/userTrips/" + id)
    .then((res) => {
      dispatch({
        type: FETCHING_USER_TRIPS_SUCCESSFULLY,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOAD_USER_TRIPS_FAILED,
      });
    });
};
