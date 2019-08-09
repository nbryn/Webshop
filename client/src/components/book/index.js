import React, { Component } from "react";
import ShopHeader from "../shop/ShopHeader";
import { connect } from "react-redux";
import { getBookDetails, clearBookDetails } from "../../actions/BookActions";
import BookInfo from "./BookInfo";
import SideBar from "../user/SideBar";

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
    const authenticated = (
      <div>
        <ShopHeader title="Book Details" />
        <SideBar />
        <div className="container">
          {this.props.books.bookDetails ? (
            <div className="book_detail_wrapper">
              <div className="right">
                <BookInfo
                  //Pass book and user details to child component
                  bookDetails={this.props.books.bookDetails}
                  userInfo={this.props.user.userData}
                />
              </div>
            </div>
          ) : (
            <h2 className="wait">"Please wait"</h2>
          )}
        </div>
      </div>
    );
    const notAuthenticated = (
      <div>
        <ShopHeader title="Book Details" />

        <div className="container">
          {this.props.books.bookDetails ? (
            <div className="book_detail_wrapper">
              <div className="right">
                <BookInfo
                  //Pass book and user details to child component
                  bookDetails={this.props.books.bookDetails}
                  userInfo={this.props.user.userData}
                />
              </div>
            </div>
          ) : (
            "Please wait"
          )}
        </div>
      </div>
    );

    let bookInfoLayout;

    if (localStorage.getItem("jwtToken")) {
      bookInfoLayout = authenticated;
    } else {
      bookInfoLayout = notAuthenticated;
    }

    return <div>{bookInfoLayout}</div>;
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    user: state.user
  };
};

export default connect(mapStateToProps)(BookDetails);
