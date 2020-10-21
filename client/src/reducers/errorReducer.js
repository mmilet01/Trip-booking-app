/*
  CURRENTLY COPY PASTED, NOT DOING ANYTHING - GONNA BE USED LATER
*/

import { DEFAULT_ERROR } from "../constants/userActionsContants";

const initialState = {
  errorMsg: [],
  statusCode: "",
  isFetching: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ERROR:
      return {
        errorMsg: [],
        statusCode: "",
        isFetching: true,
      };
    default:
      return state;
  }
}
