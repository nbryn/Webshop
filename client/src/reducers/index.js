import { combineReducers } from "redux";
import user from "./userReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  user
});

export default rootReducer;
