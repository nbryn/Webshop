import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../actions/userActions";
import PropTypes from "prop-types";

class NavBar extends Component {
  signOut() {
    this.props.signOut();
    window.location.href = "/";
  }

  render() {
    const isAuthenticated = (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/user/dashboard">
          Home
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">
            Books
          </button>
          <a
            className="navbar-brand"
            href="/"
            onClick={this.signOut.bind(this)}
          >
            Sign Out
          </a>
        </div>
      </nav>
    );

    const notAuthenticated = (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          BookShop
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active" />
          </ul>

          <a className="navbar-brand" href="/">
            Sign In
          </a>
        </div>
      </nav>
    );

    let topNavBarLinks;

    // Show different links depending on auth
    if (localStorage.getItem("jwtToken")) {
      topNavBarLinks = isAuthenticated;
    } else {
      topNavBarLinks = notAuthenticated;
    }

    return <div> {topNavBarLinks} </div>;
  }
}

NavBar.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  mapStateToProps,
  { signOut }
)(NavBar);
