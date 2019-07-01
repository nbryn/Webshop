import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "./UserLayout";
import { getQuantityInCart } from "../../actions/UserActions";
import CartItem from "../user/CartItem";

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSucces: false
  };

  componentDidMount() {
    let cartItems = [];
    const user = this.props.user.userData;

    // Cart only contains information about a book, not quantity in cart -> Need to fetch quantity from server
    // Check if user has a cart
    if (user.data.cart) {
      // Check if cart is empty

      if (user.data.cart.length > 0) {
        // Push cart items into cartItems array
        user.data.cart.forEach(book => {
          cartItems.push(book.id);
        });

        this.props
          .dispatch(getQuantityInCart(cartItems, user.data.cart))
          .then(() => {});
      }
    }
  }
  render() {
    return (
      <UserLayout>
        <div>
          <h1>Cart</h1>
          <div className="user_cart">
            <CartItem />
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Cart);
