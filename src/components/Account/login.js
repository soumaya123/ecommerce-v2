import React from 'react';
import { Link } from 'react-router-dom'
import { GetUser } from '../../services';
import { Formik } from "formik";
import * as Yup from "yup";
import i18n from '../../i18n';

const SignupSchema = Yup.object().shape({


    email: Yup.string().email(i18n.t("Invalid Email")).required(i18n.t("Email is Required")),
    password: Yup.string()
        .min(2, i18n.t("password is Too Short!"))
        .required(i18n.t("password is Required")),
})
const Login = () => {

    const handlSubmit = async (values) => {
        //console.log("okkkkkkks",values)
        let user = await GetUser.UserLogin(values);
        console.log("list herr", user)
        if (user) {
            GetUser.authenticate(user, () => {

                setTimeout(
                    function () {
                        window.location.href = "/profile";
                    },
                    1000
                );
            })
        }
    }
    const forgetPassword = async (values) => {

        console.log("okkkkkkks",values)
        let user = await GetUser.forgotPassword(values);
        console.log("list herr", user)
        // if (user) {
        //     GetUser.authenticate(user, () => {

        //         setTimeout(
        //             function () {
        //                 window.location.href = "/profile";
        //             },
        //             1000
        //         );
        //     })
        // }
    }

    return (
        <>

            <div className="">
                <nav className="breadcrumb row" role="navigation" aria-label="breadcrumbs">
                    <div className="col-12">
                        <Link to="/" title="Home">{i18n.t("home")}</Link>
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        <span>{i18n.t('account')}</span>
                    </div>
                </nav>
            </div>
            <div className="customer login">
                <div className="">
                    <h1 className="heading text-left"><span>{i18n.t('already Registered?')}</span></h1>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="wbpagereg">
                                <h2 className="custheading">{i18n.t('new Customer')}</h2>
                                <p>{i18n.t('By creating an account you will be able to shop faster, be up to date on an order&#39;s status, and keep track of the orders you have previously made')}.</p>
                                <Link to="/register" className="btn btn-primary">
                                    {i18n.t('create account')}
                                </Link>
                            </div>
                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="wbpagereg">
                                <h2 className="custheading" id="recover" tabindex="-1">{i18n.t('Reset your password')}</h2>
                                <div>
                                    <p>{i18n.t('We will send you an email to reset your password')}</p>
                                    <Formik
                                        initialValues={{

                                            email: "",
                                        }}
                                        validationSchema={SignupSchema}
                                        onSubmit={(values) => {

                                            forgetPassword(values)

                                        }}
                                    >
                                        {
                                            ({
                                                errors,
                                                handleBlur,
                                                handleChange,
                                                handleSubmit,
                                                isSubmitting,
                                                touched,
                                                values
                                            }) => {
                                                return (
                                                   <>
                                                        <div className="field">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.email}
                                                                    id="RegisterForm-email"
                                                                    autocomplete="email"
                                                                    // aria-required="true"
                                                                    errors={errors.email}
                                                                    touched={touched.email?.toString()}
                                                                    placeholder={i18n.t('email')} />

                                                                <label for="CustomerEmail">
                                                                    {i18n.t('email')}
                                                                </label>
                                                            </div>
                                                            {touched.email && errors.email ? (<span id="RegisterForm-email-error" class="form__message">
                                                                <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                                                                    <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                                                                    <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                                                                    <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                                                                    <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                                                                    </path>
                                                                </svg>
                                                                {errors.email}
                                                            </span>) : null}
                                                        <button onClick={() => forgetPassword(values)}>{i18n.t('Submit')}</button>

                                                        <a href="#login" className="btn btn-primary wblogcancel" style={{ marginLeft: "5px" }}>{i18n.t('cancel')}</a>
                                                    </>
                                                )
                                            }
                                        }
                                    </Formik>

                                </div>

                                <h2 className="custheading" id="login" tabindex="-1">{i18n.t('Login')}</h2>

                                <Formik
                                    initialValues={{

                                        email: "",

                                        password: "",
                                    }}
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
                                            isSubmitting,
                                            touched,
                                            values
                                        }) => {
                                            // console.log(errors);
                                            return (
                                                <div>
                                                    <form onSubmit={handleSubmit}  >
                                                        <div>
                                                            <p>{i18n.t('If you have an account, please log in')}.</p>

                                                            <input type="hidden" name="form_type" value="customer_login" />
                                                            <input type="hidden" name="utf8" value="✓" />
                                                            <div className="field">
                                                                <input
                                                                    type="email"
                                                                    name="email"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.email}
                                                                    id="RegisterForm-email"
                                                                    autocomplete="email"
                                                                    // aria-required="true"
                                                                    errors={errors.email}
                                                                    touched={touched.email?.toString()}
                                                                    placeholder={i18n.t('email')} />

                                                                <label for="CustomerEmail">
                                                                    {i18n.t('email')}
                                                                </label>
                                                            </div>
                                                            {touched.email && errors.email ? (<span id="RegisterForm-email-error" class="form__message">
                                                                <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                                                                    <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                                                                    <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                                                                    <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                                                                    <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                                                                    </path>
                                                                </svg>
                                                                {errors.email}
                                                            </span>) : null}
                                                            <div className="field">
                                                                <input
                                                                    type="password"
                                                                    name="password"
                                                                    onChange={handleChange}
                                                                    onBlur={handleBlur}
                                                                    value={values.password}
                                                                    id="RegisterForm-password"
                                                                    // aria-required="true"
                                                                    placeholder={i18n.t('password')}
                                                                    errors={errors.password}
                                                                    touched={touched.password?.toString()}
                                                                />
                                                                <label for="CustomerPassword">
                                                                    {i18n.t('password')}
                                                                </label>
                                                            </div>
                                                            {touched.password && errors.password ? (<span id="RegisterForm-email-error" class="form__message">
                                                                <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                                                                    <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                                                                    <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                                                                    <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                                                                    <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7">
                                                                    </path>
                                                                </svg>
                                                                {errors.password}
                                                            </span>) : null}
                                                            <a href="#recover" className="text-right">
                                                                {i18n.t('Forgot your password?')}
                                                            </a>
                                                            <button onClick={() => Login()}>{i18n.t('sign in')}</button>

                                                        </div>
                                                    </form>
                                                </div>
                                            )
                                        }}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default Login;