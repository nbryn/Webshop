import axios from "axios";
import { NEW_USER } from "./types";

export const newUser = (user, history) => async dispatch => {
  try {
    await axios.post("https://localhost:3001/webshop/users/signup", user);
    history.push("/signin");
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
