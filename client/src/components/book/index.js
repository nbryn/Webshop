import React, { Component } from "react";
import ShopHeader from "../shop/ShopHeader";
import { connect } from "react-redux";
import { getBookDetails, clearBookDetails } from "../../actions/BookActions";
import BookInfo from "./BookInfo";

class BookDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getBookDetails(id));
  }

  componentWillUnmount() {
    //Clear Details when unmounting
    this.props.dispatch(clearBookDetails());
  }

  render() {
    return (
      <div>
        <ShopHeader title="Book Details" />
        <div className="container">
          {this.props.books.bookDetails ? (
            <div className="book_detail_wrapper">
              <div className="left">images</div>
              <div className="right">
                <BookInfo
                  addToCart={id => this.addToCartHandler(id)}
                  //Pass book details to child component
                  bookInfo={this.props.books.bookDetails}
                />
              </div>
            </div>
          ) : (
            "Loading"
          )}
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

export default connect(mapStateToProps)(BookDetails);
