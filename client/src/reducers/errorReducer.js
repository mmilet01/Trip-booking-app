import {
  CLEAR_ERRORS,
  USER_LOADED_FAIL,
  USER_REGISTER_FAIL,
  USER_LOGIN_FAIL,
  FETCH_TRIPS_FAIL,
  FETCH_SINGLE_TRIP_FAIL,
  DEFAULT_ERROR,
} from "../constants/actions";

const initialState = {
  errorMsg: [],
  statusCode: "",
  isFetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return {
        errorMsg: [],
        statusCode: "",
        isFetching: true,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
      };
    case USER_REGISTER_FAIL:
      return {
        ...state,
      };
    case USER_LOGIN_FAIL:
      return {
        ...state,
      };
    case FETCH_TRIPS_FAIL:
      return {
        ...state,
      };
    case FETCH_SINGLE_TRIP_FAIL:
      return {
        ...state,
      };
    case DEFAULT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
