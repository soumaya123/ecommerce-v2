import React from 'react';
import Slider from "react-slick";
import { Apis } from '../../services/Api/config';
import i18n from '../../i18n';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import "./style.css"
const TopCategories = (props) => {
    // const [categories, setcategories] = useState(props.list)
    // const getlist = async () => {
    //     var list = await GetCategories.getTopCategory()

    //     //console.log('helleleoe',(list.data))
    //     if (list) { setcategories(list.data) }
    // }
  
   
    const settings2 = {
        className:" owl-cat",
        touchThreshold:5,
        useCSS:!0,
        //rtl: false,
        accessibility:!0,
        adaptiveHeight:!1,
        arrows:!0,
        asNavFor:null,
        autoplay:!1,
        autoplaySpeed:3e3,
        centerMode:!1,
        //centerPadding:"50px",
        cssEase:"ease",
        dots:!1,
        //dotsClass:"slick-dots",
        draggable:!0,
        easing:"linear",
        edgeFriction:.35,
        fade:!1,
        focusOnSelect:!1,
        focusOnChange:!1,
        initialSlide:0,
        lazyLoad:"ondemand",
        mobileFirst:!1,
        pauseOnHover:!0,
        pauseOnFocus:!0,
        pauseOnDotsHover:!1,
        respondTo:"window",
        //responsive:null,
        // rows:1,
        //rtl:!1,
        slide:"",
        slidesPerRow:1,
        //slidesToShow:1,
        //slidesToScroll:1,
        //swipe:!0,
        //swipeToSlide:!1,
        //touchMove:!0,
        useTransform:!0,
        variableWidth:!1,
        vertical:!1,
        verticalSwiping:!1,
        waitForAnimate:!0,
        //dots: false,
        //arrows: true,
        infinite:!0,        //autoplay: false,
        //autoplaySpeed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
        {
            breakpoint: 1410,
            settings: {
                infinite:!0,
                slidesToShow: 4
            }
        },
        {
            breakpoint: 1200,
            settings: {
                infinite:!0,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 992,
            settings: {
                infinite:!0,
                slidesToShow: 3
            }
        },
        {
            breakpoint: 576,
            settings: {
                infinite:!0,
                slidesToShow: 2
            }
        } 
        ],
        prevArrow: <button class="slick-prev slick-arrow slick-disabled" aria-label="Previous" type="button" aria-disabled="true" ><i class="fa fa-angle-left"></i></button>,
        nextArrow: <button class="slick-next slick-arrow" aria-label="Next" type="button" aria-disabled="false"><i class="fa fa-angle-right"></i></button>

    };
   



    return (

        <div id="shopify-section-template--14270126194751__1644812326b878e99b" class="shopify-section spaced-section">
            <div class="wbhomecat">
                <h2 class="heading text-center"><span>{i18n.t('Top Category')}</span></h2>
               
                    <div className="rless">
                            
                            <Slider className='owl-cat' {...settings2} >
                            {
                                props.list.filter(e=>e.status_category===1).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).map((e) => {

                                    return (
                                    
                                        <div class="cless col-12 " style={{paddingLeft:"20px",paddingRight:"20px"}} key={e.id}>
                                            <Link  to={{
                                                pathname: "/by-category",
                                                state: { cat:e, entity:'category' }}}>

                                                <div class="homecatb">

                                                    <img loading="lazy" class="img-fluid mx-auto" src={Apis.slug+e.image} alt=""width="150" height="150" />

                                                    <div class="homecatbsub">
                                                        <h2><span>{e.name}</span></h2>

                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                                       
                                        
                                        )
                                    })
                                }
                            </Slider>
                    </div>
              
            </div>
        </div>
    )

}

export default TopCategories;