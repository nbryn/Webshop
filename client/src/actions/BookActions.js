import {
  GET_ALL_BOOKS,
  GET_BOOK_DETAILS,
  CLEAR_BOOK_DETAILS
} from "./ActionTypes";
import axios from "axios";
import { BOOK } from "./ServerRoutes";

//Get all books from the server
export const getAllBooks = (max, skip, prevState = []) => async dispatch => {
  const requestData = {
    max,
    skip
  };

  let response = await axios.post(`${BOOK}/shop`, requestData);

  let responseData = {
    books: response.data.books,
    size: response.data.size
  };

  dispatch({
    type: GET_ALL_BOOKS,
    payload: responseData
  });
};

//Get Book Info from the server
export function getBookDetails(id) {
  const request = axios
    .get(`${BOOK}/book_by_id?id=${id}&type=array`)
    .then(response => {
      return response.data[0];
    });
  return {
    type: GET_BOOK_DETAILS,
    payload: request
  };
}

//Clear details so that state does not have 2x book details
export function clearBookDetails() {
  return {
    type: CLEAR_BOOK_DETAILS,
    payload: ""
  };
}
