import React, { useEffect, useState } from 'react';
import i18n from '../../i18n';
import { Publication } from '../../services';
import { Apis } from '../../services/Api/config';
// import { Link } from 'react-router-dom'
const Banner = (props) => {
  
   
    return (
        <div class="banner">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="banner__pic">
                            <img src="/img/banner/banner-1.jpg" alt=""/>
                        </div>
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="banner__pic">
                            <img src="/img/banner/banner-2.jpg" alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Banner;