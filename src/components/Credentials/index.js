import React, { useEffect, useState } from "react";
import { Brands } from "../../services";
import { Apis } from "../../services/Api/config";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Credentials = () => {
  const [brands, setbrands] = useState([]);
  
  const getlist = async () => {
    var list = await Brands.getAllBrands();
    if (list) setbrands(list.data);
  };
  
  useEffect(() => {
    getlist();
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1410,
        settings: {
          slidesToShow: 7
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3
        }
      }
    ]
  };

  return (
    <div id="shopify-section-logo-bar" className="shopify-section spaced-section">
      <div className="container">
        <div className="wblogos">
          <Slider {...settings}>
            {brands.map((brand, index) => (
              <div key={index} className="col-12 cless">
                <a href="/">
                  <img
                    loading="lazy"
                    src={Apis.brand + brand?.image}
                    className="logo-bar__image img-fluid mx-auto"
                    alt=""
                    width="225"
                    height="150"
                  />
                </a>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Credentials;
