import React from "react";
import Card from "./Card";

const ShowCard = props => {
  const loadCards = () =>
    props.books
      ? props.books.map(card => (
          <Card key={card._id} {...card} grid={props.grid} />
        ))
      : null;

  return (
    <div className="card shop">
      {props.books ? (
        props.books.length === 0 ? (
          <div className="nothing-found">Error</div>
        ) : null
      ) : null}
      {loadCards(props.books)}
    </div>
  );
};

export default ShowCard;
