import React, { Component } from "react";
import ShopHeader from "../shop/ShopHeader";
import { connect } from "react-redux";
import { getBookDetails, clearBookDetails } from "../../actions/BookActions";
import BookInfo from "./BookInfo";

class BookDetails extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.dispatch(getBookDetails(id)).then(() => {
      //If book ID does not exist -> Push user to home
      if (!this.props.books.bookDetails) {
        this.props.history.push("/");
      }
    });
  }

  componentWillUnmount() {
    //Clear Details when unmounting -> So user can view info of other books
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
                  //Pass book and user details to child component
                  bookDetails={this.props.books.bookDetails}
                  userInfo={this.props.user.userData}
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
    books: state.books,
    user: state.user
  };
};

export default connect(mapStateToProps)(BookDetails);
