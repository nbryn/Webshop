import React, { Component } from "react";
import Slide from "./Slide";

class Home extends Component {
  render() {
    return (
      <div className="fill">
        <h3 className="welcome-text">Welcome!</h3>
        <Slide />
      </div>
    );
  }
}
export default Home;
