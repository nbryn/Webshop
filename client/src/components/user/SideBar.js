import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideBar extends Component {
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">Menu</li>

            <li className="nav-item">
              <Link className="nav-link" to="/shop">
                <i className="nav-icon cui-speedometer" /> Shop
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/user/cart">
                <i className="nav-icon cui-speedometer" /> Cart
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default SideBar;
