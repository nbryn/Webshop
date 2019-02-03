import React, { Component } from "react";
import Top from "./Top";
import FilterCheckbox from "./FilterCheckbox";

import { getAuthors } from "../../actions/authorActions";
import { getGenres } from "../../actions/genreActions";
import { connect } from "react-redux";

class Shop extends Component {
  componentDidMount() {
    this.props.dispatch(getAuthors());
    this.props.dispatch(getGenres());
  }

  handleFilters = () => {};

  render() {
    let book = this.props.book;
    return (
      <div>
        <Top title="Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <FilterCheckbox
                title="Genres"
                list={book.genres}
                handleFilters={filters => this.handleFilters(filters, "genre")}
              />

              <FilterCheckbox
                title="Authors"
                list={book.authors}
                handleFilters={filters => this.handleFilters(filters, "author")}
              />
            </div>

            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.book
  };
};

export default connect(mapStateToProps)(Shop);
