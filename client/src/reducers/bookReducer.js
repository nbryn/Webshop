import { GET_BOOKS } from "../actions/types";

// Update store when bookaction is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        bookData: action.payload.books,
        size: action.payload.size
      };
    default:
      return state;
  }
}
