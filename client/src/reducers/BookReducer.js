import {
  GET_ALL_BOOKS,
  GET_BOOK_DETAILS,
  CLEAR_BOOK_DETAILS
} from "../actions/ActionTypes";

// Update store when bookaction is dispatched
// Initial state is empty
export default function(state = {}, action) {
  // Does not mutate state, creates copy with Object.assign
  switch (action.type) {
    case GET_ALL_BOOKS:
      return Object.assign({
        ...state,
        bookArray: action.payload.books,
        size: action.payload.size
      });
    case GET_BOOK_DETAILS:
      return Object.assign({
        ...state,
        bookDetails: action.payload
      });
    case CLEAR_BOOK_DETAILS:
      return Object.assign({
        ...state,
        bookDetails: action.payload
      });
    default:
      return state;
  }
}
