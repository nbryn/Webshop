import {
  NEW_USER,
  SET_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_BOOKS_IN_CART
} from "../actions/ActionTypes";

// Update store when user action is dispatched
// Initial state is empty
export default function(state = {}, action) {
  // Doesn't mutate state, creates copy of state with Object.assign
  switch (action.type) {
    case NEW_USER:
      return Object.assign({
        ...state,
        signUp: action.payload
      });
    case SET_USER:
      return Object.assign({
        ...state,
        login: action.payload
      });
    case AUTH_USER:
      return Object.assign({
        ...state,
        userData: action.payload
      });
    // Doesn't update all userData only data related to the cart
    case ADD_TO_CART:
      return Object.assign({
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload
        }
      });
    case GET_BOOKS_IN_CART: {
      return Object.assign({
        ...state,
        booksInCart: action.payload
      });
    }
    default:
      return state;
  }
}
