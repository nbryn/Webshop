import { GET_AUTHORS } from "../actions/types";

// Update store when author action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return { ...state, authorData: action.payload };
    default:
      return state;
  }
}
