import React, { useEffect, useState } from 'react';
import i18n from '../../i18n';
import { Publication } from '../../services';
import { Apis } from '../../services/Api/config';
// import { Link } from 'react-router-dom'
const Adverts = () => {
    const [pub, setpub] = useState([])

    const getlist = async (type) => {
        var list = await Publication.publicationsIndex(type)
        //console.log(list.data)
        if (list) { setpub(list.data) }
    }
    useEffect(() => {
        getlist("adverts")
    }, []
    )

    return (

        <div id="shopify-section-template--14270126194751__1645186132b9355fa7" className="shopify-section spaced-section">
            <div data-section-id="template--14270126194751__1645186132b9355fa7" className="imgbnr">
                <div className="row rless">
                    {
                        pub.map((e) => {

                            return (
                                <div className="col-sm-4 col-12 cless">
                                    <div className="beffect">
                                        <a href="/products">
                                            <img loading="lazy" src={Apis.pub + e.image} alt="" className="img-fluid mx-auto" width="470" height="280" />
                                        </a>
                                    </div>
                                    <div className="imgtext">
                                        <div className="imgff">

                                            <h2>{e.title}</h2>
                                            <h5>{e.description}</h5>
                                            <a href="/products" className="btn btn-primary">{i18n.t('shop now')}
                                                <svg viewBox="0 0 14 10" fill="none" aria-hidden="true" focusable="false" role="presentation" className="icon icon-arrow" >
                                                    <path full-rule="evenodd" clipRule="evenodd" d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z" fill="currentColor" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </div>


    )

}

export default Adverts;