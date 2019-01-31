import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {
  state = {
    page: [
      {
        name: "Home",
        linkTo: "/",
        public: true
      },
      {
        name: "Books",
        linkTo: "/shop",
        public: true
      }
    ],
    user: [
      {
        name: "Sign In",
        linkTo: "/signin",
        public: true
      },
      {
        name: "Sign Out",
        linkTo: "/user/signout",
        public: false
      }
    ]
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/user/dashboard">
          Home
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>

          <a className="navbar-brand" href="/">
            Sign In
          </a>
        </div>
      </nav>
    );
  }
}

export default NavBar;
