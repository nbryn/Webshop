import { GET_BOOKS } from "./types";
import axios from "axios";

export const getBooks = (
  max,
  skip,
  filters = [],
  prevState = []
) => async dispatch => {
  const requestData = {
    max,
    skip,
    filters
  };

  try {
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
  } catch (error) {
    console.log(error);
  }
};
