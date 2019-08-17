import React from "react";

const ShopHeader = props => {
  return (
    <div className="shop-header">
      <div className="shop-title">{props.title}</div>
    </div>
  );
};

export default ShopHeader;
