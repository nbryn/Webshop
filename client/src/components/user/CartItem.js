import React, { Component } from "react";

const CartItem = ({ user, removeBook }) => {
  const renderBookImages = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "../../images/notavailable";
    }
  };

  const renderBooksInCart = () => {
    // Check if user has anything in cart
    if (user.booksInCart) {
      user.booksInCart.map(book => (
        <div className="user_cart_block" key={book._id}>
          <div className="item">
            <div
              className="image"
              style={{
                background: `url(${renderBookImages(user.images)}) no-repeat`
              }}
            />
          </div>
        </div>
      ));
    } else {
    }
  };

  return <div>{renderBooksInCart()}</div>;
};
export default CartItem;
