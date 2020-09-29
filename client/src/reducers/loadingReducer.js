import {
  LOAD_SINGLE_TRIP,
  LOAD_TRIPS,
  LOAD_USER_TRIPS,
  LOADING_SINGLE_TRIP_FAILED,
  LOADING_TRIPS_FAILED,
  TRIPS_FETCHED_SUCCESSFULLY,
  LOAD_USER_DATA,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  LOADING_CURRENT_USER,
  USER_LOADED,
  USER_LOADED_FAIL,
  LOAD_USER_TRIPS_FAILED,
  FETCHING_USER_TRIPS_SUCCESSFULLY,
} from "../constants/actions";

// 2 options : either create new action : LOAD_SINGLE_TRIP_FINISHED
// or when dispaching an action listen to it: for example TRIPSFETCHED or failed and change state accordingly

const initialState = {
  loadingSingleTrip: false,
  loadingTrips: false,
  loadingUserTrips: false,
  loadingUserData: false,
  loadingCurrentUser: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOAD_SINGLE_TRIP:
      return {
        ...state,
        loadingSingleTrip: true,
      };
    case LOAD_TRIPS:
      return {
        ...state,
        loadingTrips: true,
      };
    case LOAD_USER_TRIPS:
      return {
        ...state,
        loadingUserTrips: true,
      };
    case LOAD_USER_DATA:
      return {
        ...state,
        loadingUserData: true,
      };
    case LOADING_CURRENT_USER:
      return {
        ...state,
        loadingCurrentUser: true,
      };
    case USER_LOADED_FAIL:
    case USER_LOADED:
      return {
        ...state,
        loadingCurrentUser: false,
      };
    case LOADING_TRIPS_FAILED:
    case TRIPS_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        loadingTrips: false,
      };
    case SINGLE_TRIP_FETCHED_SUCCESSFULLY:
    case LOADING_SINGLE_TRIP_FAILED:
      return {
        ...state,
        loadingSingleTrip: false,
      };
    case FETCHING_USER_TRIPS_SUCCESSFULLY:
    case LOAD_USER_TRIPS_FAILED:
      return {
        ...state,
        loadingUserTrips: false,
      };
    default:
      return state;
  }
}
