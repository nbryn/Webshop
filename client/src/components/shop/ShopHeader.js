import React, { Component } from "react";

const ShopHeader = props => {
  return (
    <div className="shop-header">
      <div className="container" />
      {props.title}
    </div>
  );
};

export default ShopHeader;
