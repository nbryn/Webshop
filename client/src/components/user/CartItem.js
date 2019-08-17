import React from "react";
import notAvailable from "../images/notavailable.png";

const CartItem = ({ user, removeBookFromCart }) => {
  const renderBookImage = images => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return notAvailable;
    }
  };

  const renderBooksInCart = () =>
    // Check if user has anything in cart
    user.booksInCart
      ? user.booksInCart.map(book => (
          <div className="user-cart-block" key={book._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${renderBookImage(book.image)}) no-repeat`
                }}
              />
            </div>
            <div className="item">
              <h5> Title</h5>
              <div>{book.title}</div>
            </div>
            <div className="item">
              <h5> Quantity</h5>
              <div>{book.quantity}</div>
            </div>
            <div className="item">
              <h5> Price</h5>
              <div>{book.price}$</div>
            </div>
            <div className="item btn">
              <div
                className="cart-remove-btn"
                onClick={() =>
                  removeBookFromCart(book._id, user.userData.data._id)
                }
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderBooksInCart()}</div>;
};
export default CartItem;
