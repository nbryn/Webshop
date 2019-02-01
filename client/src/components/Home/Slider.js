import React, { Component } from "react";
import Slider from "react-slick";

export default class Promotions extends Component {
  render() {
    let offers = [
      {
        title: "",
        img: "../../img/",
        line1: "",
        line2: ""
      },
      {
        title: "",
        img: "../../img/",
        line1: "",
        line2: ""
      }
    ];

    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true
    };

    let generateSlides = () => {
      slides
        ? slides.map((slide, counter) => {
            <div key={counter}>
              <div
                className="featured_image"
                style={{
                  background: `url(${item.img})`,
                  height: `${window.innerHeight}px`
                }}
              >
                <div className="featured_action">
                  <div className="tag title">{item.line1}</div>
                  <div className="tag low_title">{item.line2}</div>
                  <button type="button" className="btn btn-info">
                    <Link to="/user/user_profile" color="primary">
                      Edit Info
                    </Link>
                  </button>
                </div>
              </div>
            </div>;
          })
        : null;
    };

    return (
      <div className="featured_container">
        <Slider {...settings}>{generateSlides}</Slider>
      </div>
    );
  }
}
