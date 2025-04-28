import React from 'react';
import { Formik } from "formik";
import * as Yup from "yup";
import { GetUser } from '../../services';
import { Link } from 'react-router-dom'
import i18n from '../../i18n';
const SignupSchema = Yup.object().shape({
   
    password: Yup.string()
        .min(2, i18n.t("password is Too Short!"))
        .required(i18n.t("password is Required")),
    confirmpassword: Yup.string()
        .required(i18n.t("password is Required")),
   
});
const ResetPassword = () => {

    const handlSubmit = async (values) => {
        console.log(values)
        if(values.password===values.confirmpassword){
            var adding = await GetUser.userRegister(values)
            if (adding) {
                window.location.href = "/login";
    
            }
        }
       

    };
    return (
        <>

            <div className="">
                <nav className="breadcrumb row" role="navigation" aria-label="breadcrumbs">
                    <div className="col-12">
                        <Link href="/" title="Home">{i18n.t('home')}</Link>
                        <span aria-hidden="true"><i className="fa fa-angle-right"></i></span>
                        <span>{i18n.t('Reset your password')}</span>
                    </div>
                </nav>
            </div>
            <div className="">
                <div className="row justify-content-center">
                    <div className="customer register col-md-6 col-12">
                        <div className="">
                            <svg style={{ display: "none" }}>
                                <symbol id="icon-error" viewBox="0 0 13 13">
                                    <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2" />
                                    <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7" />
                                    <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white" />
                                    <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7" />
                                </symbol>
                            </svg>
                            <h1 className="heading text-center">
                                <span>{i18n.t('Reset your password')}</span>
                            </h1>
                            <Formik
                                initialValues={{
                                   
                                    password: "",
                                    confirmpassword:""
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
                                        isSubmitting,
                                        touched,
                                        values
                                    }) => {
                                        // console.log(errors);
                                        return (
                                            <form onSubmit={handleSubmit}>
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
                                                    <label for="RegisterForm-password">
                                                        {i18n.t('password')}
                                                    </label>
                                                </div>
                                                { touched.password&&errors.password?(<span id="RegisterForm-email-error" class="form__message">
                                                    <svg aria-hidden="true" focusable="false" role="presentation">
                                                        <use href="#icon-error"></use>
                                                    </svg>
                                                    {errors.password}
                                                </span>):null}
                                                <div className="field">
                                                    <input
                                                        type="password"
                                                        name="confirmpassword"
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        value={values.confirmpassword}
                                                        id="RegisterForm-password"
                                                        // aria-required="true"
                                                        placeholder={i18n.t('Confirm Password')}
                                                        errors={errors.confirmpassword}
                                                        touched={touched.confirmpassword?.toString()}

                                                    />
                                                    <label for="RegisterForm-password">
                                                        {i18n.t('Confirm Password')}
                                                    </label>
                                                </div>
                                                { touched.password&&errors.password?(<span id="RegisterForm-email-error" class="form__message">
                                                    <svg aria-hidden="true" focusable="false" role="presentation">
                                                        <use href="#icon-error"></use>
                                                    </svg>
                                                    {errors.password}
                                                </span>):null}
                                                <button type="submit" >
                                                    {i18n.t('create')}
                                                </button>
                                            </form>)
                                    }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default ResetPassword;