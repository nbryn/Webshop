import { SET_USER } from "../actions/types";

const initialState = {
  validToken: false,
  user: {}
};

const payload = payload => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return Object.assign({}, state, {
        validToken: payload(action.payload),
        user: action.payload
      });
    default:
      return state;
  }
}
