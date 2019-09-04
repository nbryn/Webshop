import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

// Contains the entire state of the application

const initialState = {};
let Store;

const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

if (window.navigator.userAgent.includes("Chrome")) {
  Store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(reduxThunk, promiseMiddleware),
      ReactReduxDevTools
    )
  );
} else {
  Store = createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(reduxThunk, promiseMiddleware))
  );
}

export default Store;
