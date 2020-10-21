import {
  DEFAULT_ERROR,
  USER_REGISTER_FAIL,
  USER_LOGIN_FAIL,
} from "../constants/userActionsContants";

const initialState = {
  loginRegisterErrorMsg: "",
  defaultErrorMsg: "",
  statusCode: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ERROR:
      return {
        defaultErrorMsg: "Error occured, try again later",
        statusCode: "",
      };
    case USER_REGISTER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        loginRegisterErrorMsg: action.payload,
        statusCode: "",
      };
    default:
      return state;
  }
}
