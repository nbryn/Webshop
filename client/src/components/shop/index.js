import React, { Component } from "react";
import ShopHeader from "./ShopHeader";
import ShowCards from "./ShowCards";
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

    return (
      <div>
        <ShopHeader title="Books" />

        <div className="container">
          <div className="shop-wrapper">
            <div className="right">
              <div className="shop-options">
                <div className="shop-grids clear" />
              </div>
              <div>
                <ShowCards
                  books={books.bookArray}
                  size={books.size}
                  grid={this.state.grid}
                  max={this.state.limit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Data from store that this component needs
// Called everytime the store state changes
const mapStateToProps = state => {
  return {
    books: state.books
  };
};

// Connecting component to the Redux store
export default connect(mapStateToProps)(Shop);
