import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/rootReducer";
import thunk from "redux-thunk";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(...middleware)
    /*     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() -> add this if we have chrome exxtension installed for redux
     */
  )
);

store.subscribe(() => {
  /*  console.log(store);
  console.log("something changed"); */
});
// functions if we want to put the state of the app into localstorage
export default store;
