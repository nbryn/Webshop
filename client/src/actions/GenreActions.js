import { GET_GENRES } from "./ActionTypes";
import axios from "axios";
import { BOOK } from "./ServerRoutes";

//This action is not used atm

// Get genres from server
export const getGenres = () => async dispatch => {
  try {
    let response = await axios.get(`${BOOK}/genres`);

    // Forward information from server to the store
    dispatch({
      type: GET_GENRES,
      payload: response.data
    });
  } catch (error) {
    throw error;
  }
};
