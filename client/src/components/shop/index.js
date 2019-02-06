import React, { Component } from "react";
import ShopHeader from "./ShopHeader";
import FilterCheckbox from "./FilterCheckbox";
import { getBooks } from "../../actions/bookActions";
import { getAuthors } from "../../actions/authorActions";
import { getGenres } from "../../actions/genreActions";
import { connect } from "react-redux";

class Shop extends Component {
  state = {
    grid: "",
    max: 6,
    skip: 0,
    filters: {
      genre: [],
      author: []
    }
  };

  componentDidMount() {
    this.props.dispatch(getAuthors());
    this.props.dispatch(getGenres());

    this.props.dispatch(
      getBooks(this.state.max, this.state.skip, this.state.filters)
    );
  }

  // Apply filters -
  handleFilters = (category, filters) => {
    let newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    this.showFilteredData(newFilters);
    this.setState({
      filters: newFilters
    });
  };

  // Show results after filter
  showFilteredData = filters => {
    this.props.dispatch(getBooks(this.state.max, 0, filters)).then(() => {
      this.setState({
        skip: 0
      });
    });
  };

  render() {
    let authors = this.props.authors.authorData;
    let genres = this.props.genres.genreData;
    return (
      <div>
        <ShopHeader title="Books" />

        <div className="container">
          <div className="shop-wrapper">
            <div className="left">
              <FilterCheckbox
                title="Genres"
                list={authors}
                handleFilters={filters => this.handleFilters("genres", filters)}
              />

              <FilterCheckbox
                title="Authors"
                list={genres}
                handleFilters={filters =>
                  this.handleFilters("authors", filters)
                }
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
    authors: state.authors,
    genres: state.genres
  };
};

export default connect(mapStateToProps)(Shop);
