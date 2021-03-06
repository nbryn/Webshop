import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class Slide extends Component {
  render() {
    const offers = [
      {
        title: "Clean Code",
        img: "/images/CleanCode.jpg",
        line1: "Write Clean Code",
        line2: "Get It Now!"
      },
      {
        title: "Discrete Math",
        img: "/images/Discrete.jpg",
        line1: "Learn Discrete Math",
        line2: "Get It Now!"
      }
    ];

    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      arrows: false
    };

    const generateSlides = () =>
      offers
        ? offers.map((slide, counter) => (
            <div key={counter}>
              <div
                className="offer-image"
                style={{
                  background: `url(${slide.img})`,
                  height: `${window.innerHeight}px`
                }}
              >
                <div className="offer-button">
                  <div className="tag title">{slide.line1}</div>
                  <div className="tag low-title">{slide.line2}</div>
                  <button type="button" className="btn btn-info btn-lg">
                    <Link to="/shop">Go To Shop</Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        : null;

    return (
      <div className="offer-container">
        <Slider {...settings}>{generateSlides()}</Slider>
      </div>
    );
  }
}

export default Slide;
