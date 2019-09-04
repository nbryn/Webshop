import React, { Component } from "react";
import ShopHeader from "./ShopHeader";
import ShowCard from "./ShowCard";
import SideBar from "../user/SideBar";
import { getAllBooks } from "../../actions/BookActions";
import { connect } from "react-redux";

class Shop extends Component {
  state = {
    grid: "",
    max: 6,
    skip: 0
  };

  componentDidMount() {
    this.props.dispatch(getAllBooks(this.state.max, this.state.skip));
  }

  render() {
    let books = this.props.books;

    return (
      <div>
        <ShopHeader title="Books" />
        <SideBar />

        <div className="container">
          <div className="shop-wrapper">
            <div className="right" />
            <div>
              <ShowCard books={books.bookArray} grid={this.state.grid} />
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

export default connect(mapStateToProps)(Shop);
