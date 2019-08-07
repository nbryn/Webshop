import React, { Component } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";

class Slides extends Component {
  render() {
    let offers = [
      {
        title: "Clean Code",
        img: "/images/CleanCode.jpg",
        line1: "Code Clean",
        line2: "Get It Now!"
      },
      {
        title: "Clean Code",
        img: "/images/CleanCode.jpg",
        line1: "Code Clean",
        line2: "Get It Now!"
      }
    ];

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      arrows: false
    };

    let generateSlides = () =>
      offers
        ? offers.map((slide, counter) => (
            <div key={counter}>
              <div
                className="offer_image"
                style={{
                  background: `url(${slide.img})`,
                  height: `${window.innerHeight}px`
                }}
              >
                <div className="offer_button">
                  <div className="tag title">{slide.line1}</div>
                  <div className="tag low_title">{slide.line2}</div>
                  <button type="button" className="btn btn-info btn-lg">
                    <Link to="/shop">Go To Shop!</Link>
                  </button>
                </div>
              </div>
            </div>
          ))
        : null;

    return (
      <div className="offer_container">
        <Slider {...settings}>{generateSlides()}</Slider>
      </div>
    );
  }
}

export default Slides;
