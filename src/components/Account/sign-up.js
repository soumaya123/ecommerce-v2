import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { GetUser } from "../../services";
import { Link } from "react-router-dom";
import i18n from "../../i18n";
import wilayasData from '../Checkout/wilayas.json'; // Importez vos données de wilayas et communes ici
import communeData from '../Checkout/commune.json'; // Importez vos données de wilayas et communes ici

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, i18n.t("First Name is Too Short!"))
    .required(i18n.t("First Name is Required")),
  last_name: Yup.string()
    .min(2, i18n.t("Last Name is Too Short!"))
    .required(i18n.t("Last Name is Required")),

  email: Yup.string()
    .email("Invalid Email")
    .required(i18n.t("Email is Required")),
  phone: Yup.string()
    .matches(phoneRegExp, i18n.t("Phone is not valid"))
    .required(i18n.t("Phone is Required")),
//   city: Yup.string()
//     .min(2, i18n.t("City is Too Short!"))
//     .max(255, i18n.t("City is Too Long!"))
//     .required(i18n.t("City is Required")),
  password: Yup.string()
    .min(2, i18n.t("password is Too Short!"))
    .required(i18n.t("password is Required")),
  confirmpassword: Yup.string().required(i18n.t("password is Required")),
  address: Yup.string()
    .min(2, i18n.t("address is Too Short!"))
    .max(255, i18n.t("address is Too Long!"))
    .required(i18n.t("address is Required")),
});
const Signup = () => {
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [selectedCommune, setSelectedCommune] = useState('');
    const [communes, setCommunes] = useState([]);
  const handlSubmit = async (values) => {
    let data= {
        ...values,
        wilaya: selectedWilaya?.name,
        commune: selectedCommune?.name,
    }
    console.log(data);
    if (values.password === values.confirmpassword) {
      var adding = await GetUser.userRegister(data);
      if (adding) {
        window.location.href = "/login";
      }
    }
  };
  const handleWilayaChange = (event) => {
    const selectedWilaya = event.target.value;
    setSelectedWilaya(wilayasData.find(e => e.id === selectedWilaya));
    console.log(selectedWilaya)
    // Filtrer les communes correspondantes
    // const wilayaData = wilayasData.find(w => w.wilaya === selectedWilaya);
    const communeList = communeData.filter(e => e.wilaya_id === selectedWilaya);
    // setUser({ ...user, "wilaya": wilayasData.find(e => e.id === selectedWilaya) })
    setCommunes(communeList);

    // Réinitialiser la commune sélectionnée
    //setSelectedCommune('');
    //setUser({ ...user, "commune": "" })
};

const handleCommuneChange = (event) => {
    setSelectedCommune(communeData.find(e => e.id === event.target.value))
    // setUser({ ...user, "commune": communeData.find(e => e.id === event.target.value) })
    setSelectedCommune(communeData.find(e => e.id === event.target.value));
};
  return (
    <>
      <div className="">
        <nav
          className="breadcrumb row"
          role="navigation"
          aria-label="breadcrumbs"
        >
          <div className="col-12">
            <Link href="/" title="Home">
              {i18n.t("home")}
            </Link>
            <span aria-hidden="true">
              <i className="fa fa-angle-right"></i>
            </span>
            <span>{i18n.t("create account")}</span>
          </div>
        </nav>
      </div>
      <div className="">
        <div className="row justify-content-center">
          <div className="customer register col-md-6 col-12">
            <div className="">
              <svg style={{ display: "none" }}>
                <symbol id="icon-error" viewBox="0 0 13 13">
                  <circle
                    cx="6.5"
                    cy="6.50049"
                    r="5.5"
                    stroke="white"
                    stroke-width="2"
                  />
                  <circle
                    cx="6.5"
                    cy="6.5"
                    r="5.5"
                    fill="#EB001B"
                    stroke="#EB001B"
                    stroke-width="0.7"
                  />
                  <path
                    d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                    fill="white"
                  />
                  <path
                    d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                    fill="white"
                    stroke="#EB001B"
                    stroke-width="0.7"
                  />
                </symbol>
              </svg>
              <h1 className="heading text-center">
                <span>{i18n.t("create account")}</span>
              </h1>
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  phone: "",
                  address: "",
                  //city: "",
                  password: "",
                  confirmpassword: "",
                }}
                /*   onSubmit={(values, { setSubmitting }) => {
                                        this.submitForm(values);
                                        setSubmitting(false);
                                    }} */
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handlSubmit(values);
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values,
                }) => {
                  // console.log(errors);
                  return (
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <input
                          type="text"
                          name="first_name"
                          id="RegisterForm-FirstName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.first_name}
                          autocomplete="given-name"
                          placeholder={i18n.t("first_name")}
                          // aria-required="true"
                          //errors={errors.first_name}
                          //touched={touched.first_name?.toString()}
                        />
                        <label for="RegisterForm-FirstName">
                          {i18n.t("first_name")}
                        </label>
                      </div>
                      {touched.first_name && errors.first_name ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.first_name}
                        </span>
                      ) : null}
                      <div className="field">
                        <input
                          type="text"
                          name="last_name"
                          id="RegisterForm-LastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.last_name}
                          autocomplete="family-name"
                          placeholder={i18n.t("last_name")}
                          // aria-required="true"
                          //errors={errors.last_name}
                          //touched={touched.last_name?.toString()}
                        />
                        <label for="RegisterForm-LastName">
                          {i18n.t("last_name")}
                        </label>
                      </div>
                      {touched.last_name && errors.last_name ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.last_name}
                        </span>
                      ) : null}
                      <div className="field">
                        <input
                          type="text"
                          name="phone"
                          id="RegisterForm-LastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.phone}
                          autocomplete="family-name"
                          placeholder={i18n.t("phone")}
                          // aria-required="true"
                          //errors={errors.phone}
                          //touched={touched.phone?.toString()}
                        />
                        <label for="RegisterForm-LastName">
                          {i18n.t("phone")}
                        </label>
                      </div>
                      {touched.phone && errors.phone ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.phone}
                        </span>
                      ) : null}
                      <div className="row" style={{ marginTop: "10px" }}>
                        <div className="col-md-6">
                          <div className="field">
                            <div class="select">
                              <select
                                class="facet-filters__sort select__select caption-large"
                                // value={
                                //   wilayasData.find(
                                //     (e) => e.name === user.wilaya
                                //   )?.id
                                // }
                                onChange={handleWilayaChange}
                              >
                                <option value="">
                                  -- {i18n.t("wilaya")} --
                                </option>
                                {wilayasData.map((wilaya, index) => (
                                  <option key={index} value={wilaya.id}>
                                    {wilaya.name}
                                  </option>
                                ))}
                              </select>
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                class="icon icon-caret"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="field">
                            <div class="select">
                              <select
                                class="facet-filters__sort select__select caption-large"
                                // value={
                                //   communeData.find(
                                //     (c) => c.name === user.commune
                                //   )?.id
                                // }
                                onChange={handleCommuneChange}
                              >
                                <option value="">
                                  -- {i18n.t("commune")} --
                                </option>
                               {communes.map((commune, index) => (
                                      <option key={index} value={commune.id}>
                                        {commune.name}
                                      </option>
                                    ))}
                              </select>
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                class="icon icon-caret"
                                viewBox="0 0 10 6"
                              >
                                <path
                                  fill-rule="evenodd"
                                  clip-rule="evenodd"
                                  d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* <div className="field">
                        <input
                          type="text"
                          name="city"
                          id="RegisterForm-LastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.city}
                          autocomplete="family-name"
                          placeholder={i18n.t("city")}
                          // aria-required="true"
                          errors={errors.city}
                          touched={touched.city?.toString()}
                        />
                        <label for="RegisterForm-LastName">
                          {i18n.t("city")}
                        </label>
                      </div>
                      {touched.city && errors.city ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.city}
                        </span>
                      ) : null} */}
                      <div className="field">
                        <input
                          type="text"
                          name="address"
                          id="RegisterForm-LastName"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.address}
                          autocomplete="family-name"
                          placeholder={i18n.t("address")}
                          // aria-required="true"
                          errors={errors.address}
                          touched={touched.address?.toString()}
                        />
                        <label for="RegisterForm-LastName">
                          {i18n.t("address")}
                        </label>
                      </div>
                      {touched.address && errors.address ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.address}
                        </span>
                      ) : null}
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
                          placeholder={i18n.t("email")}
                        />
                        <label for="RegisterForm-email">
                          {i18n.t("email")}
                        </label>
                      </div>
                      {touched.email && errors.email ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.email}
                        </span>
                      ) : null}
                      <div className="field">
                        <input
                          type="password"
                          name="password"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.password}
                          id="RegisterForm-password"
                          // aria-required="true"
                          placeholder={i18n.t("password")}
                          errors={errors.password}
                          touched={touched.password?.toString()}
                        />
                        <label for="RegisterForm-password">
                          {i18n.t("password")}
                        </label>
                      </div>
                      {touched.password && errors.password ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.password}
                        </span>
                      ) : null}
                      <div className="field">
                        <input
                          type="password"
                          name="confirmpassword"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.confirmpassword}
                          id="RegisterForm-password"
                          // aria-required="true"
                          placeholder={i18n.t("Confirm Password")}
                          errors={errors.confirmpassword}
                          touched={touched.confirmpassword?.toString()}
                        />
                        <label for="RegisterForm-password">
                          {i18n.t("Confirm Password")}
                        </label>
                      </div>
                      {touched.password && errors.password ? (
                        <span
                          id="RegisterForm-email-error"
                          class="form__message"
                        >
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                          >
                            <use href="#icon-error"></use>
                          </svg>
                          {errors.password}
                        </span>
                      ) : null}
                      <button type="submit">{i18n.t("create")}</button>
                    </form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
