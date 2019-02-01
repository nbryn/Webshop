import React, { Component } from "react";
import { connect } from "react-redux";
import Slides from "./Slides";

class Home extends Component {
  render() {
    return (
      <div>
        <Slides />
      </div>
    );
  }
}
export default Home;
