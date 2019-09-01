import React, { Component } from "react";
import { connect } from "react-redux";
import UserLayout from "./UserLayout";
import { getQuantityInCart, removeCartItem } from "../../actions/UserActions";
import CartItem from "../user/CartItem";

class Cart extends Component {
  // Dont show total in UI if cart is empty
  state = {
    loading: true,
    totalPrice: 0,
    showTotal: false
  };

  componentDidMount() {
    const cartItems = [];
    const user = this.props.user.userData;

    // Checks if user has a cart
    if (user.data.cart) {
      // Checks if cart is empty
      if (user.data.cart.length > 0) {
        // Push ID of books in the cart into the cartItems array
        user.data.cart.forEach(book => {
          cartItems.push(book.id);
        });

        // Cart only contains information about books in the cart, not quantity -> Need to fetch quantity from server
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

  removeBookFromCart = (bookId, userId) => {
    this.props.dispatch(removeCartItem(bookId, userId)).then(() => {
      // Remove total from UI if cart is empty
      if (this.props.user.booksInCart < 1) {
        this.setState({
          showTotal: false
        });
        // Calculate price again after selected book is removed
      } else {
        this.calculateTotalPrice(this.props.user.booksInCart);
      }
    });
  };
  render() {
    return (
      <UserLayout>
        <div>
          <div>
            <h1 className="cart-headline">Cart </h1>
          </div>
          <div className="user-cart">
            <CartItem
              user={this.props.user}
              removeBookFromCart={(bookId, userId) =>
                this.removeBookFromCart(bookId, userId)
              }
            />
            {this.state.showTotal ? (
              <div>
                <div className="user-cart-total">
                  <div style={{ left: "50px" }}>
                    Total Price: {this.state.totalPrice}$
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
