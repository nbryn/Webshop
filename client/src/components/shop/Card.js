import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Card extends Component {
  render() {
    const props = this.props;
    return (
      <div className={`card-item-wrapper ${props.grid}`}>
        <div className="card image">
          <img src="/images/NotA.jpg" />
        </div>

        <div className="card info">
          <div className="tags">
            <div className="author">{props.author.fullName} </div>
            <div className="title">{props.title}</div>
            <div className="price">{props.price}$</div>
          </div>
          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}

          <div className="button view-product">
            <Link to={`/book_details/${props._id}`}>
              <input
                className="btn btn-secondary btn-sm"
                type="button"
                value="INFO"
              />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Card);
