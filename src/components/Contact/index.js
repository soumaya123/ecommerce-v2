import React from 'react';
// import { Link } from 'react-router-dom'
import config from '../config';
import i18n from '../../i18n';
import { Contact } from '../../services';
import { Formik } from 'formik';
import * as Yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignupSchema = Yup.object().shape({
    message: Yup.string()
        .min(2, i18n.t("message Too Short!"))
        .required(i18n.t("message is Required")),
    name: Yup.string()
        .min(2, i18n.t("Name is Too Short!"))
        .required(i18n.t("Name is Required")),

    email: Yup.string().email(("Invalid Email")).required(i18n.t("Email is Required")),
    phone: Yup.string()
        .matches(phoneRegExp, i18n.t("Phone is not valid"))
        .required(i18n.t("Phone is Required")),

});
const ContactUs = () => {
    const handlSubmit = async (values) => {
        console.log("values", values)

        var adding = await Contact.ContactAdd(values)
        console.log(values)
        if (adding) {
            window.location.href = "/";

        }



    };

    return (
        <>
            <div className="">
                <nav className="breadcrumb row" role="navigation" aria-label="breadcrumbs">
                    <div className="col-12">
                        <a href="/" title="Home">{i18n.t('home')}</a>
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        <span>{i18n.t('contact us')}</span>

                    </div>
                </nav>
            </div>
            <section id="shopify-section-template--14270126293055__main" className="shopify-section">
                <div className="">
                    <h1 className="heading text-left">
                        <span>{i18n.t('contact us')}</span>
                    </h1>
                    <div className="rte">

                    </div>
                </div>
            </section>
            <section id="shopify-section-template--14270126293055__form" className="shopify-section">
                <div className=" wbcontform">
                    <div className="row wbcontforminner rless">


                        <ul className="cless col-sm-4 col-12 list-unstyled text-center">
                            <li>
                                <svg viewBox="0 0 512 512.00052" className="icon icon-accordion">
                                    <path d="m379.183594 287.9375c-19.21875 19.242188-49.238282 49.292969-74.375 74.605469-29.878906-19.558594-56.886719-41.140625-78.605469-62.859375-26.820313-26.820313-60.359375-65.007813-78.484375-92.058594 23.011719-22.847656 53.105469-52.902344 75.1875-74.964844l-132.660156-132.660156-66.191406 65-.097657.097656c-18.523437 18.523438-26.367187 43.808594-23.3125 75.152344 9.769531 100.226562 132.332031 245.402344 240.675781 318.113281 62.726563 42.097657 152.886719 81.066407 206.214844 27.734375 38.71875-38.714844 53.519532-54.488281 54.132813-55.140625l9.929687-10.601562zm47.125 176.933594c-40.371094 40.367187-120.433594.660156-168.261719-31.4375-100.539063-67.476563-218.707031-205.671875-227.523437-296.097656-2.140626-21.945313 2.777343-39.09375 14.613281-50.960938l44.917969-44.109375 90.378906 90.382813c-45.835938 45.765624-59.644532 59.40625-70.625 70.277343l5.824218 10.039063c17.6875 30.46875 58.710938 77.316406 89.34375 107.949218 33.601563 33.601563 68.09375 57.324219 104.160157 79.898438l8.449219-8.527344c18.539062-18.707031 45.480468-45.71875 61.609374-61.875l90.503907 90.503906c-8.382813 8.652344-22.386719 22.949219-43.390625 43.957032zm0 0"></path>
                                </svg>
                            </li>
                            <li>
                                <h4>{i18n.t("call-us")}</h4>
                                <p>{config.tel}</p>
                            </li>
                        </ul>



                        <ul className="cless col-sm-4 col-12 list-unstyled text-center">
                            <li>
                                <svg viewBox="0 0 512 512" className="icon icon-accordion">
                                    <path d="M256,0C150.112,0,64,86.112,64,192c0,133.088,173.312,307.936,180.672,315.328C247.808,510.432,251.904,512,256,512
                                        s8.192-1.568,11.328-4.672C274.688,499.936,448,325.088,448,192C448,86.112,361.888,0,256,0z M256,472.864
                                        C217.792,431.968,96,293.664,96,192c0-88.224,71.776-160,160-160s160,71.776,160,160C416,293.568,294.208,431.968,256,472.864z"></path>
                                    <path d="M256,96c-52.928,0-96,43.072-96,96s43.072,96,96,96c52.928,0,96-43.072,96-96C352,139.072,308.928,96,256,96z M256,256
                                    c-35.296,0-64-28.704-64-64s28.704-64,64-64s64,28.704,64,64S291.296,256,256,256z"></path>
                                </svg></li>
                            <li>
                                <h4>{i18n.t('location')}</h4>
                                <p> {config.addresse1}, <br /></p>
                            </li>
                        </ul>


                        <ul className="cless col-sm-4 col-12 list-unstyled text-center">
                            <li><svg viewBox="0 0 512 512" className="icon icon-accordion">
                                <path d="m494.2,488c0,0 0-225.8 0-301 0-3.1-3.9-7-7.7-9.9l-78.7-57.1v-63.1c0-6.2-5.2-10.4-10.4-10.4h-89.7l-45.7-33.3c-3.1-2.1-8.3-2.1-11.5,0l-45.7,33.3h-89.7c-6.2,0-10.4,5.2-10.4,10.4v62.4l-79.7,57.9c-4.7,2.9-7.7,6.7-7.7,9.9 0,75.7 0,303 0,303 0,5.9 4.7,10 9.6,10.4 0.3,0 0.5,0 0.8,0h456c6.7-0.1 10.5-5.3 10.5-12.5zm-19.8-282.3v263.6l-172.1-137.8 172.1-125.8zm-7.7-18.3l-58.9,42.9v-86.2l58.9,43.3zm-210.9-154.5l18.3,13.5h-36.7l18.4-13.5zm131.2,34.4v178.2l-131.2,95.6-131.2-95.6v-178.2h262.4zm-349.8,138.4l172.1,125.8-172.1,138.6v-264.4zm67.6,25.4l-60.4-44 60.4-43.9v87.9zm-48.9,249.5l170.1-136.9 23.5,17.2c4.5,3.4 7.9,3.4 12.5,0l23.5-17.2 171.1,136.9h-400.7z"></path>
                                <rect width="140.5" x="186.1" y="118.3" height="19.8"></rect>
                                <rect width="140.5" x="186.1" y="181.8" height="19.8"></rect>
                                <rect width="140.5" x="186.1" y="245.3" height="19.8"></rect>
                            </svg></li>
                            <li>
                                <h4>{i18n.t('email')}</h4>
                                <p>{config.email}</p>
                            </li>
                        </ul>


                    </div>
                    <div className="row">
                        <svg style={{ display: "none" }}>
                            <symbol id="icon-error" viewBox="0 0 13 13">
                                <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2" />
                                <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7" />
                                <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white" />
                                <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7" />
                            </symbol>
                        </svg>
                        <div className="contact col-lg-6 col-12">
                            <Formik
                                initialValues={{
                                    name: "",
                                    email: "",
                                    phone: "",
                                    message: ""
                                }}
                                /*   onSubmit={(values, { setSubmitting }) => {
                                        this.submitForm(values);
                                        setSubmitting(false);
                                    }} */
                                validationSchema={SignupSchema}
                                onSubmit={(values) => {

                                    handlSubmit(values)

                                }}
                            >
                                {
                                    ({
                                        errors,
                                        handleBlur,
                                        handleChange,
                                        handleSubmit,
                                        touched,
                                        values
                                    }) => {
                                        // console.log(errors);
                                        return (
                                            <form onSubmit={handleSubmit}>
                                                <input type="hidden" name="form_type" value="contact" />
                                                <input type="hidden" name="utf8" value="✓" />
                                                <div className="contact__fields">
                                                    <div className="field">
                                                        <input className="field__input" autoComplete="name" type="text" name="name" placeholder="Name" onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.name} />
                                                        <label className="field__label" htmlFor="ContactForm-name">{i18n.t("name")}</label>
                                                    </div>
                                                    {touched.name && errors.name ? (<span id="RegisterForm-email-error" class="form__message">
                                                        <svg aria-hidden="true" focusable="false" role="presentation">
                                                            <use href="#icon-error"></use>
                                                        </svg>
                                                        {errors.name}
                                                    </span>) : null}
                                                    <div className="field field--with-error">
                                                        <input
                                                            autoComplete="email"
                                                            type="email"
                                                            className="field__input"
                                                            spellCheck="false"
                                                            autoCapitalize="off"
                                                            // value=""
                                                            name='email'
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.email}
                                                            aria-required="true"

                                                            placeholder={i18n.t("email")}
                                                        />
                                                        <label className="field__label" htmlFor="ContactForm-email">{i18n.t("email")} <span aria-hidden="true">*</span></label>
                                                    </div>
                                                    {touched.email && errors.email ? (<span id="RegisterForm-email-error" class="form__message">
                                                        <svg aria-hidden="true" focusable="false" role="presentation">
                                                            <use href="#icon-error"></use>
                                                        </svg>
                                                        {errors.email}
                                                    </span>) : null}
                                                </div>
                                                <div className="field">
                                                    <input type="tel" className="field__input"
                                                        name='phone'
                                                        autoComplete="tel"
                                                        pattern="[0-9\-]*" placeholder="Phone number"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.phone} />
                                                    <label className="field__label" htmlFor="ContactForm-phone">{i18n.t("phone")}</label>
                                                </div>
                                                {touched.phone && errors.phone ? (<span id="RegisterForm-email-error" class="form__message">
                                                    <svg aria-hidden="true" focusable="false" role="presentation">
                                                        <use href="#icon-error"></use>
                                                    </svg>
                                                    {errors.phone}
                                                </span>) : null}
                                                <div className="field">
                                                    <textarea
                                                        rows="10"
                                                        name='message'
                                                        className="text-area field__input"
                                                        placeholder={i18n.t("comment")}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.message}
                                                    ></textarea>
                                                    <label className="form__label field__label" htmlFor="ContactForm-body">{i18n.t("comment")}</label>
                                                </div>
                                                {touched.message && errors.message ? (<span id="RegisterForm-email-error" class="form__message">
                                                    <svg aria-hidden="true" focusable="false" role="presentation">
                                                        <use href="#icon-error"></use>
                                                    </svg>
                                                    {errors.message}
                                                </span>) : null}
                                                <div className="contact__button">
                                                    <button type="submit" className="button">
                                                        {i18n.t("send")}
                                                    </button>
                                                </div>
                                            </form>
                                        )
                                    }}
                            </Formik>
                        </div>
                        <div className="col-lg-6 col-12">

                            <div id="map">
                                <iframe title="contact-maps" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6945530.911197439!2d3.797541478108965!3d31.78759612429457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7e8a6a28037bd1%3A0x7140bee3abd7f8a2!2zQWxnw6lyaWU!5e0!3m2!1sfr!2stn!4v1678116958237!5m2!1sfr!2stn" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0" width="1000" height="450" frameBorder="0">
                                </iframe>
                            </div>

                        </div>
                    </div>
                </div>


            </section>
        </>
    )

}

export default ContactUs;