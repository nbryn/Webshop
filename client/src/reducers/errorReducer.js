import { GET_ERRORS } from "../actions/types";

// Update store if error action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}
