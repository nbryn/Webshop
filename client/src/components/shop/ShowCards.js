import React from "react";
import ShopCards from "./ShopCards";

const ShowCards = props => {
  return (
    <div>
      <div>
        <ShopCards list={props.books} grid={props.grid} />
      </div>
    </div>
  );
};

export default ShowCards;
