import { GET_GENRES } from "../actions/ActionTypes";

// Update store when genre action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_GENRES:
      return { ...state, genreData: action.payload };
    default:
      return state;
  }
}
