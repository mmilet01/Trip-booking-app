import {
  USER_REGISTERED_SUCCESSFULLY,
  USER_REGISTER_FAIL,
  USER_LOGIN_SUCCESSFULLY,
  USER_LOGIN_FAIL,
  USER_LOADED_SUCCESSFULLY,
  USER_LOADED_FAIL,
  USER_LOGOUT,
  CLEAR_ERRORS,
  USER_FETCHED_SUCCESSFULLY,
  LOADING_USER_FAILED,
  CLEAR_USER,
} from "../constants/userActionsContants";

const initialState = {
  isLoggedIn: false,
  user: null,
  fetchedUser: {},
  errorMsg: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESSFULLY:
    case USER_REGISTERED_SUCCESSFULLY:
    case USER_LOADED_SUCCESSFULLY:
      return {
        ...state,
        user: action.payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
      };
    case USER_FETCHED_SUCCESSFULLY:
      return {
        ...state,
        fetchedUser: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        user: null,
        errorMsg: action.payload,
      };
    case CLEAR_USER:
    case LOADING_USER_FAILED:
      return {
        ...state,
        fetchedUser: {},
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errorMsg: null,
      };
    default:
      return state;
  }
}
