import React, { Component } from "react";
import ShopHeader from "./ShopHeader";
import ShowCard from "./ShowCard";
import SideBar from "../user/SideBar";
import { getBooks } from "../../actions/BookActions";
import { connect } from "react-redux";

class Shop extends Component {
  state = {
    grid: "",
    max: 6,
    skip: 0
  };

  componentDidMount() {
    this.props.dispatch(getBooks(this.state.max, this.state.skip));
  }

  render() {
    let books = this.props.books;

    const authenticated = (
      <div>
        <ShopHeader title="Books" />
        <SideBar />

        <div className="container">
          <div className="shop-wrapper">
            <div className="right">
              <div className="shop-options">
                <div className="shop-grids clear" />
              </div>
              <div>
                <ShowCard books={books.bookArray} grid={this.state.grid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    const notAuthenticated = (
      <div>
        <ShopHeader title="Books" />

        <div className="container">
          <div className="shop-wrapper">
            <div className="right">
              <div className="shop-options">
                <div className="shop-grids clear" />
              </div>
              <div>
                <ShowCard books={books.bookArray} grid={this.state.grid} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    let shopLayout;

    if (localStorage.getItem("jwtToken")) {
      shopLayout = authenticated;
    } else {
      shopLayout = notAuthenticated;
    }

    return <div> {shopLayout}</div>;
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(Shop);
