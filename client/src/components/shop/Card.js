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
      <div className={`card_item_wrapper ${props.grid}`}>
        <div
          className="image"
          style={{
            background: `url(${this.showCardImage(props.images)}) no-repeat`
          }}
        />

        <div className="action-container">
          <div className="tags">
            <div className="author"> </div>
            <div className="genre">{props.genre.name} </div>
            <div className="title">{props.title}</div>
            <div className="price">{props.price}</div>
          </div>
          {props.grid ? (
            <div className="description">
              <p>{props.description}</p>
            </div>
          ) : null}
          <div className="actions">
            <div className="button_wrapp">
              <button type="button" className="btn btn-secondary" />
            </div>
            <div className="button_wrapp" />
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
