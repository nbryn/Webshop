import { GET_GENRES } from "./ActionTypes";
import axios from "axios";

export const getGenres = () => async dispatch => {
  try {
    let response = await axios.get("http://localhost:3001/webshop/book/genres");
    dispatch({
      type: GET_GENRES,
      payload: response.data
    });
  } catch (error) {
    throw error;
  }
};
