import React from "react";
import Card from "./Card";

const ShopCards = props => {
  const loadCards = () =>
    props.list
      ? props.list.map(card => (
          <Card key={card._id} {...card} grid={props.grid} />
        ))
      : null;

  return (
    <div className="card-block-shop">
      <div>
        <div>
          {props.list ? (
            props.list.length === 0 ? (
              <div className="nothing-found">Error</div>
            ) : null
          ) : null}
          {loadCards(props.list)}
        </div>
      </div>
    </div>
  );
};

export default ShopCards;
