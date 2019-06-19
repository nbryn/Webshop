import { NEW_USER, SET_USER, AUTH_USER } from "../actions/ActionTypes";

// Update store when user action is dispatched
export default function(state = {}, action) {
  switch (action.type) {
    case NEW_USER:
      return Object.assign({ ...state, signUp: action.payload });
    case SET_USER:
      return Object.assign({ ...state, login: action.payload });
    case AUTH_USER:
      return Object.assign({ ...state, userData: action.payload });
    default:
      return state;
  }
}
