import React, { Component } from "react";

class Header extends Component {
  render() {
    return (
      <header className="background_light">
        <div className="container">
          <div className="left">
            <div className="logo">BOOK SHOP</div>
          </div>
          <div className="right">
            <div className="top">LINKS</div>
            <div className="bottom">LINKS</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
