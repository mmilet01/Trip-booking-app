import {
  USER_REGISTER,
  USER_REGISTER_FAIL,
  USER_LOGIN,
  USER_LOGIN_FAIL,
  USER_LOADED,
  USER_LOADED_FAIL,
  USER_LOGOUT,
  CLEAR_ERRORS,
  FETCH_USER,
  CLEAR_USER,
} from "../constants/actions";

const initialState = {
  isLoggedIn: false,
  user: null,
  fetchedUser: {},
  errorMsg: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOGIN:
    case USER_REGISTER:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case FETCH_USER:
      return {
        ...state,
        fetchedUser: action.payload,
      };
    case USER_LOADED:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case USER_LOGIN_FAIL:
    case USER_REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        errorMsg: action.payload,
      };
    case USER_LOADED_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case CLEAR_USER: {
      return {
        ...state,
        fetchedUser: {},
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        errorMsg: null,
      };
    default:
      return state;
  }
}
