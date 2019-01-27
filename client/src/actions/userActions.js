import axios from "axios";
import { NEW_USER, SET_USER } from "./types";

export const newUser = (user, history) => async dispatch => {
  try {
    let response = await axios.post(
      "http://localhost:3001/webshop/users/signup",
      user
    );
    history.push("/");
    dispatch({
      type: NEW_USER,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: NEW_USER,
      payload: error.response.data
    });
  }
};

export const login = (signInRequest, history) => async dispatch => {
  try {
    let response = await axios.post(
      "http://localhost:3001/webshop/users/signin",
      signInRequest
    );
    history.push("/signup");

    dispatch({
      type: SET_USER,
      payload: {}
    });
  } catch (error) {
    dispatch({
      type: SET_USER,
      payload: error.response.data
    });
  }
};

export const signOut = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: SET_USER,
    payload: {}
  });
};
