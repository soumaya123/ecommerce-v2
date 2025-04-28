import React, { useEffect, useState } from "react";
import { Apis } from "../../services/Api/config";
import i18n from "../../i18n";
// import { Link } from 'react-router-dom'
import { useSelector } from "react-redux";

const CartNotification = (props) => {
  const [show, setshow] = useState(props.show);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const close = () => {
    setshow("none");
  };
  useEffect(() => {}, [show]);
  //console.log("props.openNotif",show)
  return (
    <cart-notification>
      <div class="cart-notification-wrapper container ">
        <div
          id="cart-notification"
          class="cart-notification focus-inset animate active"
          aria-modal="true"
          aria-label="Item added to your cart"
          role="dialog"
          tabIndex="-1"
          style={{
            position: "fixed",
            top: "10px",
            right: "12px",
            display: show,
          }}
        >
          <div class="cart-notification__header">
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
              {i18n.t("Item added to your cart")}
            </h2>
            <button
              type="button"
              class="cart-notification__close modal__close-button link link--text focus-inset"
              aria-label="Close"
              onClick={() => close()}
            >
              <svg class="icon icon-close" version="1" viewBox="0 0 24 24">
                <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
              </svg>
            </button>
          </div>
          <div id="cart-notification-product" class="cart-notification-product">
            <img
              class="cart-notification-product__image"
              src={Apis.slug + props.product.image}
              alt="BL Go PLUS Bluetooth Speaker"
              width="70"
              height="70"
              loading="lazy"
            />

            <div>
              <h3 class="cart-notification-product__name h4">
                {props.product.name}
              </h3>
              <dl>
                {props.product?.color.name && <div class="product-option">
                  <dt>{i18n.t("Color")}: </dt>
                  <dd>{props.product?.color.name}</dd>
                </div>}
              </dl>
            </div>
          </div>
          <div class="cart-notification__links">
            {/* <Link to="/cart" id="cart-notification-button" class="button button--secondary button--full-width"></Link> */}
            <a
              href="/cart"
              id="cart-notification-button"
              class="button button--secondary button--full-width"
            >
              {i18n.t("View my cart")} ({totalQuantity})
            </a>

            <a
              href="/checkout"
              class="button button--primary button--full-width"
              name="checkout"
            >
              {i18n.t("Check out")}
            </a>

            <button type="button" class="link button-label">
              {i18n.t("Continue shopping")}
            </button>
          </div>
        </div>
      </div>
    </cart-notification>
  );
};

export default CartNotification;
