import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Apis } from "../../services/Api/config";
import { cartActions } from "../../store/shopping-cart/cartSlice";
import moment from "moment";
import { useDispatch } from "react-redux";
import { GetProducts } from "../../services";

import i18n from "../../i18n";
// import { date } from 'yup';

function Cart() {
  const [show, setshow] = useState("none");
  const [opacity, setopacity] = useState(0);
  const [testyears, settestyears] = useState(false);
  const [sommestat, setsommestat] = useState(0);

  const simulatorStorge = JSON.parse(localStorage.getItem("simulator"));
  // console.log(simulatorStorge)
  const [simulator, setsimulator] = useState(
    simulatorStorge
      ? simulatorStorge
      : { date: moment().format("YYYY-MM-DD"), value: 25000, sale_number: 60 }
  );
  const [saleproduct, setsaleproduct] = useState([]);
  const subtotal = useSelector((state) => state.cart.totalAmount);
  const items = useSelector((state) => state.cart.cartItems);

  const [inputValue, setInputValue] = useState(
    simulatorStorge ? simulatorStorge?.value : 25000
  );
  let somme = 0;

  const [testsimulator, settestsimulator] = useState(
    ((simulatorStorge?.value * 30) / 100) * simulatorStorge?.sale_number <=
      parseInt(somme.toFixed(2).padEnd(7, "0").toString().replace(".", ""), 10)
      ? true
      : false
  );

  const dispatch = useDispatch();
  const addSimulator = () => {
    var years =
      new Date(new Date() - new Date(simulator.date)).getFullYear() - 1970;
    console.log(simulator, somme);
    if (
      (years >= 19 &&
        years <= 70 &&
        ((simulator?.value * 30) / 100) * simulator?.sale_number >
          parseInt(somme.toFixed(2).toString().replace(".", "") + "0")) ||
      (isNaN(somme) && years >= 19 && years <= 70)
    ) {
      localStorage.setItem("simulator", JSON.stringify(simulator));
      settestyears(false);
      window.location.reload();
      setshow("none");
    }
    if (years < 19 || years > 70) {
      settestyears(true);
    }
    if (
      ((simulator?.value * 30) / 100) * simulator?.sale_number <=
      parseInt(somme.toFixed(2).toString().replace(".", "") + "0")
    ) {
      settestsimulator(true);
    }
  };
  const onChangeDate = (e) => {
    const newDate = moment(new Date(e.target.value)).format("YYYY-MM-DD");
    setsimulator({ ...simulator, date: newDate });
    console.log(newDate); //always log "1970-01-01"
  };
  const handleMinusClick = () => {
    const newValue = simulator.value - 1;
    if (newValue >= 25000) {
      setsimulator({ ...simulator, value: newValue });
      setInputValue(newValue); // Mettre à jour la valeur de l'input
    }
  };

  const handleChange = (e) => {
    setsimulator({ ...simulator, value: e.target.value });
    setInputValue(e.target.value);
  };
  const handlePlusClick = () => {
    const newValue = simulator.value + 1;
    if (newValue <= 200000) {
      setsimulator({ ...simulator, value: newValue });
      setInputValue(newValue); // Mettre à jour la valeur de l'input
    }
  };
  const incrementItem = (product) => {
    const { id, name, image, price, reference } = product;
    dispatch(
      cartActions.addItem({
        id,
        name,
        image,
        price,
        reference,
      })
    );
  };

  const decreaseItem = (e) => {
    dispatch(cartActions.removeItem(e.id));
  };
  const deleteItem = (e) => {
    dispatch(cartActions.deleteItem(e.id));
  };
  const close = () => {
    setopacity(0);
    setshow("none");
  };
  const open = () => {
    setopacity(1);
    setshow("block");
    if (
      ((simulatorStorge?.value * 30) / 100) * simulatorStorge?.sale_number <=
      parseInt(somme.toFixed(2).toString().replace(".", "") + "0")
    ) {
      settestsimulator(true);
    }
    console.log(
      "simulator",
      ((simulatorStorge?.value * 30) / 100) * simulatorStorge?.sale_number,
      ((simulatorStorge?.value * 30) / 100) * simulatorStorge?.sale_number <
        parseInt(somme.toFixed(2).toString().replace(".", "") + "0"),
      parseInt(somme.toFixed(2).toString().replace(".", "") + "0"),
      somme.toFixed(2)
    );
  };
  const getList = async () => {
    var list1 = await GetProducts.getAllProductByfacilated();
    if (list1) {
      setsaleproduct(list1.data);
      let x = 0;
      items.map((e) => {
        const productFacilated = list1.data?.find(
          (sale) =>
            sale.sale_number === simulatorStorge?.sale_number &&
            sale.id_product === e.id
        );
        x += productFacilated?.sale_price * e.quantity;
      });
      setsommestat(x);
    }
  };
  useEffect(() => {
    simulatorStorge && getList();
  }, []);

  console.log("somme", somme);
  return (
    <>
      <div className="">
        <nav
          className="breadcrumb row"
          role="navigation"
          aria-label="breadcrumbs"
        >
          <div className="col-12">
            <a href="i/" title="Home">
              {i18n.t("home")}
            </a>
            <span aria-hidden="true">
              <i className="fa fa-angle-right"></i>
            </span>
            <span>{i18n.t("Your Shopping Cart")}</span>
          </div>
        </nav>
      </div>
      <div
        id="shopify-section-template--14270126129215__cart-items"
        className="shopify-section"
      >
        <cart-items className=" is-empty">
          <div className="carthead">
            <h1 className="heading text-left">{i18n.t("Your cart")}</h1>
            <a href="/" className="underlined-link">
              {i18n.t("Continue shopping")}
            </a>
          </div>

          {items.length === 0 ? (
            <div className="cart__warnings" style={{ display: "block" }}>
              <h1 className="cart__empty-text" style={{ display: "block" }}>
                {i18n.t("Your cart is empty")}
              </h1>
              <a href="/" className="button">
                {i18n.t("Continue shopping")}
              </a>
              <h2 className="cart__login-title">
                {i18n.t("Have an account")}?
              </h2>
              <p className="cart__login-paragraph">
                <a href="/login" className="link underlined-link">
                  {i18n.t("Log in")}
                </a>{" "}
                {i18n.t("to check out faster")}.
              </p>
            </div>
          ) : (
            <form
              action=""
              className="cart__contents critical-hidden"
              method="post"
              id="cart"
              style={{ display: "block" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "none" }}
              >
                <symbol
                  id="check-circle-fill"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                </symbol>
                <symbol id="info-fill" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </symbol>
                <symbol
                  id="exclamation-triangle-fill"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </symbol>
              </svg>
              <div
                id="main-cart-items"
                data-id="template--14270126129215__cart-items"
                style={{ postion: "relative" }}
              >
                <div
                  class="alert alert-info row"
                  role="alert"
                  style={{ textAlign: "left", padding: "10px" }}
                >
                  <div class="message-maxcart col-md-12">
                    <span
                      style={{ fontSize: "18px" }}
                      class="glyphicon glyphicon-info-sign alert-info"
                      aria-hidden="true"
                    >
                      <svg
                        class="bi flex-shrink-0 me-2"
                        role="img"
                        // aria-label="Info:"
                      >
                        <use href="#info-fill" />
                      </svg>
                    </span>
                    {!simulatorStorge && (
                      <>
                        {" "}
                        Voulez-vous passer cette commande par facilté ?
                        <Link
                          to={"#"}
                          onClick={() => {
                            open();
                          }}
                        >
                          <strong> cliquez ici </strong>
                        </Link>
                      </>
                    )}

                    {simulatorStorge && (
                      <>
                        {" "}
                        Montant max autorisé de votre panier (La somme des
                        produits achetés ne doit pas dépasser ce montant):
                        <span class="prc">
                          <strong>
                            {" "}
                            {((simulatorStorge?.value * 30) / 100) *
                              simulatorStorge?.sale_number}
                          </strong>
                        </span>
                        <br />
                        Pour modifier
                        <Link
                          to={"#"}
                          onClick={() => {
                            open();
                          }}
                        >
                          <strong> cliquez ici </strong>
                        </Link>
                      </>
                    )}
                  </div>
                </div>
                {items &&
                  (() => {
                    let x = 0;
                    items.map((e) => {
                      const productFacilated = saleproduct?.find(
                        (sale) =>
                          sale.sale_number === simulatorStorge?.sale_number &&
                          sale.id_product === e.id
                      );
                      x += productFacilated?.sale_price * e.quantity;
                    });

                    return simulatorStorge &&
                      ((simulatorStorge?.value * 30) / 100) *
                        simulatorStorge?.sale_number <
                        parseInt(
                          x.toFixed(2).toString().replace(".", "") + "0"
                        ) ? (
                      <div
                        className="alert alert-danger row"
                        role="alert"
                        style={{ textAlign: "left", padding: "10px" }}
                      >
                        <div className="message-maxcart col-md-12">
                          <span
                            style={{ fontSize: "18px" }}
                            className="glyphicon glyphicon-info-sign alert-danger"
                            aria-hidden="true"
                          >
                            <svg
                              class="bi flex-shrink-0 me-2"
                              role="img"
                              // aria-label="Info:"
                            >
                              <symbol
                                id="exclamation-triangle-fill"
                                fill="#FF0000"
                              >
                                <path d="M8.488 1.007a1.124 1.124 0 0 1 1.024 0l6.417 3.686A1.125 1.125 0 0 1 16 5.125v5.75c0 .437-.24.836-.625 1.047L9.512 14.993a1.125 1.125 0 0 1-1.024 0L.625 11.922C.24 11.71 0 11.41 0 11.125v-5.75C0 4.71.24 4.31.625 4.099L8 1.25l.488-.243zM7.875 11a1 1 0 1 0 2 0 1 1 0 0 0-2 0zm1-8a1 1 0 1 0-2 0v4a1 1 0 1 0 2 0V3z" />
                              </symbol>
                              <use xlinkHref="#exclamation-triangle-fill" />
                            </svg>
                          </span>
                          Vous avez dépassé le montant max autorisé de votre
                          panier.
                          <br />
                          Veuillez réduire ou modifier la liste des produits
                          achetés pour ne pas dépasser ce montant.
                        </div>
                      </div>
                    ) : null;
                  })()}

                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                  style={{ display: show, opacity: opacity }}
                >
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                        <h2 class="cart-notification__heading">
                          <svg
                            class="icon icon-checkmark"
                            focusable="false"
                            viewBox="0 0 12 9"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.35.643a.5.5 0 01.006.707l-6.77 6.886a.5.5 0 01-.719-.006L.638 4.845a.5.5 0 11.724-.69l2.872 3.011 6.41-6.517a.5.5 0 01.707-.006h-.001z"
                              fill="currentColor"
                            />
                          </svg>
                          {i18n.t("Taksit simulator")}
                        </h2>
                        <button
                          type="button"
                          class="cart-notification__close modal__close-button link link--text focus-inset"
                          aria-label="Close"
                          onClick={() => close()}
                        >
                          <span aria-hidden="true">
                            <svg
                              class="icon icon-close"
                              version="1"
                              viewBox="0 0 24 24"
                              style={{ width: "25px", height: "25px" }}
                            >
                              <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
                            </svg>
                          </span>
                        </button>
                        {/* <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button> */}
                      </div>
                      <div class="modal-body">
                        <div className="row justify-content-center">
                          <div className="customer register col-md-8 col-12">
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

                            <div className="field">
                              <input
                                type="date"
                                onChange={onChangeDate}
                                value={simulator.date}
                                autocomplete="given-name"
                                placeholder={i18n.t("Date of birth")}
                              />
                              <label for="RegisterForm-FirstName">
                                {i18n.t("Date of birth")}
                              </label>
                            </div>
                            {testyears === true ? (
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
                                {i18n.t(
                                  "L'âge doit être entre 19 ans et 70 ans"
                                )}
                              </span>
                            ) : null}
                            <div className="field">
                              <quantity-input class="quantity">
                                <button
                                  className="quantity__button simulator no-js-hidden"
                                  name="minus"
                                  type="button"
                                  onClick={() => handleMinusClick()}
                                >
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="presentation"
                                    className="icon icon-minus"
                                    fill="none"
                                    viewBox="0 0 10 2"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </button>
                                <input
                                  className="quantity__input"
                                  style={{ padding: " 8px 15px" }}
                                  type="number"
                                  name="updates[]"
                                  value={inputValue}
                                  onChange={(event) => {
                                    handleChange(event);
                                  }}
                                />
                                <button
                                  className="quantity__button simulator no-js-hidden"
                                  name="plus"
                                  type="button"
                                  onClick={() => handlePlusClick()}
                                >
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="presentation"
                                    className="icon icon-plus"
                                    fill="none"
                                    viewBox="0 0 10 10"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                      fill="currentColor"
                                    ></path>
                                  </svg>
                                </button>
                              </quantity-input>
                            </div>
                            {testsimulator === true ? (
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
                                {i18n.t(
                                  "Vous avez dépassé le montant max autorisé de votre panier"
                                )}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className="">
                        <p style={{ fontWeight: "500" }}>
                          {i18n.t("Remboursement sur")} :
                        </p>
                        <div class="pro-tab tabs remboursement">
                          <ul class="list-inline nav nav-tabs text-center">
                            <li
                              className={
                                simulator.sale_number === 60
                                  ? "nav-item active"
                                  : "nav-item"
                              }
                              onClick={() => {
                                setsimulator({ ...simulator, sale_number: 60 });
                              }}
                            >
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#wbprodtab1-1ccb1891-b5e1-4fb3-9730-41ac25850458"
                              >
                                <span>{"60 " + i18n.t("month")}</span>
                              </a>
                            </li>
                            <li
                              className={
                                simulator.sale_number === 48
                                  ? "nav-item active"
                                  : "nav-item "
                              }
                              onClick={() => {
                                setsimulator({ ...simulator, sale_number: 48 });
                              }}
                            >
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                              >
                                <span>{"48 " + i18n.t("month")}</span>
                              </a>
                            </li>
                            <li
                              className={
                                simulator.sale_number === 36
                                  ? "nav-item active"
                                  : "nav-item"
                              }
                              onClick={() => {
                                setsimulator({ ...simulator, sale_number: 36 });
                              }}
                            >
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                              >
                                <span>{"36 " + i18n.t("month")}</span>
                              </a>
                            </li>
                            <li
                              className={
                                simulator.sale_number === 24
                                  ? "nav-item active"
                                  : "nav-item"
                              }
                              onClick={() => {
                                setsimulator({ ...simulator, sale_number: 24 });
                              }}
                            >
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                              >
                                <span>{"24 " + i18n.t("month")}</span>
                              </a>
                            </li>
                            <li
                              className={
                                simulator.sale_number === 12
                                  ? "nav-item active"
                                  : "nav-item"
                              }
                              onClick={() => {
                                setsimulator({ ...simulator, sale_number: 12 });
                              }}
                            >
                              <a
                                class="nav-link"
                                data-toggle="tab"
                                href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                              >
                                <span>{"12 " + i18n.t("month")}</span>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-primary"
                          onClick={() => {
                            addSimulator();
                          }}
                        >
                          {i18n.t("Update")}
                        </button>
                        <button
                          type="button"
                          class="btn btn-secondary"
                          data-dismiss="modal"
                          onClick={() => setshow("none")}
                        >
                          {i18n.t("Close")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="main-cart-items"
                data-id="template--14270126129215__cart-items"
              >
                <div className="js-contents">
                  <table className="cart-items">
                    <thead>
                      <tr>
                        <th
                          className="caption-with-letter-spacing"
                          colspan="2"
                          scope="col"
                        >
                          {i18n.t("Product")}
                        </th>
                        {/* <th className="medium-hide large-up-hide right caption-with-letter-spacing" colspan="1" scope="col">{simulatorStorge ?i18n.t('Total')+"/"+i18n.t('month'):i18n.t('Total')}</th> */}
                        <th
                          className="cart-items__heading--wide small-hide caption-with-letter-spacing"
                          colspan="1"
                          scope="col"
                        >
                          {i18n.t("Quantity")}
                        </th>
                        <th
                          className="small-hide right caption-with-letter-spacing"
                          colspan="1"
                          scope="col"
                        >
                          {simulatorStorge
                            ? i18n.t("Total") + "/" + i18n.t("month")
                            : i18n.t("Total")}
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.map((e) => {
                        // console.log("somme",somme)

                        const productFacilated = saleproduct?.find(
                          (sale) =>
                            sale.sale_number === simulatorStorge?.sale_number &&
                            sale.id_product === e.id
                        );
                        somme += productFacilated?.sale_price * e.quantity;
                        return (
                          <tr className="cart-item" id="CartItem-1">
                            <td className="cart-item__media">
                              <Link to={`/products/${e.name}`}>
                                <img
                                  className="cart-item__image img-fluid mx-auto"
                                  src={Apis.slug + e.image}
                                  alt=""
                                  loading="lazy"
                                  width="150"
                                  height="150"
                                />
                              </Link>
                            </td>

                            <td className="cart-item__details">
                              <Link
                                to={`/products/${e.name}`}
                                className="cart-item__name h4 break"
                              >
                                {e.name}
                              </Link>
                              <div className="product-option">
                                {e.price + " DA"}
                              </div>
                              {simulatorStorge && (
                                <>
                                  {" "}
                                  <span style={{ fontWeight: "500" }}>
                                    {productFacilated?.sale_price +
                                      " DA" +
                                      i18n.t("/Mois jusqu'à") +
                                      " " +
                                      simulatorStorge?.sale_number +
                                      " " +
                                      i18n.t("month")}{" "}
                                  </span>{" "}
                                </>
                              )}
                              {e?.color &&<dl>
                                <div className="product-option">
                                  <dt>{i18n.t("Color")}: </dt>
                                  <dd>{e?.color}</dd>
                                </div>
                              </dl>}

                              <p className="product-option"></p>
                              <ul
                                className="discounts list-unstyled"
                                aria-label="Discount"
                              ></ul>
                            </td>

                            {/* <td className="cart-item__totals right medium-hide large-up-hide">
                                                                <div className="loading-overlay hidden">
                                                                    <div className="loading-overlay__spinner">
                                                                        <svg aria-hidden="true" focusable="false" role="presentation" className="spinner" viewBox="0 0 66 66" >
                                                                            <circle className="path" fill="none" stroke-width="6" cx="33" cy="33" r="30"></circle>
                                                                        </svg>
                                                                    </div>
                                                                </div>
                                                                <div className="cart-item__price-wrapper">
                                                                    <span className="price price--end">
                                                                        {e.price + " DA"}
                                                                    </span>
                                                                </div>
                                                            </td> */}

                            <td className="cart-item__quantity">
                              <div className="cart-item__quantity-wrapper">
                                <label
                                  className="visually-hidden"
                                  for="Quantity-1"
                                >
                                    {i18n.t("Quantity")}
                                </label>
                                <quantity-input class="quantity">
                                  <button
                                    className="quantity__button no-js-hidden"
                                    name="minus"
                                    type="button"
                                    onClick={() => decreaseItem(e)}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      className="icon icon-minus"
                                      fill="none"
                                      viewBox="0 0 10 2"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </button>
                                  <input
                                    className="quantity__input"
                                    type="number"
                                    name="updates[]"
                                    value={e.quantity}
                                    min="0"
                                    aria-label="Quantity for 15 Core I5 8th Gen LED TV"
                                    id="Quantity-1"
                                    data-index="1"
                                  />
                                  <button
                                    className="quantity__button no-js-hidden"
                                    name="plus"
                                    type="button"
                                    onClick={() => incrementItem(e)}
                                  >
                                    <svg
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      className="icon icon-plus"
                                      fill="none"
                                      viewBox="0 0 10 10"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </button>
                                </quantity-input>

                                <cart-remove-button
                                  id="Remove-1"
                                  data-index="1"
                                >
                                  <a
                                    class="icone-remove"
                                    onClick={() => deleteItem(e)}
                                  >
                                    <svg
                                      viewBox="0 0 16 16"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      className="icon icon-remove"
                                    >
                                      <path
                                        d="M14 3h-3.53a3.07 3.07 0 00-.6-1.65C9.44.82 8.8.5 8 .5s-1.44.32-1.87.85A3.06 3.06 0 005.53 3H2a.5.5 0 000 1h1.25v10c0 .28.22.5.5.5h8.5a.5.5 0 00.5-.5V4H14a.5.5 0 000-1zM6.91 1.98c.23-.29.58-.48 1.09-.48s.85.19 1.09.48c.2.24.3.6.36 1.02h-2.9c.05-.42.17-.78.36-1.02zm4.84 11.52h-7.5V4h7.5v9.5z"
                                        fill="currentColor"
                                      ></path>
                                      <path
                                        d="M6.55 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5zM9.45 5.25a.5.5 0 00-.5.5v6a.5.5 0 001 0v-6a.5.5 0 00-.5-.5z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>
                                  </a>
                                </cart-remove-button>
                              </div>
                              <div
                                className="cart-item__error"
                                id="Line-item-error-1"
                                role="alert"
                              >
                                <small className="cart-item__error-text"></small>
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  className="icon icon-error"
                                  viewBox="0 0 13 13"
                                >
                                  <circle
                                    cx="6.5"
                                    cy="6.50049"
                                    r="5.5"
                                    stroke="white"
                                    stroke-width="2"
                                  ></circle>
                                  <circle
                                    cx="6.5"
                                    cy="6.5"
                                    r="5.5"
                                    fill="#EB001B"
                                    stroke="#EB001B"
                                    stroke-width="0.7"
                                  ></circle>
                                  <path
                                    d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                    fill="white"
                                  ></path>
                                  <path
                                    d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                    fill="white"
                                    stroke="#EB001B"
                                    stroke-width="0.7"
                                  ></path>
                                </svg>
                              </div>
                            </td>

                            <td className="cart-item__totals right small-hide">
                              <div className="loading-overlay hidden">
                                <div className="loading-overlay__spinner">
                                  <svg
                                    aria-hidden="true"
                                    focusable="false"
                                    role="presentation"
                                    className="spinner"
                                    viewBox="0 0 66 66"
                                  >
                                    <circle
                                      className="path"
                                      fill="none"
                                      stroke-width="6"
                                      cx="33"
                                      cy="33"
                                      r="30"
                                    ></circle>
                                  </svg>
                                </div>
                              </div>

                              <div className="cart-item__price-wrapper">
                                <span className="price price--end">
                                  {simulatorStorge
                                    ? (
                                        productFacilated?.sale_price *
                                        e.quantity
                                      ).toFixed(2) + " DA"
                                    : e.totalPrice.toFixed(2) + " DA"}
                                </span>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <p className="visually-hidden" id="cart-live-region-text" aria-live="polite" role="status"></p>
                            <p className="visually-hidden" id="shopping-cart-line-item-status" aria-live="polite" aria-hidden="true" role="status">Loading...</p> */}
            </form>
          )}
        </cart-items>
      </div>
      {items.length > 0 && (
        <div
          className=""
          id="main-cart-footer"
          data-id="template--14270126129215__cart-footer"
        >
          <div className="cart__footer">
            <div className="cart__blocks">
              <div className="js-contents">
                <div className="totals">
                  <h3 className="totals__subtotal">
                    {simulatorStorge
                      ? i18n.t("Subtotal") + "/" + i18n.t("month")
                      : i18n.t("Subtotal")}
                    :
                  </h3>
                  <p className="totals__subtotal-value">
                    {" "}
                    {simulatorStorge
                      ? somme.toFixed(2) + " DA"
                      : subtotal + " DA"}
                  </p>
                </div>

                <div></div>

                <small className="tax-note caption-large rte">
                  {i18n.t("Taxes and shipping calculated at checkout")}
                </small>
              </div>
              <div className="cart__ctas">
                {/* <noscript>
                                <button type="submit" className="cart__update-button button button--secondary" form="cart">
                                    Update
                                </button>
                            </noscript> */}

                <Link
                  to="/checkout"
                  type="submit"
                  id="checkout"
                  className="cart__checkout-button button"
                  name="checkout"
                  form="cart"
                >
                  {i18n.t("Check out")}
                </Link>
              </div>

              <div id="cart-errors"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
