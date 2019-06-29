import React, { Component } from "react";
import { Connect } from "react-redux";
import UserLayout from "./UserLayout";

export default class Cart extends Component {
  render() {
    return (
      <UserLayout>
        <div>cart</div>
      </UserLayout>
    );
  }
}
