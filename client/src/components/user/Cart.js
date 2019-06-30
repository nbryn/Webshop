import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "./UserLayout";
import { getDetailedCartInfo } from "../../actions/UserActions";

class Cart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSucces: false
  };

  componentDidMount() {
    const cartItems = [];
    const user = this.props.user;

    // Cart only contains a book's ID -> Need to fetch price etc. from server
    // Check if user has a cart
    if (user.userData.cart) {
      // Check if cart is empty
      if (user.userData.cart.length > 0) {
        // Push cart items into cartItems array
        user.userData.cart.forEach(book => {
          cartItems.push(book.id);
        });

        this.props
          .dispatch(getDetailedCartInfo(cartItems, user.userData.cart))
          .then(() => {});
      }
    }
  }
  render() {
    return (
      <UserLayout>
        <div>cart</div>
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
