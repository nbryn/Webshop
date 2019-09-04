import { GET_AUTHORS } from "./ActionTypes";
import axios from "axios";
import { BOOK } from "./ServerRoutes";

// This action is not used atm

// Get all authors from server
export const getAuthors = () => async dispatch => {
  let response = await axios.get(`${BOOK}/book/authors`);

  // Send information retrieved to the store
  dispatch({
    type: GET_AUTHORS,
    payload: response.data
  });
};
