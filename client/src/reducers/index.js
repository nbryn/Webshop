import { combineReducers } from "redux";
import user from "./userReducer";
import authors from "./authorReducer";
import genres from "./genreReducer";
import books from "./bookReducer";

const rootReducer = combineReducers({
  user,
  authors,
  genres,
  books
});

export default rootReducer;
