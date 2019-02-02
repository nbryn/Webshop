import { combineReducers } from "redux";
import user from "./userReducer";
import book from "./bookReducer";

const rootReducer = combineReducers({
  user,
  book
});

export default rootReducer;
