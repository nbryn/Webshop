import { GET_AUTHORS, GET_GENRES } from "../actions/types";

// Update store when book action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authors: action.payload };
    case GET_GENRES:
      return { ...state, genres: action.payload };
    default:
      return state;
  }
}
