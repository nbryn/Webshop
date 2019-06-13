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
              <a className="nav-link" href="#">
                <i className="nav-icon cui-speedometer" /> Shop
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                <i className="nav-icon cui-speedometer" /> Orders
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/shop">
                <i className="nav-icon cui-speedometer" /> Cart
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default SideBar;
