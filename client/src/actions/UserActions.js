import axios from "axios";
import {
  NEW_USER,
  SET_USER,
  AUTH_USER,
  ADD_TO_CART,
  GET_BOOKS_IN_CART
} from "./ActionTypes";

// Try to persist user -> Dispatch NEW_User/GET_ERRORS action
export const newUser = (user, history) => async dispatch => {
  try {
    const response = await axios.post(
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
    const response = await axios.post(
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
// Try to authenticate user -> Dispatch AUTH_USER action
export const authentication = () => async dispatch => {
  try {
    // Get token from local storage
    const jwtToken = localStorage.getItem("jwtToken");
    const request = { token: jwtToken };
    const response = await axios.post(
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

// Action for user signing out
export const signOut = () => dispatch => {
  localStorage.removeItem("jwtToken");
  dispatch({
    type: SET_USER,
    payload: {}
  });
};

// Forward book ID and User ID to server for persistence in cart
export const addToCart = (bookId, userId) => {
  try {
    const request = axios
      .post(
        `http://localhost:3001/webshop/users/addtocart?bookId=${bookId}&userId=${userId}`
      )
      .then(response => response.data);

    return {
      type: ADD_TO_CART,
      payload: request
    };
  } catch (error) {
    console.log(error);
  }
};

export const getDetailedCartInfo = (cartItems, cart) => {
  const request = axios
    .get(`http://localhost:3001/webshop/book_by_id?id=${cartItems}&type=array`)
    .then(response => {
      console.log(response.data);
      return response.data;
    });

  return {
    type: GET_BOOKS_IN_CART,
    payload: ""
  };
};
