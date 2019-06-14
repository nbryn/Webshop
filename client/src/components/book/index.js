import React, { Component } from "react";
import ShopHeader from "../shop/ShopHeader";
import { connect } from "react-redux";
import { getBookDetails, clearBookDetails } from "../../actions/BookActions";

class BookDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getBookDetails(id));
  }

  render() {
    return <div>Books</div>;
  }
}

const mapStateToProps = state => {
  return {
    books: state.books
  };
};

export default connect(mapStateToProps)(BookDetails);
