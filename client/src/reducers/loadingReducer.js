import {
  LOAD_SINGLE_TRIP,
  LOAD_TRIPS,
  LOAD_USER_TRIPS,
  LOADING_SINGLE_TRIP_FAILED,
  LOADING_TRIPS_FAILED,
  TRIPS_FETCHED_SUCCESSFULLY,
  LOAD_USER_DATA,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  USER_FETCHED_SUCCESSFULLY,
  LOADING_USER_FAILED,
  LOADING_CURRENT_USER,
  USER_LOADED_SUCCESSFULLY,
  USER_LOADED_FAIL,
  LOAD_USER_TRIPS_FAILED,
  FETCHING_USER_TRIPS_SUCCESSFULLY,
  LIKE_ADDED_SUCCESSFULLY,
  ADDING_LIKE,
  REMOVING_LIKE,
  ADDING_LIKE_FAILED,
  REMOVED_LIKE_SUCCESSFULLY,
  REMOVE_LIKE_FAILED,
} from "../constants/actions";

const initialState = {
  loadingSingleTrip: false,
  loadingTrips: false,
  loadingUserTrips: false,
  loadingUserData: false,
  loadingCurrentUser: false,
  likingInProgress: false,
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
    case USER_FETCHED_SUCCESSFULLY:
    case LOADING_USER_FAILED:
      return {
        ...state,
        loadingUserData: false,
      };
    case LOADING_CURRENT_USER:
      return {
        ...state,
        loadingCurrentUser: true,
      };
    case USER_LOADED_FAIL:
    case USER_LOADED_SUCCESSFULLY:
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
    case ADDING_LIKE:
    case REMOVING_LIKE:
      return {
        ...state,
        likingInProgress: true,
      };
    case LIKE_ADDED_SUCCESSFULLY:
    case ADDING_LIKE_FAILED:
    case REMOVE_LIKE_FAILED:
    case REMOVED_LIKE_SUCCESSFULLY:
      return {
        ...state,
        likingInProgress: false,
      };
    default:
      return state;
  }
}
