import React from "react";

const BookInfo = props => {
  const bookInfo = props.bookInfo;
  return (
    <div>
      <h4>{bookInfo.title} </h4>
      <p>{bookInfo.description}</p>
    </div>
  );
};

export default BookInfo;
