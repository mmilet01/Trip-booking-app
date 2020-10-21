import {
  LOAD_SINGLE_TRIP,
  LOAD_TRIPS,
  LOAD_USER_TRIPS,
  LOADING_SINGLE_TRIP_FAILED,
  LOADING_TRIPS_FAILED,
  TRIPS_FETCHED_SUCCESSFULLY,
  SINGLE_TRIP_FETCHED_SUCCESSFULLY,
  LOAD_USER_TRIPS_FAILED,
  FETCHING_USER_TRIPS_SUCCESSFULLY,
  POSTING_COMMENT,
  COMMENT_POSTED_SUCCESSFULLY,
  POSTING_COMMENT_FAILED,
} from "../constants/tripActionsConstants";
import {
  LOAD_USER_DATA,
  USER_FETCHED_SUCCESSFULLY,
  LOADING_USER_FAILED,
  LOADING_CURRENT_USER,
  USER_LOADED_SUCCESSFULLY,
  USER_LOADED_FAIL,
  USER_LOGIN_SUCCESSFULLY,
  USER_REGISTERED_SUCCESSFULLY,
  USER_LOGOUT,
  USER_LOGIN_FAIL,
  USER_REGISTER_FAIL,
  USER_LOGIN_START,
  USER_REGISTER_START,
} from "../constants/userActionsContants";

const initialState = {
  isLoggedIn: false,
  loadingSingleTrip: false,
  loadingTrips: false,
  loadingUserTrips: false,
  loadingUserData: false,
  loadingCurrentUser: false,
  loggingInUser: false,
  addingComment: false,
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
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    case USER_LOGIN_START:
    case USER_REGISTER_START:
      return {
        ...state,
        loggingInUser: true,
      };
    case LOADING_CURRENT_USER:
      return {
        ...state,
        loadingCurrentUser: true,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loadingCurrentUser: false,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        loggingInUser: false,
      };
    case USER_LOGIN_SUCCESSFULLY:
    case USER_REGISTERED_SUCCESSFULLY:
      return {
        ...state,
        isLoggedIn: true,
        loggingInUser: false,
      };
    case USER_LOADED_SUCCESSFULLY:
      return {
        ...state,
        isLoggedIn: true,
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
    case POSTING_COMMENT:
      return {
        ...state,
        addingComment: true,
      };
    case COMMENT_POSTED_SUCCESSFULLY:
    case POSTING_COMMENT_FAILED:
      return {
        ...state,
        addingComment: false,
      };
    default:
      return state;
  }
}
