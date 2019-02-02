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
    return (
      <div>
        <Top title="Products" />

        <div className="container">
          <div className="shop_wrapper">
            <div classname="left">left</div>

            <FilterCheckbox
              initialState={true}
              title="Genres"
              list={this.props.genres}
              handleFilters={filters => this.handleFilters(filters, "genre")}
            />

            <div className="right">right</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres,
    authors: state.authors
  };
};

export default connect(mapStateToProps)(Shop);
