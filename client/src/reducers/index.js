import { combineReducers } from "redux";
import user from "./UserReducer";
import authors from "./AuthorReducer";
import books from "./BookReducer";

// Generates function that calls reducers with the part of state selected according to the reducers specific keys
const rootReducer = combineReducers({
  user,
  authors,
  books
});

export default rootReducer;
