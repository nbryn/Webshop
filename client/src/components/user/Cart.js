import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "./UserLayout";
import { getQuantityInCart, removeCartItem } from "../../actions/UserActions";
import CartItem from "../user/CartItem";

class Cart extends Component {
  // Dont show total in UI before total is available
  state = {
    loading: true,
    totalPrice: 0,
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
          .then(() => {
            const cartItems = this.props.user.booksInCart;
            if (cartItems.length > 0) {
              this.calculateTotalPrice(cartItems);
            }
          });
      }
    }
  }

  noItemsInCart = () => (
    <div className="cart_empty">You don't have anything in your cart</div>
  );

  // Calculate total price for all items in users cart
  calculateTotalPrice = cartItems => {
    let totalPrice = 0;

    cartItems.forEach(book => {
      totalPrice += parseInt(book.price, 10) * book.quantity;
    });

    // Update state to show total in UI
    this.setState({
      totalPrice,
      showTotal: true
    });
  };

  removeBookFromCart = id => {
    this.props.dispatch(removeCartItem(id)).then(() => {
      if (this.props.user.booksInCart < 1) {
        this.setState({
          showTotal: false
        });
      } else {
        this.calculateTotalPrice(this.props.user.booksInCart);
      }
    });
  };
  render() {
    return (
      <UserLayout>
        <div>
          <h1>Cart</h1>
          <div className="user_cart">
            <CartItem
              user={this.props.user}
              removeBookFromCart={id => this.removeBookFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className="user_cart_total">
                  <div style={{ left: "50px" }}>
                    Total Price: ${this.state.totalPrice}
                  </div>
                </div>
              </div>
            ) : (
              this.noItemsInCart()
            )}
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
