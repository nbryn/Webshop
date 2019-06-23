import { GET_GENRES } from "../actions/ActionTypes";

// Update store when genre action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_GENRES:
      return Object.assign({ ...state, genreData: action.payload });
    default:
      return state;
  }
}
