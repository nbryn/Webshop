import { GET_AUTHORS } from "../actions/ActionTypes";

// Update the store when author action is dispatched
// Specify changes according to GET_AUTHOR action
// Takes previous state + an action and returns the new state
export default function(state = {}, action) {
  switch (action.type) {
    case GET_AUTHORS:
      return Object.assign({ ...state, authorData: action.payload });
    // Return previous state if action is unknown
    default:
      return state;
  }
}
