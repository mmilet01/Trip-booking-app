import { combineReducers } from "redux";
import tripReducer from "./tripReducer";
import userReducer from "./userReducer";
import errorReducer from "./errorReducer";
import loadingReducer from "./loadingReducer";

const rootReducer = combineReducers({
  tripReducer,
  userReducer,
  loadingReducer,
});

export default rootReducer;
