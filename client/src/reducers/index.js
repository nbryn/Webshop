import { combineReducers } from "redux";
import user from "./UserReducer";
import authors from "./AuthorReducer";
import genres from "./GenreReducer";
import books from "./BookReducer";

const rootReducer = combineReducers({
  user,
  authors,
  genres,
  books
});

export default rootReducer;
