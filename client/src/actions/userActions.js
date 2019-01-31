import axios from "axios";
import { GET_ERRORS, NEW_USER, SET_USER, AUTH_USER } from "./types";

// Try to persist user -> Dispatch NEW_User/GET_ERRORS action
export const newUser = (user, history) => async dispatch => {
  try {
    let response = await axios.post(
      "http://localhost:3001/webshop/users/signup",
      user
    );
    history.push("/");

    // Dispatch NEW_USER action to store
    dispatch({
      type: NEW_USER,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
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

    const { token } = response.data;
    localStorage.setItem("jwtToken", token);

    /*const { token } = response.data;
    document.cookie = `authorized=${token};value=token;path='/'`;*/

    // Dispatch SET_USER action to store
    dispatch({
      type: SET_USER,
      payload: response
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
//Try to authenticate user -> Dispatch AUTH_USER action
export const authentication = () => async dispatch => {
  try {
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
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data
    });
  }
};
