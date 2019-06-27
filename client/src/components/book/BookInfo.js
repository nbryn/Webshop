import React, { Component } from "react";
import { addToCart } from "../../actions/UserActions";
import { connect } from "react-redux";

class BookInfo extends Component {
  render() {
    const bookDetails = this.props.bookInfo;
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
              if (localStorage.getItem("jwtToken")) {
                this.props.dispatch(addToCart(bookDetails._id));
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
