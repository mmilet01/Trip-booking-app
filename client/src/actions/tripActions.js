import {
  FETCH_TRIPS,
  FETCH_SINGLE_TRIP,
  FETCH_USER_TRIPS,
  DELETE_TRIP,
  EDIT_TRIP,
  CLEAR_TRIP,
  ADD_COMMENT,
  ADD_LIKE,
  REMOVE_LIKE,
  START_FETCHING,
} from "../constants/actions";
import axios from "axios";

export const fetchTrips = () => (dispatch) => {
  dispatch({ type: START_FETCHING });
  axios
    .get("/api/trips")
    .then((res) => {
      console.log("TRIPS FETCHED");
      dispatch({
        type: FETCH_TRIPS,
        payload: res.data,
      });
    })
    .catch((err) => console.log("ERROR", err));
};

export const fetchSingleTrip = (id) => (dispatch, getState) => {
  /*  const { state } = getState();
  console.log(getState().tripReducer.trips);
  problem ako korisnik bez loadanja svih tripiova dode samo na jedan koji ima bookmarkan->nece mu ga pokazat
  */
  dispatch({ type: START_FETCHING });

  axios
    .get("/api/trips/show/" + id)
    .then((res) => {
      dispatch({
        type: FETCH_SINGLE_TRIP,
        payload: res.data,
      });
    })
    .catch((err) => console.log("Ups, something went wrong", err));
};

export const createTrip = (data, history) => {
  const config = addTokenToHeaders();
  axios
    .post("/api/trips", data, config)
    .then((res) => {
      history.push("/trips");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

export const editTrip = (data, id, history) => (dispatch) => {
  axios
    .put("/api/trips/edit/" + id, data)
    .then((res) => {
      dispatch({
        type: EDIT_TRIP,
        payload: data,
      });
      history.push("/trip/" + id);
    })
    .catch((err) => {
      console.log("Error", err);
    });
};

export const deleteTrip = (id, history) => (dispatch) => {
  axios
    .delete("/api/trips/delete/" + id)
    .then((res) => {
      dispatch({
        type: DELETE_TRIP,
        payload: id,
      });
      history.push("/profile");
    })
    .catch((err) => console.log("Ups, something went wrong", err));
};

export const clearTrip = () => (dispatch) => {
  dispatch({
    type: CLEAR_TRIP,
  });
};

export const addComment = (id, comment) => (dispatch) => {
  const config = addTokenToHeaders();
  axios
    .post(
      "/api/trips/comment/" + id,
      {
        comment,
      },
      config
    )
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: ADD_COMMENT,
        payload: res.data.comment,
      });
    })
    .catch((err) => {
      console.log("Error in COMMENTING", err);
    });
};

export const addLike = (id) => (dispatch, getState) => {
  const config = addTokenToHeaders();
  axios
    .post("/api/trips/like/" + id, null, config)
    .then((res) => {
      console.log("LIKING RES", res.data.trip);
      console.log(getState().tripReducer.trips);
      let newTrips = getState().tripReducer.trips.map((trip) => {
        if (trip.id == res.data.trip.id) {
          trip = res.data.trip;
        }
        return trip;
      });
      console.log(newTrips);
      dispatch({
        type: ADD_LIKE,
        payload: newTrips,
      });
    })
    .catch((err) => {
      console.log("Error in LIKING", err);
    });
};

export const removeLike = (id) => (dispatch, getState) => {
  const config = addTokenToHeaders();
  axios
    .post("/api/trips/unlike/" + id, null, config)
    .then((res) => {
      let newTrips = getState().tripReducer.trips.map((trip) => {
        if (trip.id == res.data.trip.id) {
          trip = res.data.trip;
        }
        return trip;
      });
      dispatch({
        type: ADD_LIKE,
        payload: newTrips,
      });
    })
    .catch((err) => {
      console.log("Error in LIKING", err);
    });
};

const addTokenToHeaders = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  return config;
};

axios.interceptors.request.use((req) => {
  console.log("INTERCEPTING???????");
  console.log(req);
  // `req` is the Axios request config, so you can modify
  // the `headers`.
  /*   req.headers.authorization = "my secret token";
   */ return req;
});

/* 
export const fetchUserTrips = id => dispatch => {
  axios
    .get("/api/trips/userTrips/" + id)
    .then(res => {
      dispatch({
        type: FETCH_USER_TRIPS,
        payload: res.data
      });
    })
    .catch(err =>
      console.log("Ups, something went wrong with fetching user trips", err)
    );
}; */
