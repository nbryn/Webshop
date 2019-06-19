import { GET_GENRES } from "./ActionTypes";
import axios from "axios";

//This action is not used atm

// Get genres from server
export const getGenres = () => async dispatch => {
  try {
    let response = await axios.get("http://localhost:3001/webshop/book/genres");

    // Forward information from server to the store
    dispatch({
      type: GET_GENRES,
      payload: response.data
    });
  } catch (error) {
    throw error;
  }
};
