import { GET_BOOKS, GET_BOOK_DETAILS, CLEAR_BOOK_DETAILS } from "./ActionTypes";
import axios from "axios";

//Get all books from the server
export const getBooks = (max, skip, prevState = []) => async dispatch => {
  const requestData = {
    max,
    skip
  };

  let response = await axios.post(
    "http://localhost:3001/webshop/book/shop",
    requestData
  );

  let responseData = {
    books: response.data.books,
    size: response.data.size
  };

  dispatch({
    type: GET_BOOKS,
    payload: responseData
  });
};

//Get Book Info from the server
export function getBookDetails(id) {
  const request = axios
    .get(`http://localhost:3001/webshop/book_by_id?id=${id}&type=array`)
    .then(response => {
      return response.data[0];
    });
  return {
    type: GET_BOOK_DETAILS,
    payload: request
  };
}

//Clear details so that we dont have 2x details in state
export function clearBookDetails() {
  return {
    type: CLEAR_BOOK_DETAILS,
    payload: ""
  };
}
