import React, { Component } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";

class Layout extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="background">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}

export default Layout;
