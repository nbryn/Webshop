import React, { Component } from "react";
import { connect } from "react-redux";

class Card extends Component {
  showCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "../../images/background.jpg";
    }
  }

  render() {
    const props = this.props;
    return (
      <div className={`card-item-wrapper ${props.grid}`}>
        <div
          className="card image"
          style={{
            background: `url(${this.showCardImage(props.images)}) no-repeat`
          }}
        />

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
            <input
              className="btn btn-secondary btn-sm"
              type="button"
              value="View Product"
            />
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
