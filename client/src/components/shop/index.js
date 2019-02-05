import React, { Component } from "react";
import Top from "./Top";
import FilterCheckbox from "./FilterCheckbox";

import { getAuthors } from "../../actions/authorActions";
import { getGenres } from "../../actions/genreActions";
import { connect } from "react-redux";

class Shop extends Component {
  state = {
    grid: "",
    limit: 6,
    skip: 0,
    filters: {
      genre: [],
      author: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getAuthors());
    this.props.dispatch(getGenres());
  }

  // Apply filters -
  handleFilters = () => {
    let newFilters = { ...this.state.filters };

    this.setState({
      filters: newFilters
    });
  };

  // Show results after filter
  filteredResults = () => {};

  render() {
    let books = this.props.books;
    return (
      <div>
        <Top title="Books" />

        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <FilterCheckbox
                title="Genres"
                list={books.genres}
                handleFilters={filters => this.handleFilters()}
              />

              <FilterCheckbox
                title="Authors"
                list={books.authors}
                handleFilters={filters => this.handleFilters()}
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
    books: state.books
  };
};

export default connect(mapStateToProps)(Shop);
