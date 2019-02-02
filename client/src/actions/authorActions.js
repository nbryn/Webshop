import { GET_AUTHORS } from "./types";
import axios from "axios";

export const getAuthors = () => async dispatch => {
  try {
    let response = await axios.get(
      "http://localhost:3001/webshop/book/authors"
    );
    dispatch({
      type: GET_AUTHORS,
      payload: response.data
    });
  } catch (error) {
    throw error;
  }
};
