import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "./Slider";

class index extends Component {
  render() {
    return (
      <div>
        <Slider />
      </div>
    );
  }
}
export default connect(mapStateToProps)(Home);
