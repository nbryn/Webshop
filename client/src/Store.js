import rootReducer from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import promiseMiddleware from "redux-promise";

// Contains the entire state of the application

const initialState = {};

//Only for development

/*const ReactReduxDevTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
*/

const store = createStore(
  rootReducer,
  initialState,
  compose(applyMiddleware(reduxThunk, promiseMiddleware))
);

export default store;
