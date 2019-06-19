import { combineReducers } from "redux";
import user from "./UserReducer";
import authors from "./AuthorReducer";
import genres from "./GenreReducer";
import books from "./BookReducer";

// Generates function that calls reducers with the part of state selected according to the reducers specific keys
const rootReducer = combineReducers({
  user,
  authors,
  genres,
  books
});

export default rootReducer;
