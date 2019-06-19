import React from "react";

const BookInfo = props => {
  const showBookTags = bookDetails => (
    <div className="book_tags">
      {bookDetails.inStock ? (
        <div className="tag">
          <div className="tag_text">
            <div>
              <h4>Book Info</h4>
              <strong>In Stock: </strong> Yes
            </div>
          </div>
        </div>
      ) : (
        <div className="tag">
          <div className="tag_text">
            <div>In stock: Yes</div>
          </div>
        </div>
      )}
    </div>
  );

  const showBookInfo = bookDetails => (
    <div className="book_info">
      <div>
        <div className="item">
          <strong>Description: </strong>
          {bookDetails.description}
        </div>
        <div className="item">
          <strong>Pages: </strong>
          {bookDetails.pages}
        </div>
        <br />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        addToCart={() => {
          console.log("Add to cart");
        }}
      >
        Add To Cart
      </button>
    </div>
  );

  const showPriceAndCart = bookDetails => (
    <div className="book_actions">
      <div className="price">
        <strong>Price: </strong> {bookDetails.price}
      </div>
      <div className="cart" />
    </div>
  );

  const bookInfo = props.bookInfo;
  return (
    <div>
      <h4>{bookInfo.title} </h4>
      <p>{bookInfo.description}</p>
      {showBookTags(bookInfo)}
      {showPriceAndCart(bookInfo)}
      {showBookInfo(bookInfo)}
    </div>
  );
};

export default BookInfo;
