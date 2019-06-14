import {
  GET_BOOKS,
  GET_BOOK_DETAILS,
  CLEAR_BOOK_DETAILS
} from "../actions/ActionTypes";

// Update store when bookaction is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookData: action.payload.books,
        size: action.payload.size
      };
    case GET_BOOK_DETAILS:
      return {
        ...state,
        bookDetails: action.payload
      };
    case CLEAR_BOOK_DETAILS:
      return {
        ...state,
        bookDetails: action.payload
      };
    default:
      return state;
  }
}
