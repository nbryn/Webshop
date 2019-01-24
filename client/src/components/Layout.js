import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="page_container">{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
