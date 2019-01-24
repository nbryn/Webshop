import React, { Component } from "react";

import * as Icons from "@fortawesome/fontawesome-free-solid";

export default class Footer extends Component {
  render() {
    return (
      <footer className="background_dark">
        <div className="container">
          <div className="logo">Book Shop</div>
          <div className="wrapper">
            <div className="left">
              <h2>Contact Us</h2>
              <div className="info" />
              <div className="tag">
                <div icon={Icons.faCompass} className="icon" />
                <div className="nfo">
                  <div>Adress HERE</div>
                  <div>123</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
