import React, { Component } from "react";
import { addToCart } from "../../actions/UserActions";
import { connect } from "react-redux";

class BookInfo extends Component {
  // Handles click on Add To Cart button
  addBookToCart(bookId, userId) {
    // Dispatch user action addToCart
    this.props.dispatch(addToCart(bookId, userId));
  }

  render() {
    const bookDetails = this.props.bookDetails;
    const userId = this.props.userInfo.data._id;
    return (
      <div className="container">
        <h4>{bookDetails.title} </h4>

        <div className="book_info">
          {bookDetails.inStock ? (
            <div className="item">
              <strong>In Stock: </strong> Yes
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
          <div className="item">
            <strong>Description: </strong>
            {bookDetails.description}
          </div>
          <div className="item">
            <strong>Pages: </strong>
            {bookDetails.pages}
          </div>

          <div className="book_info">
            <div className="item">
              <strong>Price: </strong> {bookDetails.price}
            </div>
            <div className="cart" />
          </div>
          <div className="book_info">
            <div className="item">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  // Checks if user is logged ind
                  if (localStorage.getItem("jwtToken")) {
                    this.addToCartHandler(bookDetails._id, userId);
                  } else {
                    this.props.history.push("/signup");
                  }
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
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
