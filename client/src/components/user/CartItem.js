import React, { Component } from "react";
import { connect } from "react-redux";

class CartItem extends Component {
  showBooksInCart = () => {
    this.props.user.booksInCart
      ? this.props.user.booksInCart.map(book => {
          <div className="user_product_block" key={book._id} />;
        })
      : null;
  };

  removeBookFromCart = id => {};

  render() {
    return <div>{this.showBooksInCart()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(CartItem);
