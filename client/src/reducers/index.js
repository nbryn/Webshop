import { combineReducers } from "redux";
import user from "./userReducer";
import books from "./bookReducer";

const rootReducer = combineReducers({
  user,
  books
});

export default rootReducer;
