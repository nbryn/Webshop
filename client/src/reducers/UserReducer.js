import {
  NEW_USER,
  SET_USER,
  AUTH_USER,
  ADD_TO_CART
} from "../actions/ActionTypes";

// Update store when user action is dispatched
// Initial state is empty
export default function(state = {}, action) {
  // Does not mutate state, creates copy of state with Object.assign
  switch (action.type) {
    case NEW_USER:
      return Object.assign({ ...state, signUp: action.payload });
    case SET_USER:
      return Object.assign({ ...state, login: action.payload });
    case AUTH_USER:
      return Object.assign({ ...state, userData: action.payload });
    case ADD_TO_CART:
      return Object.assign({
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      });
    default:
      return state;
  }
}
