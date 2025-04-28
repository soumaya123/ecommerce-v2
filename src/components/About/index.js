import React from 'react';
import i18n from '../../i18n';
// import { Link } from 'react-router-dom'
const About = () => {

    return (
        <>
            <div className="">
                <nav className="breadcrumb row" role="navigation" aria-label="breadcrumbs">
                    <div className="col-12">
                        <a href="/" title="Home">{i18n.t('home')}</a>
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        <span>{i18n.t('about us')} </span>

                    </div>
                </nav>
            </div>

            <section id="shopify-section-template--14270126325823__main" className="shopify-section">
                <div className="">
                    <h1 className="heading text-left"><span>{i18n.t('about us')} </span></h1>
                    <div className="rte">
                        <p>Une plateforme e-commerce est une solution logicielle de bout en bout qui permet aux détaillants en ligne de gérer notre entreprise. Ce type de service englobe les créateurs de sites Web de commerce électronique, les systèmes de comptabilité et de gestion des stocks, ainsi que l'infrastructure du service client.</p>
                    </div>
                </div>


            </section>
        </>
    )

}

export default About;