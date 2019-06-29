import React, { Component } from "react";
import { addToCart } from "../../actions/UserActions";
import { connect } from "react-redux";

class BookInfo extends Component {
  // Handles click on Add To Cart button
  addToCartHandler(bookId, userId) {
    // Dispatch user action addToCart
    this.props.dispatch(addToCart(bookId, userId));
  }

  render() {
    const bookDetails = this.props.bookDetails;
    const userId = this.props.userInfo.data._id;
    return (
      <div className="container">
        <h4>{bookDetails.title} </h4>
        <p>{bookDetails.description}</p>
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
                <div>In stock: No</div>
              </div>
            </div>
          )}
        </div>
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
            onClick={() => {
              // Chech if user is logged ind
              if (localStorage.getItem("jwtToken")) {
                // If user is logged in run addToCartHandler function
                this.addToCartHandler(bookDetails._id, userId);
              } else {
                console.log("You need to login");
              }
            }}
          />
        </div>
        <div className="book_actions">
          <div className="price">
            <strong>Price: </strong> {bookDetails.price}
          </div>
          <div className="cart" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(BookInfo);
