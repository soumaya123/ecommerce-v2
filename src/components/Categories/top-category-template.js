import React, { Component } from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom'
import './style.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import i18next from 'i18next';
import Parser from 'html-react-parser';
class TeamSection extends Component {
    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 1200,
            slidesToShow: 1,
            autoplay: true,
            arrows: true,
            margin: 50,
            slidesToScroll: 1,
            centerPadding: 30,
            focusOnSelect: false,

        };
        return (

            <div id="clients-section" className="team-area ptb-100-70">
                <div className="container">
                    <div className="col-l2">
                        <div className="section-title-1  text-center">
                            <span>{i18next.t('client-title-label')}</span>
                            <h2>{i18next.t('client-title-description-label')}</h2>
                        </div>
                    </div>
                    <div className="team-active owl-carousel">
                        <Slider {...settings}>
                            <div className="team-item">
                                <div className="row">
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <a href="/">

                                            <div class="homecatb">

                                                <img loading="lazy" class="img-fluid mx-auto" src="./cdn.shopify.com/s/files/1/0257/0492/3199/collections/5_150x150ee7d.png?v=1575009530" alt="Laptop" />

                                                <div class="homecatbsub">
                                                    <h2><span>{"ekeekke"}</span></h2>

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <a href="/">

                                            <div class="homecatb">

                                                <img loading="lazy" class="img-fluid mx-auto" src="./cdn.shopify.com/s/files/1/0257/0492/3199/collections/5_150x150ee7d.png?v=1575009530" alt="Laptop" />

                                                <div class="homecatbsub">
                                                    <h2><span>{"ekeekke"}</span></h2>

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <a href="/">

                                            <div class="homecatb">

                                                <img loading="lazy" class="img-fluid mx-auto" src="./cdn.shopify.com/s/files/1/0257/0492/3199/collections/5_150x150ee7d.png?v=1575009530" alt="Laptop" />

                                                <div class="homecatbsub">
                                                    <h2><span>{"ekeekke"}</span></h2>

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-12">
                                        <a href="/">

                                            <div class="homecatb">

                                                <img loading="lazy" class="img-fluid mx-auto" src="./cdn.shopify.com/s/files/1/0257/0492/3199/collections/5_150x150ee7d.png?v=1575009530" alt="Laptop" />

                                                <div class="homecatbsub">
                                                    <h2><span>{"ekeekke"}</span></h2>

                                                </div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeamSection;