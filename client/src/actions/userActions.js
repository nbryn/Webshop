import axios from "axios";
import { NEW_USER, SET_USER, AUTH_USER, ADD_TO_CART } from "./ActionTypes";

// Try to persist user -> Dispatch NEW_User/GET_ERRORS action
export const newUser = (user, history) => async dispatch => {
  try {
    let response = await axios.post(
      "http://localhost:3001/webshop/users/signup",
      user
    );
    history.push("/signin");

    // Dispatch NEW_USER action to store
    dispatch({
      type: NEW_USER,
      payload: response
    });
  } catch (error) {
    throw error;
  }
};
// Try to log user in -> Dispatch SET_USER/GET_ERRORS action
export const login = (signInRequest, history) => async dispatch => {
  try {
    let response = await axios.post(
      "http://localhost:3001/webshop/users/signin",
      signInRequest
    );
    history.push("/user/dashboard");

    // Set token in local storage
    const { token } = response.data;
    localStorage.setItem("jwtToken", token);

    // Dispatch SET_USER action to store
    dispatch({
      type: SET_USER,
      payload: response
    });
  } catch (error) {
    throw error;
  }
};
//Try to authenticate user -> Dispatch AUTH_USER action
export const authentication = () => async dispatch => {
  try {
    // Get token from local storage
    let jwtToken = localStorage.getItem("jwtToken");
    let request = { token: jwtToken };
    let response = await axios.post(
      "http://localhost:3001/webshop/users/auth",
      request
    );

    // Dispatch AUTH_USER action to store
    dispatch({
      type: AUTH_USER,
      payload: response
    });
  } catch (error) {
    throw error;
  }
};

export const signOut = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: SET_USER,
    payload: {}
  });
};

export const addToCart = id => async dispatch => {
  return {
    type: ADD_TO_CART,
    payload: ""
  };
};
