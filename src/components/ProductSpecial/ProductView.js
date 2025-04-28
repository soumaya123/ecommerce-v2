import React, { useEffect, useState } from "react";
import { Apis } from "../../services/Api/config";
import { cartActions } from "../../store/shopping-cart/cartSlice";
import { useDispatch } from "react-redux";
import { wishlistActions } from "../../store/wislist/wishlistSlice";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CartNotification from "./../Notification";
import i18n from "../../i18n";
import { GetProducts } from "../../services";

//import ModalProduct from './../Products/product-modal'
import Modal from "react-bootstrap/Modal";

export default function ProductView(props) {
  //   const [product] = useState(props.products);

  const [showModal, setShowModal] = useState(false);
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const [show, setshow] = useState("none");
  const [productNotif, setproductNotif] = useState({});
  const [filesAll, setFilesAll] = useState([]);

  const [attributs, setAttributs] = useState([]);
  const [indexColors, setIndexColors] = useState(0);
  const [index, setIndex] = useState(0);

  const [image, setImage] = useState(props.products[indexColors]?.image);
  const [imagePopup, setImagePopup] = useState(props.products[index]?.image);

  //const [products, setProducts] = useState({})
  const dispatch = useDispatch();
  const addItem = (product) => {
    setshow("block");
    setTimeout(() => {
      setshow("none");
    }, 5000);
    // show === "none" ? setshow("block") : setshow("none")
    const { id, name, image, price, reference, color } = product;
    dispatch(
      cartActions.addItem({
        id,
        name,
        image,
        price,
        reference,
        color,
      })
    );
    setproductNotif(product);

    setShowModal(false);
  };
  const openProduct = () => {
    //console.log("okkkkk")
    setImagePopup(props.products[index]?.image);
    setShowModal(true);
  };
  const addWishlist = (product) => {
    const { id, name, image, price, reference, color } = product;
    dispatch(
      wishlistActions.addItem({
        id,
        name,
        image,
        price,
        reference,
        color,
      })
    );
  };
  const getList = async () => {
    setImage(props.products[indexColors]?.image);

    var list2 = await GetProducts.getGalerieProduct(
      props.products[index]?.id
    );
    setFilesAll(list2.data);
    var listAP = await GetProducts.getAttributProduct(
      props.products[indexColors]?.id
    );
    if (listAP) {
      setAttributs(listAP.data);
    }
  };
  const changeImage = (img) => {
    console.log("img", img);
    setImage(img);
  };
  const changeImagePopup= (img) => {
    console.log("img", img);
    setImagePopup(img);
  };
  const deleteWishlist = (e) => {
    //console.log(e)
    dispatch(wishlistActions.deleteItem(e.id));
  };
  const changeColor = async (index) => {
    setIndexColors(index);
    setImage(props.products[index]?.image);
  };
  const changeColorPopup = async (index) => {
    setIndex(index);
    setImagePopup(props.products[index]?.image);
  };
  useEffect(() => {
    getList();
  }, [props.products]);
  const handleClose = () => setShowModal(false);
  return (
    <>
      {show === "block" ? (
        <CartNotification product={productNotif} show={show} />
      ) : null}
      <li class="grid__item col-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 cless">
        <div class="card-wrapper wbproduct-container">
          <div class="card">
            <div class="wbimgblock">
              <div
                id="webipro-template--14270126161983__product-grid-4397860585535"
                class="card__media"
              >
                <div
                  class="product__media-item"
                  data-media-id="template--14270126161983__product-grid-4397860585535-5824692715583"
                >
                  <Link
                    to={`/products/${props.products[indexColors]?.name}`}
                    class="media media--transparent media--adapt media--hover-effect "
                    style={{ paddingBottom: "100.0%" }}
                  >
                    <img
                      class="img-fluid mx-auto"
                      //cdn.shopify.com/s/files/1/0257/0492/3199/products/45.jpg?v=1575011947 1000w"
                      src={Apis.slug + image}
                      sizes="(min-width: 1600px) 0px, (min-width: 992px) calc(0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                      loading="lazy"
                      width="1000"
                      height="1000"
                      alt=""
                    />
                  </Link>
                </div>
              </div>

              <div class="card__badge">
                <span>
                  {props.products[indexColors]?.stock > 0
                    ? "Dispo"
                    : "Non dispo"}
                </span>
              </div>
            </div>

            <div class="wbproductdes">
            <p class="wbprotype">{props.products[indexColors]?.Brand?.name}</p>
              <h3 class="product-title">
                <Link to={`/products/${props.products[indexColors]?.name}`}>
                  {props.products[indexColors]?.name}
                </Link>
              </h3>
              <span class="caption-large light"></span>
              <p class="wblistpdesc"></p>
              <div id="ProductInfo-template--14270126161983__product-grid-4397860585535">
                <div class="wbhrating">
                  <div
                    class="rating"
                    role="img"
                    aria-label="5.0 out of 5.0 stars"
                  >
                    <span
                      aria-hidden="true"
                      class="rating-star"
                      style={{
                        rating: "5",
                        ratingMax: "5.0",
                        ratingDecimal: "0",
                      }}
                    ></span>
                  </div>
                  {/* <p class="rating-text caption">
                    <span aria-hidden="true">5.0 / 5.0</span>
                  </p> */}
                  {/* <p class="rating-count caption">
                    <span aria-hidden="true">(1)</span>
                    <span class="visually-hidden">1 total reviews</span>
                  </p> */}
                </div>
                <div
                  class="no-js-hidden wbhprice"
                  id="price-template--14270126161983__product-grid-4397860585535"
                  role="status"
                >
                  <div class="price price--on-sale ">
                    <div class="price__container">
                      <div class="price__sale">
                        <span class="visually-hidden visually-hidden--inline">
                          Sale price
                        </span>
                        <span class="price-item price-item--sale price-item--last">
                          DA{" "}
                          {props.products[indexColors]?.cost_price === null
                            ? props.products[indexColors]?.price
                            : props.products[indexColors]?.cost_price}
                        </span>
                        <span class="visually-hidden visually-hidden--inline">
                          Regular price
                        </span>
                        {props.products[indexColors]?.cost_price !== null ? (
                          <span>
                            <s class="price-item price-item--regular">
                              DA {props.products[indexColors]?.price}
                            </s>
                          </span>
                        ) : null}
                      </div>
                      <small class="unit-price caption hidden">
                        <span class="visually-hidden">Unit price</span>
                        <span class="price-item price-item--last">
                          <span></span>
                          <span aria-hidden="true">/</span>
                          <span class="visually-hidden">&nbsp;per&nbsp;</span>
                          <span></span>
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
                {props.products[indexColors]?.color?.name &&<variant-radios
                  class="no-js-hidden new-swatch variant-webi"
                  data-section="template--14270126161983__product-grid"
                  data-product="4397860585535"
                  data-update-url="false"
                  data-layout="card"
                >
                  <fieldset class="swatchComponent inner-class">
                    <div class="wbswatchclr">
                      {props.products?.map((p, index) => {
                        return (
                          <>
                            <input
                              type="radio"
                              name="Color"
                              value={p.color?.name}
                              checked={index === indexColors ? true : false}
                            />

                            <label
                              className={`color-swatchimg color-swatch ${
                                index === indexColors ? "active" : ""
                              }`}
                              onClick={() => {
                                changeColor(index);
                              }}
                              style={{
                                backgroundColor: p.color?.values,
                                marginRight: "3px",
                              }}
                            ></label>
                          </>
                        );
                      })}
                    </div>
                  </fieldset>
                </variant-radios>}

                <product-form class="product-form">
                  <div class="button-group">
                    <div class="wbquicksuccess hidden" hidden>
                      <i class="fa fa-check-circle" aria-hidden="true"></i> Your
                      item is successfully added to the Cart!!
                    </div>
                    <div
                      class="product-form__error-message-wrapper"
                      role="alert"
                      hidden
                    >
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        class="icon icon-error"
                        viewBox="0 0 13 13"
                      >
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
                      </svg>
                      <span class="product-form__error-message"></span>
                    </div>

                    <button
                      onClick={() => addItem(props.products[indexColors])}
                      name="add"
                      class="cartb product-form__submit button"
                      aria-label="Add to cart"
                    >
                      <svg viewBox="0 0 459.529 459.529">
                        <path
                          d="M17,55.231h48.733l69.417,251.033c1.983,7.367,8.783,12.467,16.433,12.467h213.35c6.8,0,12.75-3.967,15.583-10.2
                                                l77.633-178.5c2.267-5.383,1.7-11.333-1.417-16.15c-3.117-4.817-8.5-7.65-14.167-7.65H206.833c-9.35,0-17,7.65-17,17
                                                s7.65,17,17,17H416.5l-62.9,144.5H164.333L94.917,33.698c-1.983-7.367-8.783-12.467-16.433-12.467H17c-9.35,0-17,7.65-17,17
                                                S7.65,55.231,17,55.231z"
                        ></path>
                        <path
                          d="M135.433,438.298c21.25,0,38.533-17.283,38.533-38.533s-17.283-38.533-38.533-38.533S96.9,378.514,96.9,399.764
                                                S114.183,438.298,135.433,438.298z"
                        ></path>
                        <path
                          d="M376.267,438.298c0.85,0,1.983,0,2.833,0c10.2-0.85,19.55-5.383,26.35-13.317c6.8-7.65,9.917-17.567,9.35-28.05
                                                c-1.417-20.967-19.833-37.117-41.083-35.7c-21.25,1.417-37.117,20.117-35.7,41.083
                                                C339.433,422.431,356.15,438.298,376.267,438.298z"
                        ></path>
                      </svg>
                      <span>Add to cart</span>
                      <div class="loading-overlay__spinner hidden">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="spinner"
                          viewBox="0 0 66 66"
                        >
                          <circle
                            class="path"
                            fill="none"
                            stroke-width="6"
                            cx="33"
                            cy="33"
                            r="30"
                          ></circle>
                        </svg>
                      </div>
                    </button>
                    <div class="wbwish">
                      {wishlist.findIndex(
                        (e) => e.id === props.products[indexColors]?.id
                      ) > -1 ? (
                        <a
                          class="wishlist"
                          href="# "
                          onClick={() =>
                            deleteWishlist(props.products[indexColors])
                          }
                          title="Wishlist"
                        >
                          <span class="wbwishirmv">
                            <i class="fa fa-remove"></i>
                          </span>
                        </a>
                      ) : (
                        <a
                          class="wishlist"
                          href="# "
                          onClick={() =>
                            addWishlist(props.products[indexColors])
                          }
                          title="Wishlist"
                        >
                          <svg viewBox="0 0 129 129">
                            <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                          </svg>
                          <span class="wbaddwish">Add To Wishlist</span>
                        </a>
                      )}
                    </div>

                    <div class="wbqvtop">
                      <button
                        class="focus-inset wbquickv quick_shop "
                        aria-label="Quick view"
                        onClick={() => openProduct(props.products[indexColors])}
                      >
                        <svg viewBox="0 0 459.529 459.529">
                          <path
                            d="M448.947,218.475c-0.922-1.168-23.055-28.933-61-56.81c-50.705-37.253-105.877-56.944-159.551-56.944
                                                c-53.672,0-108.844,19.691-159.551,56.944c-37.944,27.876-60.077,55.642-61,56.81L0,228.397l7.846,9.923
                                                c0.923,1.168,23.056,28.934,61,56.811c50.707,37.252,105.879,56.943,159.551,56.943c53.673,0,108.845-19.691,159.55-56.943
                                                c37.945-27.877,60.078-55.643,61-56.811l7.848-9.923L448.947,218.475z M228.396,315.039c-47.774,0-86.642-38.867-86.642-86.642
                                                c0-7.485,0.954-14.751,2.747-21.684l-19.781-3.329c-1.938,8.025-2.966,16.401-2.966,25.013c0,30.86,13.182,58.696,34.204,78.187
                                                c-27.061-9.996-50.072-24.023-67.439-36.709c-21.516-15.715-37.641-31.609-46.834-41.478c9.197-9.872,25.32-25.764,46.834-41.478
                                                c17.367-12.686,40.379-26.713,67.439-36.71l13.27,14.958c15.498-14.512,36.312-23.412,59.168-23.412
                                                c47.774,0,86.641,38.867,86.641,86.642C315.037,276.172,276.17,315.039,228.396,315.039z M368.273,269.875
                                                c-17.369,12.686-40.379,26.713-67.439,36.709c21.021-19.49,34.203-47.326,34.203-78.188s-13.182-58.697-34.203-78.188
                                                c27.061,9.997,50.07,24.024,67.439,36.71c21.516,15.715,37.641,31.609,46.834,41.477
                                                C405.91,238.269,389.787,254.162,368.273,269.875z"
                          ></path>
                          <path
                            d="M173.261,211.555c-1.626,5.329-2.507,10.982-2.507,16.843c0,31.834,25.807,57.642,57.642,57.642
                                                c31.834,0,57.641-25.807,57.641-57.642s-25.807-57.642-57.641-57.642c-15.506,0-29.571,6.134-39.932,16.094l28.432,32.048
                                                L173.261,211.555z"
                          ></path>
                        </svg>
                        <span>Quick view</span>
                      </button>
                    </div>
                  </div>
                </product-form>
              </div>
            </div>
          </div>
        </div>
      </li>
      <Modal show={showModal} onHide={handleClose} className="modal-li">
        <button
          type="button"
          data-fancybox-close=""
          class="fancybox-button fancybox-close-small"
          title="Close"
          onClick={() => {
            setShowModal(false);
          }}
        >
          <svg version="1" viewBox="0 0 24 24">
            <path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path>
          </svg>
        </button>
        <div class="section-template--14473720397887__main-padding product product--small product--thumbnail_slider grid grid--1-col grid--2-col-tablet">
          <div class="grid__item product__media-wrapper wbproleftimg">
            <media-gallery
              id="MediaGallery-template--14473720397887__main"
              role="region"
              class="product__media-gallery"
              aria-label="Gallery Viewer"
              data-desktop-layout="thumbnail_slider"
            >
              <div
                id="GalleryStatus-template--14473720397887__main"
                class="visually-hidden"
                role="status"
              ></div>
              <slider-component
                id="GalleryViewer-template--14473720397887__main"
                class="slider-mobile-gutter"
              >
                <ul
                  id="Slider-Gallery-template--14473720397887__main"
                  class="product__media-list grid grid--peek list-unstyled slider slider--mobile"
                >
                  <li
                    id="Slide-template--14473720397887__main-5824576487487"
                    class="protopimg-item product__media-item grid__item slider__slide is-active"
                    data-media-id="template--14473720397887__main-5824576487487"
                  >
                    <noscript>
                      <div
                        class="product__media media"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src={Apis.slug + imagePopup}
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          width="973"
                          height="973"
                          alt=""
                        />
                      </div>
                    </noscript>

                    <modal-opener
                      class="product__modal-opener product__modal-opener--image no-js-hidden"
                      data-modal="#ProductModal-template--14473720397887__main"
                    >
                      <span
                        class="product__media-icon motion-reduce"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-plus"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.66724 7.93978C4.66655 7.66364 4.88984 7.43922 5.16598 7.43853L10.6996 7.42464C10.9758 7.42395 11.2002 7.64724 11.2009 7.92339C11.2016 8.19953 10.9783 8.42395 10.7021 8.42464L5.16849 8.43852C4.89235 8.43922 4.66793 8.21592 4.66724 7.93978Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.92576 4.66463C8.2019 4.66394 8.42632 4.88723 8.42702 5.16337L8.4409 10.697C8.44159 10.9732 8.2183 11.1976 7.94215 11.1983C7.66601 11.199 7.44159 10.9757 7.4409 10.6995L7.42702 5.16588C7.42633 4.88974 7.64962 4.66532 7.92576 4.66463Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.8324 3.03011C10.1255 0.323296 5.73693 0.323296 3.03011 3.03011C0.323296 5.73693 0.323296 10.1256 3.03011 12.8324C5.73693 15.5392 10.1255 15.5392 12.8324 12.8324C15.5392 10.1256 15.5392 5.73693 12.8324 3.03011ZM2.32301 2.32301C5.42035 -0.774336 10.4421 -0.774336 13.5395 2.32301C16.6101 5.39361 16.6366 10.3556 13.619 13.4588L18.2473 18.0871C18.4426 18.2824 18.4426 18.599 18.2473 18.7943C18.0521 18.9895 17.7355 18.9895 17.5402 18.7943L12.8778 14.1318C9.76383 16.6223 5.20839 16.4249 2.32301 13.5395C-0.774335 10.4421 -0.774335 5.42035 2.32301 2.32301Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>

                      <div
                        class="product__media media media--transparent"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src={Apis.slug + imagePopup}
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          data-width="973"
                          data-height="973"
                          alt=""
                        />
                      </div>
                      <button
                        class="product__media-toggle"
                        type="button"
                        aria-haspopup="dialog"
                        data-media-id="5824576487487"
                      >
                        <span class="visually-hidden">
                          Open media 1 in gallery view
                        </span>
                      </button>
                    </modal-opener>
                  </li>
                  <li
                    id="Slide-template--14473720397887__main-5824576520255"
                    class="protopimg-item product__media-item grid__item slider__slide"
                    data-media-id="template--14473720397887__main-5824576520255"
                  >
                    <noscript>
                      <div
                        class="product__media media"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/10_1946x.jpg?v=1575011120"
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          width="973"
                          height="973"
                          alt=""
                        />
                      </div>
                    </noscript>

                    <modal-opener
                      class="product__modal-opener product__modal-opener--image no-js-hidden"
                      data-modal="#ProductModal-template--14473720397887__main"
                    >
                      <span
                        class="product__media-icon motion-reduce"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-plus"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.66724 7.93978C4.66655 7.66364 4.88984 7.43922 5.16598 7.43853L10.6996 7.42464C10.9758 7.42395 11.2002 7.64724 11.2009 7.92339C11.2016 8.19953 10.9783 8.42395 10.7021 8.42464L5.16849 8.43852C4.89235 8.43922 4.66793 8.21592 4.66724 7.93978Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.92576 4.66463C8.2019 4.66394 8.42632 4.88723 8.42702 5.16337L8.4409 10.697C8.44159 10.9732 8.2183 11.1976 7.94215 11.1983C7.66601 11.199 7.44159 10.9757 7.4409 10.6995L7.42702 5.16588C7.42633 4.88974 7.64962 4.66532 7.92576 4.66463Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.8324 3.03011C10.1255 0.323296 5.73693 0.323296 3.03011 3.03011C0.323296 5.73693 0.323296 10.1256 3.03011 12.8324C5.73693 15.5392 10.1255 15.5392 12.8324 12.8324C15.5392 10.1256 15.5392 5.73693 12.8324 3.03011ZM2.32301 2.32301C5.42035 -0.774336 10.4421 -0.774336 13.5395 2.32301C16.6101 5.39361 16.6366 10.3556 13.619 13.4588L18.2473 18.0871C18.4426 18.2824 18.4426 18.599 18.2473 18.7943C18.0521 18.9895 17.7355 18.9895 17.5402 18.7943L12.8778 14.1318C9.76383 16.6223 5.20839 16.4249 2.32301 13.5395C-0.774335 10.4421 -0.774335 5.42035 2.32301 2.32301Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>

                      <div
                        class="product__media media media--transparent"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src={Apis.slug + imagePopup}
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          data-width="973"
                          data-height="973"
                          alt=""
                        />
                      </div>
                      <button
                        class="product__media-toggle"
                        type="button"
                        aria-haspopup="dialog"
                        data-media-id="5824576520255"
                      >
                        <span class="visually-hidden">
                          Open media 2 in gallery view
                        </span>
                      </button>
                    </modal-opener>
                  </li>
                  <li
                    id="Slide-template--14473720397887__main-5824594051135"
                    class="protopimg-item product__media-item grid__item slider__slide"
                    data-media-id="template--14473720397887__main-5824594051135"
                  >
                    <noscript>
                      <div
                        class="product__media media"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/13_1946x.jpg?v=1575011120"
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          width="973"
                          height="973"
                          alt=""
                        />
                      </div>
                    </noscript>

                    <modal-opener
                      class="product__modal-opener product__modal-opener--image no-js-hidden"
                      data-modal="#ProductModal-template--14473720397887__main"
                    >
                      <span
                        class="product__media-icon motion-reduce"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-plus"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.66724 7.93978C4.66655 7.66364 4.88984 7.43922 5.16598 7.43853L10.6996 7.42464C10.9758 7.42395 11.2002 7.64724 11.2009 7.92339C11.2016 8.19953 10.9783 8.42395 10.7021 8.42464L5.16849 8.43852C4.89235 8.43922 4.66793 8.21592 4.66724 7.93978Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.92576 4.66463C8.2019 4.66394 8.42632 4.88723 8.42702 5.16337L8.4409 10.697C8.44159 10.9732 8.2183 11.1976 7.94215 11.1983C7.66601 11.199 7.44159 10.9757 7.4409 10.6995L7.42702 5.16588C7.42633 4.88974 7.64962 4.66532 7.92576 4.66463Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.8324 3.03011C10.1255 0.323296 5.73693 0.323296 3.03011 3.03011C0.323296 5.73693 0.323296 10.1256 3.03011 12.8324C5.73693 15.5392 10.1255 15.5392 12.8324 12.8324C15.5392 10.1256 15.5392 5.73693 12.8324 3.03011ZM2.32301 2.32301C5.42035 -0.774336 10.4421 -0.774336 13.5395 2.32301C16.6101 5.39361 16.6366 10.3556 13.619 13.4588L18.2473 18.0871C18.4426 18.2824 18.4426 18.599 18.2473 18.7943C18.0521 18.9895 17.7355 18.9895 17.5402 18.7943L12.8778 14.1318C9.76383 16.6223 5.20839 16.4249 2.32301 13.5395C-0.774335 10.4421 -0.774335 5.42035 2.32301 2.32301Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>

                      <div
                        class="product__media media media--transparent"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/13_1946x.jpg?v=1575011120"
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          data-width="973"
                          data-height="973"
                          alt=""
                        />
                      </div>
                      <button
                        class="product__media-toggle"
                        type="button"
                        aria-haspopup="dialog"
                        data-media-id="5824594051135"
                      >
                        <span class="visually-hidden">
                          Open media 3 in gallery view
                        </span>
                      </button>
                    </modal-opener>
                  </li>
                  <li
                    id="Slide-template--14473720397887__main-5824594116671"
                    class="protopimg-item product__media-item grid__item slider__slide"
                    data-media-id="template--14473720397887__main-5824594116671"
                  >
                    <noscript>
                      <div
                        class="product__media media"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/14_1946x.jpg?v=1575011120"
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          width="973"
                          height="973"
                          alt=""
                        />
                      </div>
                    </noscript>

                    <modal-opener
                      class="product__modal-opener product__modal-opener--image no-js-hidden"
                      data-modal="#ProductModal-template--14473720397887__main"
                    >
                      <span
                        class="product__media-icon motion-reduce"
                        aria-hidden="true"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="icon icon-plus"
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.66724 7.93978C4.66655 7.66364 4.88984 7.43922 5.16598 7.43853L10.6996 7.42464C10.9758 7.42395 11.2002 7.64724 11.2009 7.92339C11.2016 8.19953 10.9783 8.42395 10.7021 8.42464L5.16849 8.43852C4.89235 8.43922 4.66793 8.21592 4.66724 7.93978Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.92576 4.66463C8.2019 4.66394 8.42632 4.88723 8.42702 5.16337L8.4409 10.697C8.44159 10.9732 8.2183 11.1976 7.94215 11.1983C7.66601 11.199 7.44159 10.9757 7.4409 10.6995L7.42702 5.16588C7.42633 4.88974 7.64962 4.66532 7.92576 4.66463Z"
                            fill="currentColor"
                          ></path>
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12.8324 3.03011C10.1255 0.323296 5.73693 0.323296 3.03011 3.03011C0.323296 5.73693 0.323296 10.1256 3.03011 12.8324C5.73693 15.5392 10.1255 15.5392 12.8324 12.8324C15.5392 10.1256 15.5392 5.73693 12.8324 3.03011ZM2.32301 2.32301C5.42035 -0.774336 10.4421 -0.774336 13.5395 2.32301C16.6101 5.39361 16.6366 10.3556 13.619 13.4588L18.2473 18.0871C18.4426 18.2824 18.4426 18.599 18.2473 18.7943C18.0521 18.9895 17.7355 18.9895 17.5402 18.7943L12.8778 14.1318C9.76383 16.6223 5.20839 16.4249 2.32301 13.5395C-0.774335 10.4421 -0.774335 5.42035 2.32301 2.32301Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>

                      <div
                        class="product__media media media--transparent"
                        style={{ paddingTop: "100.0%" }}
                      >
                        <img
                          src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/14_1946x.jpg?v=1575011120"
                          sizes="(min-width: 1600px) 675px, (min-width: 992px) calc(45.0vw - 10rem), (min-width: 768px) calc((100vw - 11.5rem) / 2), calc(100vw - 4rem)"
                          loading="lazy"
                          data-width="973"
                          data-height="973"
                          alt=""
                        />
                      </div>
                      <button
                        class="product__media-toggle"
                        type="button"
                        aria-haspopup="dialog"
                        data-media-id="5824594116671"
                      >
                        <span class="visually-hidden">
                          Open media 4 in gallery view
                        </span>
                      </button>
                    </modal-opener>
                  </li>
                </ul>
                <div class="slider-buttons no-js-hidden">
                  <button
                    type="button"
                    class="slider-button slider-button--prev focus-inset"
                    name="previous"
                    aria-label="Slide left"
                  >
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
                      ></path>
                    </svg>
                  </button>
                  <div class="slider-counter caption">
                    <span class="slider-counter--current">1</span>
                    <span aria-hidden="true"> / </span>
                    <span class="visually-hidden">of</span>
                    <span class="slider-counter--total">1</span>
                  </div>
                  <button
                    type="button"
                    class="slider-button slider-button--next focus-inset"
                    name="next"
                    aria-label="Slide right"
                  >
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
                      ></path>
                    </svg>
                  </button>
                </div>
              </slider-component>
              <slider-component
                id="GalleryThumbnails-template--14473720397887__main"
                class="thumbnail-slider slider-mobile-gutter small-hide"
              >
                <button
                  type="button"
                  class="focus-inset slider-button slider-button--prev medium-hide large-up-hide"
                  name="previous"
                  aria-label="Slide left"
                  aria-controls="GalleryThumbnails-template--14473720397887__main"
                  data-step="3"
                  disabled="disabled"
                >
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
                    ></path>
                  </svg>
                </button>

                <ul
                  id="Slider-Thumbnails-template--14473720397887__main"
                  class="thumbnail-list list-unstyled slider slider--mobile slider--tablet-up"
                >
                  <li
                    id="Slide-Thumbnails-template--14270126424127__main-0"
                    onClick={() =>
                      changeImagePopup(props.products[index]?.image)
                    }
                    class={`thumbnail-list__item slider__slide`}
                    data-target="template--14270126424127__main-5824634093631"
                    data-media-position="1"
                  >
                    <button
                      class="thumbnail thumbnail--narrow"
                      aria-label={`Load image 1 in gallery view`}
                      aria-current={
                        imagePopup === props.products[index]?.image
                          ? "true"
                          : "false"
                      }
                      aria-controls="GalleryViewer-template--14270126424127__main"
                      aria-describedby={`Thumbnail-template--14270126424127__main-0`}
                    >
                      <img
                        id="Thumbnail-template--14270126424127__main-0"
                        src={Apis.slug + props.products[index]?.image}
                        sizes="calc((1200px - 19.5rem) / 5)"
                        alt=""
                        height="200"
                        width="200"
                        loading="lazy"
                      />
                    </button>
                  </li>
                  {filesAll.map((e) => {
                    return (
                      <li
                        id="Slide-Thumbnails-template--14473720397887__main-0"
                        class="thumbnail-list__item slider__slide"
                        data-target="template--14473720397887__main-5824576487487"
                        data-media-position="1"
                        onClick={() => changeImagePopup(e?.imgUrl)}
                      >
                        <button class="focus-inset thumbnail global-media-settings global-media-settings--no-shadow thumbnail--narrow">
                          <img
                            id="Thumbnail-template--14473720397887__main-0"
                            src={Apis.slug + e?.imgUrl}
                            aria-current={
                              imagePopup === e?.imgUrl ? "true" : "false"
                            }
                            alt=""
                            height="200"
                            width="200"
                            loading="lazy"
                          />
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  class="focus-inset slider-button slider-button--next medium-hide large-up-hide"
                  name="next"
                  aria-label="Slide right"
                  aria-controls="GalleryThumbnails-template--14473720397887__main"
                  data-step="3"
                >
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
                    ></path>
                  </svg>
                </button>
              </slider-component>
            </media-gallery>
          </div>

          <div class="product__info-wrapper grid__item">
            <div
              id="ProductInfo-template--14473720397887__main"
              class="product__info-container product__info-container--sticky"
            >
               <p class="product__text"> {props.products[index]?.reference }</p>

              <h1 class="product__title">
              
                  {
                  props.products[index].color?.name ?
                   (props.products[index]?.name +
                 "/" +
                  props.products[index].color?.name +
                  "/" +
                  props.products[index].Brand?.name
                  ):(props.products[index]?.name +
                     "/" +
                     props.products[index].Brand?.name)}
              </h1>

              <div
                class="no-js-hidden mainp-price"
                id="price-template--14473720397887__main"
                role="status"
              >
                <div class="price price--on-sale  price--show-badge">
                  <div class="price__container">
                    {props.products[index]?.cost_price === null ? (
                      <div class="price__regular">
                        <span class="visually-hidden visually-hidden--inline">
                          Regular price
                        </span>
                        <span class="price-item price-item--regular">
                          DA {props.products[index]?.price}
                        </span>
                      </div>
                    ) : (
                      <div class="price__sale" style={{ display: "block" }}>
                        <span class="visually-hidden visually-hidden--inline">
                          Sale price
                        </span>
                        <span class="price-item price-item--sale price-item--last">
                          DA {props.products[index]?.cost_price}
                        </span>
                        <span class="visually-hidden visually-hidden--inline">
                          Regular price
                        </span>
                        <span>
                          <s
                            class="price-item price-item--regular"
                            style={{ color: " rgb(0,0,0,.6)" }}
                          >
                            DA {props.products[index]?.price}
                          </s>
                        </span>
                      </div>
                    )}
                    <small class="unit-price caption hidden">
                      <span class="visually-hidden">Unit price</span>
                      <span class="price-item price-item--last">
                        <span></span>
                        <span aria-hidden="true">/</span>
                        <span class="visually-hidden">&nbsp;per&nbsp;</span>
                        <span></span>
                      </span>
                    </small>
                  </div>
                  <span class="badge price__badge-sale">Dispo</span>
                </div>
              </div>
              <div>
                <form
                  method="post"
                  action="/cart/add"
                  id="product-form-installment"
                  acceptCharset="UTF-8"
                  class="installment caption-large"
                  encType="multipart/form-data"
                >
                  <input type="hidden" name="form_type" value="product" />
                  <input type="hidden" name="utf8" value="✓" />
                  <input type="hidden" name="id" value="39636975550527" />
                </form>
              </div>
              <div
                class="product__description rte"
                dangerouslySetInnerHTML={{
                  __html: props.products[index]?.description.replace(/\n/g, "<br>"),
                }}
              >
                {/* <p>{props.products[index].description.replace(/\n/g, "<br>")}</p> */}
              </div>
              <variant-radios
                class="no-js-hidden"
                data-section="template--14473720397887__main"
                data-url="/products/rdp-smart-laptops"
              >
                <fieldset class="js product-form__input">
                  <legend class="form__label">{i18n.t('Color')}</legend>
                  {props.products?.map((p, i) => {
                    return (
                      <>
                        <input
                          type="radio"
                          id="template--14473720397887__main-1-0"
                          name="Color"
                          checked={index === i ? true : false}
                        />
                        <label
                        
                          class=" wbprodvarcolor"
                          onClick={() => {
                            changeColorPopup(i);
                          }}
                          style={{
                            backgroundColor: p.color?.values,
                          }}
                          for="template--14473720397887__main-1-0"
                        ></label>
                      </>
                    );
                  })}
                </fieldset>
              </variant-radios>
              <noscript class="product-form__noscript-wrapper-template--14473720397887__main">
                <div class="product-form__input">
                  <label
                    class="form__label"
                    for="Variants-template--14473720397887__main"
                  >
                    Product variants
                  </label>
                  <div class="select">
                    <select
                      name="id"
                      id="Variants-template--14473720397887__main"
                      class="select__select"
                      form="product-form-template--14473720397887__main"
                    >
                      <option selected="selected" value="39636975550527">
                        Gray - DA 550.00
                      </option>
                      <option disabled value="39636975583295">
                        Blue - Sold out - DA 550.00
                      </option>
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
              </noscript>
              <div class="wbstockcount ">
                <div class="wbstockinfo wbstockinfo_high">
                  In stock (20 units), ready to be shipped
                </div>
                <div class="wbstockinfo-bar">
                  <span
                    class="wbstockinfo-probar"
                    style={{ width: "13%" }}
                  ></span>
                </div>
              </div>

              <div class="product-form__input product-form__quantity">
                <label
                  class="form__label"
                  for="Quantity-template--14473720397887__main"
                >
                  Quantity
                </label>
                <quantity-input class="quantity">
                  <button
                    class="quantity__button no-js-hidden"
                    name="minus"
                    type="button"
                  >
                    <span class="visually-hidden">Decrease quantity for </span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-minus"
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
                    class="quantity__input"
                    type="number"
                    name="quantity"
                    id="Quantity-template--14473720397887__main"
                    min="1"
                    value="1"
                    aria-label="Quantity"
                    form="product-form-template--14473720397887__main"
                  />
                  <button
                    class="quantity__button no-js-hidden"
                    name="plus"
                    type="button"
                  >
                    <span class="visually-hidden">Increase quantity for </span>
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      role="presentation"
                      class="icon icon-plus"
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
              <div>
                <product-form class="product-form">
                  <div class="wbquicksuccess hidden">
                    Liquid error (sections/wbquickview line 406): Could not find
                    asset snippets/icon-check.liquid Your item is successfully
                    added to the Cart!!
                  </div>
                  {/* <div class="product-form__error-message-wrapper" role="alert" hidden="">
                                        <svg aria-hidden="true" focusable="false" role="presentation" class="icon icon-error" viewBox="0 0 13 13">
                                            <circle cx="6.5" cy="6.50049" r="5.5" stroke="white" stroke-width="2"></circle>
                                            <circle cx="6.5" cy="6.5" r="5.5" fill="#EB001B" stroke="#EB001B" stroke-width="0.7"></circle>
                                            <path d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z" fill="white"></path>
                                            <path d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z" fill="white" stroke="#EB001B" stroke-width="0.7"></path>
                                        </svg>
                                        <span class="product-form__error-message"></span>
                                    </div> */}

                  <div class="product-form__buttons">
                    <button
                      type="submit"
                      name="add"
                      class="product-form__submit button button--primary btn-block"
                      onClick={() => addItem(props.products[indexColors])}
                    >
                      <span>{i18n.t("add to cart")}</span>
                      <div class="loading-overlay__spinner hidden">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          role="presentation"
                          class="spinner"
                          viewBox="0 0 66 66"
                        >
                          <circle
                            class="path"
                            fill="none"
                            stroke-width="6"
                            cx="33"
                            cy="33"
                            r="30"
                          ></circle>
                        </svg>
                      </div>
                    </button>
                    <div
                      data-shopify="payment-button"
                      data-has-selling-plan="false"
                      data-has-fixed-selling-plan="false"
                      class="shopify-payment-button"
                    >
                      <div>
                        <div>
                          <div>
                            <div class="shopify-cleanslate">
                              <div
                                id="shopify-svg-symbols"
                                class="R9tDu8JrE_i1ctOEo0v_"
                                aria-hidden="true"
                              >
                                <svg focusable="false">
                                  <defs>
                                    <symbol
                                      id="shopify-svg__warning"
                                      viewBox="0 0 16 14"
                                    >
                                      <path d="M5.925 2.344c1.146-1.889 3.002-1.893 4.149 0l4.994 8.235c1.146 1.889.288 3.421-1.916 3.421h-10.305c-2.204 0-3.063-1.529-1.916-3.421l4.994-8.235zm1.075 1.656v5h2v-5h-2zm0 6v2h2v-2h-2z"></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__loading"
                                      viewBox="0 0 32 32"
                                    >
                                      <path d="M32 16c0 8.837-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0v2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14h2z"></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__error"
                                      viewBox="0 0 18 18"
                                    >
                                      <path
                                        d="M9 18c5 0 9-4 9-9s-4-9-9-9-9 4-9 9 4 9 9 9z"
                                        fill="#ffec3e"
                                      ></path>
                                      <path
                                        d="M8 4h2v6H8z"
                                        fill="#ffffff"
                                      ></path>
                                      <rect
                                        x="7.8"
                                        y="12"
                                        width="2.5"
                                        height="2.5"
                                        rx="1.3"
                                        fill="#ffffff"
                                      ></rect>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__close-circle"
                                      viewBox="0 0 16 16"
                                    >
                                      <circle cx="8" cy="8" r="8"></circle>
                                      <path
                                        d="M10.5 5.5l-5 5M5.5 5.5l5 5"
                                        stroke="#FFF"
                                        stroke-width="1.5"
                                        stroke-linecap="square"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__close"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M17.1 4.3l-1.4-1.4-5.7 5.7-5.7-5.7-1.4 1.4 5.7 5.7-5.7 5.7 1.4 1.4 5.7-5.7 5.7 5.7 1.4-1.4-5.7-5.7z"></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__arrow-right"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M16 8.1l-8.1 8.1-1.1-1.1L13 8.9H0V7.3h13L6.8 1.1 7.9 0 16 8.1z"></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-google-pay-light"
                                      viewBox="0 0 41 17"
                                    >
                                      <path
                                        d="M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .991-.36 1.819-1.08 2.482-.697.665-1.559.996-2.583.996h-2.485v.001zM27.194 10.442c0 .392.166.718.499.98.332.26.722.391 1.168.391.633 0 1.196-.234 1.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61 0-1.12.148-1.528.442-.409.294-.613.657-.613 1.093m1.946-5.815c1.112 0 1.989.297 2.633.89.642.594.964 1.408.964 2.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45 1.372-2.486 1.372-.882 0-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96 0-.828.313-1.486.94-1.976s1.463-.735 2.51-.735c.892 0 1.629.163 2.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132 2.132 0 0 0-1.455-.547c-.84 0-1.504.353-1.995 1.062l-1.324-.834c.73-1.045 1.81-1.568 3.238-1.568M40.993 4.889l-5.02 11.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387 5.749h.032l2.322-5.75z"
                                        fill="#ffffff"
                                      ></path>
                                      <path
                                        d="M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944"
                                        fill="rgb(66, 133, 244)"
                                      ></path>
                                      <path
                                        d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703"
                                        fill="rgb(52, 168, 83)"
                                      ></path>
                                      <path
                                        d="M3.212 8.267a4.034 4.034 0 0 1 0-2.572V3.964H.978A6.678 6.678 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017l2.234-1.731z"
                                        fill="rgb(251, 188, 5)"
                                      ></path>
                                      <path
                                        d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.728 6.728 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774"
                                        fill="rgb(234, 67, 53)"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-google-pay-dark"
                                      viewBox="0 0 41 17"
                                    >
                                      <path
                                        d="M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .991-.36 1.819-1.08 2.482-.697.665-1.559.996-2.583.996h-2.485v.001zM27.194 10.442c0 .392.166.718.499.98.332.26.722.391 1.168.391.633 0 1.196-.234 1.692-.701.497-.469.744-1.019.744-1.65-.469-.37-1.123-.555-1.962-.555-.61 0-1.12.148-1.528.442-.409.294-.613.657-.613 1.093m1.946-5.815c1.112 0 1.989.297 2.633.89.642.594.964 1.408.964 2.442v4.932h-1.439v-1.11h-.065c-.622.914-1.45 1.372-2.486 1.372-.882 0-1.621-.262-2.215-.784-.594-.523-.891-1.176-.891-1.96 0-.828.313-1.486.94-1.976s1.463-.735 2.51-.735c.892 0 1.629.163 2.206.49v-.344c0-.522-.207-.966-.621-1.33a2.132 2.132 0 0 0-1.455-.547c-.84 0-1.504.353-1.995 1.062l-1.324-.834c.73-1.045 1.81-1.568 3.238-1.568M40.993 4.889l-5.02 11.53H34.42l1.864-4.034-3.302-7.496h1.635l2.387 5.749h.032l2.322-5.75z"
                                        fill="rgb(0, 0, 0, 0.55)"
                                      ></path>
                                      <path
                                        d="M13.448 7.134c0-.473-.04-.93-.116-1.366H6.988v2.588h3.634a3.11 3.11 0 0 1-1.344 2.042v1.68h2.169c1.27-1.17 2.001-2.9 2.001-4.944"
                                        fill="rgb(66, 133, 244)"
                                      ></path>
                                      <path
                                        d="M6.988 13.7c1.816 0 3.344-.595 4.459-1.621l-2.169-1.681c-.603.406-1.38.643-2.29.643-1.754 0-3.244-1.182-3.776-2.774H.978v1.731a6.728 6.728 0 0 0 6.01 3.703"
                                        fill="rgb(52, 168, 83)"
                                      ></path>
                                      <path
                                        d="M3.212 8.267a4.034 4.034 0 0 1 0-2.572V3.964H.978A6.678 6.678 0 0 0 .261 6.98c0 1.085.26 2.11.717 3.017l2.234-1.731z"
                                        fill="rgb(251, 188, 5)"
                                      ></path>
                                      <path
                                        d="M6.988 2.921c.992 0 1.88.34 2.58 1.008v.001l1.92-1.918C10.324.928 8.804.262 6.989.262a6.728 6.728 0 0 0-6.01 3.702l2.234 1.731c.532-1.592 2.022-2.774 3.776-2.774"
                                        fill="rgb(234, 67, 53)"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-facebook-pay-dark"
                                      viewBox="0 0 300 50"
                                    >
                                      <path
                                        d="M277.374 25.35a330.858 330.858 0 0 1-5.496-14.28h6.355c1.122 3.701 2.393 7.365 3.739 11.066 1.383 3.7 2.803 7.364 4.336 10.953a271.222 271.222 0 0 0 7.29-22.019h6.131a183.26 183.26 0 0 1-2.692 7.963 500.958 500.958 0 0 1-3.402 9.159c-1.271 3.29-2.766 6.99-4.411 11.028-1.57 3.813-3.327 6.542-5.196 8.224-1.907 1.645-4.225 2.505-7.028 2.505a11.37 11.37 0 0 1-2.243-.225v-5.046c.374.037.673.074.897.112h.673c1.645 0 3.028-.449 4.149-1.309 1.122-.86 2.131-2.28 3.066-4.299-2.168-4.523-4.187-9.121-6.131-13.832h-.037Zm-9.795 13.421h-5.682v-3.888c-1.009 1.458-2.28 2.58-3.85 3.365-1.571.785-3.328 1.196-5.309 1.196-2.467 0-4.635-.636-6.505-1.87-1.906-1.233-3.364-2.99-4.448-5.158-1.084-2.206-1.608-4.71-1.608-7.514 0-2.804.561-5.346 1.645-7.552 1.084-2.168 2.617-3.887 4.561-5.121 1.944-1.234 4.187-1.87 6.692-1.87 1.906 0 3.588.375 5.121 1.122 1.495.748 2.766 1.795 3.738 3.14v-3.55h5.683v27.775l-.038-.075Zm-5.794-18.056c-.636-1.57-1.608-2.841-2.953-3.738-1.346-.898-2.879-1.384-4.636-1.384-2.467 0-4.449.823-5.944 2.505-1.458 1.682-2.205 3.925-2.205 6.767 0 2.84.71 5.121 2.13 6.803 1.421 1.682 3.327 2.505 5.795 2.505 1.794 0 3.402-.449 4.785-1.383 1.383-.935 2.43-2.168 3.028-3.739v-8.336ZM209 1.5h14.131c4.747 0 8.411 1.084 10.99 3.252 2.58 2.169 3.888 5.234 3.888 9.271 0 4.038-1.271 7.103-3.85 9.271-2.58 2.169-6.243 3.253-11.028 3.253h-8.038v12.261H209V1.5Zm13.645 19.551c3.14 0 5.42-.56 6.916-1.72 1.495-1.158 2.243-2.915 2.243-5.27 0-2.355-.748-4.225-2.243-5.346-1.496-1.122-3.813-1.72-6.916-1.72h-7.552v14.056h7.552ZM71.937 1.249h7.429l12.63 22.85 12.632-22.85h7.268v37.546h-6.06V10.019L94.758 29.946h-5.686L77.997 10.019v28.776h-6.06V1.249Zm58.947 13.999c-4.346 0-6.964 3.27-7.59 7.32h14.75c-.304-4.171-2.711-7.32-7.16-7.32Zm-13.598 9.628c0-8.522 5.508-14.725 13.703-14.725 8.061 0 12.875 6.124 12.875 15.18v1.665h-20.57c.73 4.405 3.653 7.374 8.367 7.374 3.761 0 6.112-1.147 8.34-3.246l3.22 3.943c-3.033 2.79-6.891 4.398-11.775 4.398-8.872 0-14.16-6.47-14.16-14.589Zm33.926-9.09h-5.579v-4.963h5.579V2.618h5.846v8.205h8.475v4.962h-8.475v12.577c0 4.294 1.373 5.82 4.747 5.82 1.541 0 2.424-.132 3.728-.35v4.909c-1.625.459-3.176.67-4.854.67-6.312 0-9.467-3.449-9.467-10.352V15.785v.001Zm38.941 4.825c-1.174-2.965-3.794-5.148-7.644-5.148-5.003 0-8.205 3.55-8.205 9.333 0 5.638 2.948 9.36 7.966 9.36 3.944 0 6.76-2.296 7.883-5.15V20.61v.001ZM196 38.795h-5.739v-3.916c-1.605 2.305-4.524 4.586-9.253 4.586-7.604 0-12.686-6.366-12.686-14.67 0-8.381 5.204-14.644 13.009-14.644 3.858 0 6.885 1.543 8.93 4.266v-3.594H196v27.972Z"
                                        fill="#000000"
                                      ></path>
                                      <path
                                        d="M6.422 26.042c0 2.27.498 4.013 1.15 5.068.853 1.38 2.127 1.966 3.425 1.966 1.675 0 3.207-.415 6.16-4.499 2.364-3.273 5.151-7.867 7.027-10.747l3.175-4.88c2.206-3.388 4.76-7.155 7.687-9.708C37.436 1.158 40.015 0 42.61 0c4.357 0 8.506 2.524 11.682 7.259 3.475 5.185 5.162 11.717 5.162 18.457 0 4.007-.79 6.95-2.133 9.277-1.299 2.25-3.83 4.497-8.086 4.497v-6.414c3.645 0 4.554-3.35 4.554-7.182 0-5.463-1.273-11.525-4.079-15.856-1.99-3.073-4.571-4.95-7.41-4.95-3.07 0-5.54 2.316-8.317 6.445-1.477 2.193-2.992 4.867-4.694 7.883l-1.873 3.318c-3.763 6.672-4.716 8.192-6.597 10.7-3.298 4.391-6.114 6.056-9.82 6.056-4.398 0-7.18-1.905-8.901-4.774C.69 32.377 0 29.309 0 25.813l6.422.23v-.001Z"
                                        fill="#0081FB"
                                      ></path>
                                      <path
                                        d="M5.063 7.712C8.007 3.174 12.256 0 17.13 0c2.823 0 5.628.835 8.558 3.227 3.204 2.616 6.62 6.922 10.881 14.02l1.528 2.547c3.688 6.145 5.787 9.306 7.015 10.797 1.58 1.914 2.686 2.485 4.123 2.485 3.645 0 4.554-3.35 4.554-7.182l5.665-.178c0 4.007-.79 6.95-2.133 9.277-1.299 2.25-3.83 4.496-8.086 4.496-2.647 0-4.991-.574-7.584-3.02-1.993-1.877-4.323-5.212-6.116-8.21l-5.332-8.907c-2.675-4.47-5.13-7.803-6.55-9.312-1.528-1.623-3.492-3.583-6.626-3.583-2.537 0-4.691 1.78-6.494 4.503L5.064 7.712h-.001Z"
                                        fill="url(#meta-pay-button__a)"
                                      ></path>
                                      <path
                                        d="M17.026 6.457c-2.537 0-4.691 1.78-6.494 4.503-2.55 3.848-4.11 9.579-4.11 15.082 0 2.27.498 4.013 1.15 5.068l-5.476 3.606C.691 32.377 0 29.309 0 25.813c0-6.358 1.745-12.984 5.063-18.101C8.007 3.174 12.256 0 17.13 0l-.103 6.457h-.001Z"
                                        fill="url(#meta-pay-button__b)"
                                      ></path>
                                      <defs>
                                        <linearGradient
                                          id="meta-pay-button__a"
                                          x1="12.612"
                                          y1="24.19"
                                          x2="53.549"
                                          y2="26.257"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#0064E1"></stop>
                                          <stop
                                            offset=".4"
                                            stop-color="#0064E1"
                                          ></stop>
                                          <stop
                                            offset=".83"
                                            stop-color="#0073EE"
                                          ></stop>
                                          <stop
                                            offset="1"
                                            stop-color="#0082FB"
                                          ></stop>
                                        </linearGradient>
                                        <linearGradient
                                          id="meta-pay-button__b"
                                          x1="9.304"
                                          y1="28.738"
                                          x2="9.304"
                                          y2="13.646"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#0082FB"></stop>
                                          <stop
                                            offset="1"
                                            stop-color="#0064E0"
                                          ></stop>
                                        </linearGradient>
                                      </defs>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-facebook-pay-light"
                                      viewBox="0 0 300 50"
                                    >
                                      <path
                                        d="M277.374 25.35a330.858 330.858 0 0 1-5.496-14.28h6.355c1.122 3.701 2.393 7.365 3.739 11.066 1.383 3.7 2.803 7.364 4.336 10.953a271.222 271.222 0 0 0 7.29-22.019h6.131a183.26 183.26 0 0 1-2.692 7.963 500.958 500.958 0 0 1-3.402 9.159c-1.271 3.29-2.766 6.99-4.411 11.028-1.57 3.813-3.327 6.542-5.196 8.224-1.907 1.645-4.225 2.505-7.028 2.505a11.37 11.37 0 0 1-2.243-.225v-5.046c.374.037.673.074.897.112h.673c1.645 0 3.028-.449 4.149-1.309 1.122-.86 2.131-2.28 3.066-4.299-2.168-4.523-4.187-9.121-6.131-13.832h-.037Zm-9.795 13.421h-5.682v-3.888c-1.009 1.458-2.28 2.58-3.85 3.365-1.571.785-3.328 1.196-5.309 1.196-2.467 0-4.635-.636-6.505-1.87-1.906-1.233-3.364-2.99-4.448-5.158-1.084-2.206-1.608-4.71-1.608-7.514 0-2.804.561-5.346 1.645-7.552 1.084-2.168 2.617-3.887 4.561-5.121 1.944-1.234 4.187-1.87 6.692-1.87 1.906 0 3.588.375 5.121 1.122 1.495.748 2.766 1.795 3.738 3.14v-3.55h5.683v27.775l-.038-.075Zm-5.794-18.056c-.636-1.57-1.608-2.841-2.953-3.738-1.346-.898-2.879-1.384-4.636-1.384-2.467 0-4.449.823-5.944 2.505-1.458 1.682-2.205 3.925-2.205 6.767 0 2.84.71 5.121 2.13 6.803 1.421 1.682 3.327 2.505 5.795 2.505 1.794 0 3.402-.449 4.785-1.383 1.383-.935 2.43-2.168 3.028-3.739v-8.336ZM209 1.5h14.131c4.747 0 8.411 1.084 10.99 3.252 2.58 2.169 3.888 5.234 3.888 9.271 0 4.038-1.271 7.103-3.85 9.271-2.58 2.169-6.243 3.253-11.028 3.253h-8.038v12.261H209V1.5Zm13.645 19.551c3.14 0 5.42-.56 6.916-1.72 1.495-1.158 2.243-2.915 2.243-5.27 0-2.355-.748-4.225-2.243-5.346-1.496-1.122-3.813-1.72-6.916-1.72h-7.552v14.056h7.552ZM71.937 1.249h7.429l12.63 22.85 12.632-22.85h7.268v37.546h-6.06V10.019L94.758 29.946h-5.686L77.997 10.019v28.776h-6.06V1.249Zm58.947 13.999c-4.346 0-6.964 3.27-7.59 7.32h14.75c-.304-4.171-2.711-7.32-7.16-7.32Zm-13.598 9.628c0-8.522 5.508-14.725 13.703-14.725 8.061 0 12.875 6.124 12.875 15.18v1.665h-20.57c.73 4.405 3.653 7.374 8.367 7.374 3.761 0 6.112-1.147 8.34-3.246l3.22 3.943c-3.033 2.79-6.891 4.398-11.775 4.398-8.872 0-14.16-6.47-14.16-14.589Zm33.926-9.09h-5.579v-4.963h5.579V2.618h5.846v8.205h8.475v4.962h-8.475v12.577c0 4.294 1.373 5.82 4.747 5.82 1.541 0 2.424-.132 3.728-.35v4.909c-1.625.459-3.176.67-4.854.67-6.312 0-9.467-3.449-9.467-10.352V15.785v.001Zm38.941 4.825c-1.174-2.965-3.794-5.148-7.644-5.148-5.003 0-8.205 3.55-8.205 9.333 0 5.638 2.948 9.36 7.966 9.36 3.944 0 6.76-2.296 7.883-5.15V20.61v.001ZM196 38.795h-5.739v-3.916c-1.605 2.305-4.524 4.586-9.253 4.586-7.604 0-12.686-6.366-12.686-14.67 0-8.381 5.204-14.644 13.009-14.644 3.858 0 6.885 1.543 8.93 4.266v-3.594H196v27.972Z"
                                        fill="#fff"
                                      ></path>
                                      <path
                                        d="M6.422 26.042c0 2.27.498 4.013 1.15 5.068.853 1.38 2.127 1.966 3.425 1.966 1.675 0 3.207-.415 6.16-4.499 2.364-3.273 5.151-7.867 7.027-10.747l3.175-4.88c2.206-3.388 4.76-7.155 7.687-9.708C37.436 1.158 40.015 0 42.61 0c4.357 0 8.506 2.524 11.682 7.259 3.475 5.185 5.162 11.717 5.162 18.457 0 4.007-.79 6.95-2.133 9.277-1.299 2.25-3.83 4.497-8.086 4.497v-6.414c3.645 0 4.554-3.35 4.554-7.182 0-5.463-1.273-11.525-4.079-15.856-1.99-3.073-4.571-4.95-7.41-4.95-3.07 0-5.54 2.316-8.317 6.445-1.477 2.193-2.992 4.867-4.694 7.883l-1.873 3.318c-3.763 6.672-4.716 8.192-6.597 10.7-3.298 4.391-6.114 6.056-9.82 6.056-4.398 0-7.18-1.905-8.901-4.774C.69 32.377 0 29.309 0 25.813l6.422.23v-.001Z"
                                        fill="#0081FB"
                                      ></path>
                                      <path
                                        d="M5.063 7.712C8.007 3.174 12.256 0 17.13 0c2.823 0 5.628.835 8.558 3.227 3.204 2.616 6.62 6.922 10.881 14.02l1.528 2.547c3.688 6.145 5.787 9.306 7.015 10.797 1.58 1.914 2.686 2.485 4.123 2.485 3.645 0 4.554-3.35 4.554-7.182l5.665-.178c0 4.007-.79 6.95-2.133 9.277-1.299 2.25-3.83 4.496-8.086 4.496-2.647 0-4.991-.574-7.584-3.02-1.993-1.877-4.323-5.212-6.116-8.21l-5.332-8.907c-2.675-4.47-5.13-7.803-6.55-9.312-1.528-1.623-3.492-3.583-6.626-3.583-2.537 0-4.691 1.78-6.494 4.503L5.064 7.712h-.001Z"
                                        fill="url(#meta-pay-button__a)"
                                      ></path>
                                      <path
                                        d="M17.026 6.457c-2.537 0-4.691 1.78-6.494 4.503-2.55 3.848-4.11 9.579-4.11 15.082 0 2.27.498 4.013 1.15 5.068l-5.476 3.606C.691 32.377 0 29.309 0 25.813c0-6.358 1.745-12.984 5.063-18.101C8.007 3.174 12.256 0 17.13 0l-.103 6.457h-.001Z"
                                        fill="url(#meta-pay-button__b)"
                                      ></path>
                                      <defs>
                                        <linearGradient
                                          id="meta-pay-button__a"
                                          x1="12.612"
                                          y1="24.19"
                                          x2="53.549"
                                          y2="26.257"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#0064E1"></stop>
                                          <stop
                                            offset=".4"
                                            stop-color="#0064E1"
                                          ></stop>
                                          <stop
                                            offset=".83"
                                            stop-color="#0073EE"
                                          ></stop>
                                          <stop
                                            offset="1"
                                            stop-color="#0082FB"
                                          ></stop>
                                        </linearGradient>
                                        <linearGradient
                                          id="meta-pay-button__b"
                                          x1="9.304"
                                          y1="28.738"
                                          x2="9.304"
                                          y2="13.646"
                                          gradientUnits="userSpaceOnUse"
                                        >
                                          <stop stop-color="#0082FB"></stop>
                                          <stop
                                            offset="1"
                                            stop-color="#0064E0"
                                          ></stop>
                                        </linearGradient>
                                      </defs>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-amazon-pay"
                                      viewBox="0 0 102 20"
                                    >
                                      <path
                                        d="M75.19 1.786c-.994 0-1.933.326-2.815.98v5.94c.896.683 1.82 1.023 2.774 1.023 1.932 0 2.899-1.32 2.899-3.96 0-2.655-.953-3.983-2.858-3.983zm-2.962-.277A5.885 5.885 0 0 1 73.93.444a4.926 4.926 0 0 1 1.85-.362c.672 0 1.282.127 1.827.383a3.763 3.763 0 0 1 1.387 1.108c.378.482.669 1.068.872 1.757.203.689.305 1.466.305 2.332 0 .88-.109 1.675-.326 2.385-.217.71-.522 1.314-.914 1.81a4.137 4.137 0 0 1-1.429 1.16 4.165 4.165 0 0 1-1.87.416c-1.26 0-2.346-.419-3.256-1.256v4.983c0 .284-.14.426-.42.426h-1.24c-.28 0-.42-.142-.42-.426V.827c0-.284.14-.426.42-.426h.925c.28 0 .441.142.483.426l.105.682zm13.194 8.37a4.21 4.21 0 0 0 1.45-.277 5.463 5.463 0 0 0 1.45-.81V6.62c-.35-.085-.719-.152-1.104-.202a8.8 8.8 0 0 0-1.124-.075c-1.583 0-2.374.617-2.374 1.853 0 .54.147.955.441 1.246.294.29.715.437 1.261.437zm-2.458-7.625l-.158.053a.561.561 0 0 1-.179.033c-.182 0-.273-.128-.273-.384V1.38c0-.199.028-.337.084-.415.056-.078.169-.153.337-.224.448-.199 1-.359 1.66-.48.657-.12 1.316-.18 1.974-.18 1.33 0 2.311.277 2.942.83.63.554.945 1.413.945 2.577v7.284c0 .284-.14.426-.42.426h-.903c-.267 0-.42-.135-.463-.405l-.105-.702a5.74 5.74 0 0 1-1.67 1.022 4.908 4.908 0 0 1-1.817.362c-1.009 0-1.807-.288-2.395-.863-.589-.575-.883-1.345-.883-2.31 0-1.037.364-1.864 1.092-2.481.73-.618 1.71-.927 2.942-.927.784 0 1.667.12 2.647.362V3.852c0-.767-.168-1.307-.504-1.619-.336-.313-.925-.469-1.764-.469-.982 0-2.01.163-3.09.49zm14.16 10.84c-.379.98-.816 1.683-1.314 2.109-.496.426-1.144.639-1.943.639-.448 0-.847-.05-1.197-.15a.606.606 0 0 1-.336-.202c-.07-.093-.105-.237-.105-.437V14.5c0-.27.105-.405.315-.405.07 0 .175.014.315.043.14.028.33.043.567.043.532 0 .946-.128 1.24-.384.294-.255.56-.724.798-1.406l.4-1.086-4.056-10.137c-.098-.241-.146-.411-.146-.511 0-.17.097-.256.294-.256h1.26c.224 0 .378.036.463.106.083.072.167.228.251.47l2.942 8.263L99.708.976c.084-.24.168-.397.252-.469.084-.07.238-.106.462-.106h1.177c.196 0 .294.086.294.256 0 .1-.05.27-.147.51l-4.622 11.927M40.15 15.47c-3.761 2.814-9.216 4.31-13.912 4.31-6.583 0-12.51-2.466-16.996-6.572-.352-.322-.038-.763.385-.513 4.84 2.855 10.825 4.574 17.006 4.574 4.17 0 8.753-.877 12.971-2.691.636-.273 1.17.425.547.891"
                                        fill="#333E48"
                                      ></path>
                                      <path
                                        d="M41.717 13.657c-.482-.624-3.181-.296-4.394-.148-.368.044-.425-.281-.093-.517 2.153-1.533 5.682-1.09 6.092-.577.413.518-.108 4.104-2.127 5.816-.31.263-.605.122-.468-.225.455-1.15 1.471-3.724.99-4.349M37.429 2.06V.57A.365.365 0 0 1 37.8.193l6.59-.001c.21 0 .38.155.38.376v1.278c-.003.214-.18.494-.496.938L40.86 7.722c1.267-.03 2.607.163 3.757.818.26.148.33.367.35.582v1.59c0 .218-.237.472-.485.34-2.028-1.077-4.718-1.194-6.96.013-.23.124-.47-.126-.47-.345V9.209c0-.242.005-.656.246-1.024l3.953-5.75H37.81a.369.369 0 0 1-.38-.375M13.4 11.365h-2.005a.38.38 0 0 1-.358-.343L11.038.595a.38.38 0 0 1 .387-.375h1.866a.38.38 0 0 1 .365.35v1.36h.037C14.18.615 15.096 0 16.331 0c1.253 0 2.039.614 2.6 1.93C19.418.615 20.521 0 21.7 0c.842 0 1.758.351 2.32 1.141.635.878.505 2.15.505 3.27l-.002 6.58a.38.38 0 0 1-.387.374h-2.001a.378.378 0 0 1-.36-.374V5.463c0-.438.037-1.535-.056-1.952-.15-.703-.6-.9-1.179-.9-.486 0-.991.33-1.197.855-.206.527-.188 1.405-.188 1.997v5.527a.38.38 0 0 1-.386.375h-2.002a.379.379 0 0 1-.36-.374l-.001-5.528c0-1.163.186-2.874-1.235-2.874-1.44 0-1.384 1.668-1.384 2.874l-.001 5.527a.38.38 0 0 1-.387.375m37.059-9.236c-1.478 0-1.571 2.04-1.571 3.312 0 1.273-.02 3.993 1.552 3.993 1.554 0 1.628-2.194 1.628-3.532 0-.877-.038-1.93-.3-2.764-.224-.724-.673-1.01-1.31-1.01zM50.439 0c2.975 0 4.584 2.59 4.584 5.88 0 3.181-1.777 5.705-4.584 5.705-2.918 0-4.508-2.59-4.508-5.814C45.93 2.523 47.539 0 50.439 0zm8.441 11.365h-1.997a.379.379 0 0 1-.36-.374L56.52.561a.381.381 0 0 1 .386-.34L58.764.22c.175.009.32.13.356.291v1.595h.038C59.72.68 60.505 0 61.89 0c.898 0 1.778.329 2.339 1.229.524.834.524 2.237.524 3.247v6.561a.382.382 0 0 1-.385.328H62.36a.38.38 0 0 1-.357-.328V5.376c0-1.141.13-2.809-1.253-2.809-.487 0-.936.33-1.16.834-.281.636-.319 1.272-.319 1.975v5.614a.386.386 0 0 1-.39.375m-24.684.075a.41.41 0 0 1-.473.047c-.665-.56-.785-.82-1.149-1.354-1.1 1.136-1.879 1.477-3.304 1.477-1.687 0-3-1.055-3-3.166 0-1.65.882-2.77 2.138-3.32 1.087-.484 2.606-.572 3.769-.704v-.264c0-.484.037-1.055-.245-1.473-.243-.374-.712-.528-1.124-.528-.765 0-1.444.397-1.611 1.22-.035.183-.167.364-.348.374l-1.943-.214c-.164-.037-.346-.17-.299-.425C27.055.721 29.183 0 31.09 0c.975 0 2.25.263 3.018 1.011.975.924.881 2.155.881 3.497v3.165c0 .952.39 1.37.757 1.882.128.185.156.405-.007.54-.409.348-1.136.988-1.537 1.35l-.005-.005zm-2.02-4.953v-.44c-1.45 0-2.98.314-2.98 2.045 0 .88.45 1.473 1.218 1.473.562 0 1.069-.352 1.387-.923.394-.704.376-1.363.376-2.155zM7.926 11.44a.41.41 0 0 1-.473.047c-.667-.56-.786-.82-1.15-1.354C5.204 11.27 4.425 11.61 3 11.61c-1.688 0-3-1.055-3-3.166 0-1.65.88-2.77 2.137-3.32 1.087-.484 2.606-.572 3.768-.704v-.264c0-.484.038-1.055-.243-1.473-.244-.374-.713-.528-1.125-.528-.764 0-1.444.397-1.61 1.22-.036.183-.168.364-.35.374l-1.94-.214c-.165-.037-.347-.17-.3-.425C.783.721 2.911 0 4.818 0c.975 0 2.25.263 3.018 1.011.975.924.882 2.155.882 3.497v3.165c0 .952.39 1.37.756 1.882.128.185.157.405-.006.54a78.47 78.47 0 0 0-1.537 1.35l-.005-.005zm-2.02-4.953v-.44c-1.45 0-2.982.314-2.982 2.045 0 .88.45 1.473 1.219 1.473.562 0 1.069-.352 1.387-.923.394-.704.375-1.363.375-2.155z"
                                        fill="#333E48"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-apple-pay-dark"
                                      viewBox="0 0 43 19"
                                    >
                                      <path
                                        d="M6.948 1.409C7.934.147 9.305.147 9.305.147s.193 1.18-.771 2.316c-1.05 1.2-2.228.993-2.228.993s-.236-.93.642-2.047zM3.82 3.663c-1.735 0-3.6 1.51-3.6 4.363 0 2.916 2.186 6.555 3.943 6.555.6 0 1.543-.6 2.485-.6.922 0 1.607.559 2.464.559 1.907 0 3.322-3.826 3.322-3.826s-2.015-.744-2.015-2.936c0-1.944 1.629-2.73 1.629-2.73s-.836-1.447-2.936-1.447c-1.22 0-2.164.661-2.656.661-.622.021-1.5-.6-2.636-.6zM19.64 1.426c2.453 0 4.188 1.788 4.188 4.396 0 2.608-1.755 4.417-4.248 4.417h-2.932v4.564h-1.974V1.426h4.966zm-2.992 7.067h2.473c1.695 0 2.693-.967 2.693-2.65 0-1.683-.978-2.671-2.693-2.671h-2.473v5.321zm7.559 3.429c0-1.767 1.296-2.777 3.65-2.945l2.572-.147v-.78c0-1.156-.738-1.787-1.994-1.787-1.037 0-1.795.568-1.955 1.43h-1.775c.06-1.788 1.656-3.092 3.79-3.092 2.333 0 3.829 1.304 3.829 3.281v6.9h-1.815v-1.684h-.04c-.519 1.094-1.715 1.788-3.012 1.788-1.934.021-3.25-1.178-3.25-2.965zm6.222-.905v-.778l-2.313.168c-1.297.084-1.975.59-1.975 1.494 0 .862.718 1.409 1.815 1.409 1.396-.021 2.473-.968 2.473-2.293zm3.969 7.383v-1.64c.14.041.438.041.598.041.897 0 1.416-.4 1.735-1.472l.14-.526L33.4 4.707h2.054l2.453 8.224h.04L40.4 4.707h1.994l-3.57 10.538c-.818 2.419-1.715 3.197-3.67 3.197-.14.02-.598-.021-.757-.042z"
                                        fill="#000000"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-apple-pay-light"
                                      viewBox="0 0 43 19"
                                    >
                                      <path
                                        d="M6.948 1.409C7.934.147 9.305.147 9.305.147s.193 1.18-.771 2.316c-1.05 1.2-2.228.993-2.228.993s-.236-.93.642-2.047zM3.82 3.663c-1.735 0-3.6 1.51-3.6 4.363 0 2.916 2.186 6.555 3.943 6.555.6 0 1.543-.6 2.485-.6.922 0 1.607.559 2.464.559 1.907 0 3.322-3.826 3.322-3.826s-2.015-.744-2.015-2.936c0-1.944 1.629-2.73 1.629-2.73s-.836-1.447-2.936-1.447c-1.22 0-2.164.661-2.656.661-.622.021-1.5-.6-2.636-.6zM19.64 1.426c2.453 0 4.188 1.788 4.188 4.396 0 2.608-1.755 4.417-4.248 4.417h-2.932v4.564h-1.974V1.426h4.966zm-2.992 7.067h2.473c1.695 0 2.693-.967 2.693-2.65 0-1.683-.978-2.671-2.693-2.671h-2.473v5.321zm7.559 3.429c0-1.767 1.296-2.777 3.65-2.945l2.572-.147v-.78c0-1.156-.738-1.787-1.994-1.787-1.037 0-1.795.568-1.955 1.43h-1.775c.06-1.788 1.656-3.092 3.79-3.092 2.333 0 3.829 1.304 3.829 3.281v6.9h-1.815v-1.684h-.04c-.519 1.094-1.715 1.788-3.012 1.788-1.934.021-3.25-1.178-3.25-2.965zm6.222-.905v-.778l-2.313.168c-1.297.084-1.975.59-1.975 1.494 0 .862.718 1.409 1.815 1.409 1.396-.021 2.473-.968 2.473-2.293zm3.969 7.383v-1.64c.14.041.438.041.598.041.897 0 1.416-.4 1.735-1.472l.14-.526L33.4 4.707h2.054l2.453 8.224h.04L40.4 4.707h1.994l-3.57 10.538c-.818 2.419-1.715 3.197-3.67 3.197-.14.02-.598-.021-.757-.042z"
                                        fill="#FFFFFF"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-paypal"
                                      viewBox="0 0 67 19"
                                    >
                                      <path
                                        d="M8.44.57H3.29a.718.718 0 0 0-.707.61L.502 14.517c-.041.263.16.5.425.5h2.458a.718.718 0 0 0 .707-.61l.561-3.597a.717.717 0 0 1 .706-.611h1.63c3.391 0 5.349-1.658 5.86-4.944.23-1.437.01-2.566-.657-3.357C11.461 1.029 10.162.57 8.44.57zm.594 4.87C8.752 7.308 7.34 7.308 5.976 7.308h-.777l.545-3.485a.43.43 0 0 1 .424-.366h.356c.93 0 1.807 0 2.26.535.27.32.353.794.25 1.45zm14.796-.06h-2.466a.43.43 0 0 0-.424.367l-.109.696-.172-.252c-.534-.783-1.724-1.044-2.912-1.044-2.725 0-5.052 2.084-5.505 5.008-.235 1.46.1 2.854.919 3.827.75.894 1.826 1.267 3.105 1.267 2.195 0 3.412-1.426 3.412-1.426l-.11.692a.432.432 0 0 0 .424.502h2.22a.718.718 0 0 0 .707-.61l1.333-8.526a.43.43 0 0 0-.423-.5zm-3.437 4.849c-.238 1.422-1.356 2.378-2.782 2.378-.716 0-1.288-.232-1.655-.672-.365-.436-.503-1.058-.387-1.75.222-1.41 1.359-2.397 2.763-2.397.7 0 1.269.235 1.644.678.375.448.524 1.073.417 1.763zM36.96 5.38h-2.478a.716.716 0 0 0-.592.318l-3.417 5.085-1.448-4.887a.719.719 0 0 0-.687-.515h-2.435a.433.433 0 0 0-.407.573l2.73 8.09-2.567 3.66a.434.434 0 0 0 .35.684h2.475a.712.712 0 0 0 .588-.31l8.24-12.016a.434.434 0 0 0-.352-.681z"
                                        fill="rgb(37, 59, 128)"
                                      ></path>
                                      <path
                                        d="M45.163.57h-5.15a.717.717 0 0 0-.706.61l-2.082 13.337a.43.43 0 0 0 .423.5h2.642a.502.502 0 0 0 .494-.427l.591-3.78a.717.717 0 0 1 .706-.611h1.63c3.392 0 5.348-1.658 5.86-4.944.231-1.437.009-2.566-.657-3.357C48.183 1.029 46.886.57 45.163.57zm.593 4.87c-.28 1.867-1.692 1.867-3.057 1.867h-.777l.546-3.485a.429.429 0 0 1 .423-.366h.356c.93 0 1.807 0 2.26.535.27.32.353.794.25 1.45zm14.795-.06h-2.464a.428.428 0 0 0-.423.367l-.109.696-.173-.252c-.534-.783-1.723-1.044-2.911-1.044-2.724 0-5.05 2.084-5.504 5.008-.235 1.46.099 2.854.918 3.827.753.894 1.826 1.267 3.105 1.267 2.195 0 3.413-1.426 3.413-1.426l-.11.692a.432.432 0 0 0 .424.502h2.22a.717.717 0 0 0 .707-.61l1.333-8.526a.433.433 0 0 0-.426-.5zm-3.436 4.849c-.237 1.422-1.356 2.378-2.782 2.378-.714 0-1.288-.232-1.655-.672-.365-.436-.502-1.058-.387-1.75.223-1.41 1.359-2.397 2.763-2.397.7 0 1.269.235 1.644.678.377.448.526 1.073.417 1.763zM63.458.935l-2.113 13.582a.43.43 0 0 0 .423.5h2.124a.716.716 0 0 0 .707-.61L66.683 1.07a.432.432 0 0 0-.423-.5h-2.379c-.21 0-.39.156-.423.366z"
                                        fill="rgb(23, 155, 215)"
                                      ></path>
                                    </symbol>
                                    <symbol
                                      id="shopify-svg__payments-shop-pay"
                                      viewBox="134 256 410 1"
                                    >
                                      <path
                                        d="M241.22,242.74c-3.07-6.44-8.89-10.6-17.66-10.6a17.58,17.58,0,0,0-13.81,7.1l-.32.39V214.39a.55.55,0,0,0-.55-.55h-12.4a.55.55,0,0,0-.54.55v72.4a.54.54,0,0,0,.54.54h13.28a.55.55,0,0,0,.55-.54V255.92c0-6,4-10.25,10.4-10.25,7,0,8.77,5.76,8.77,11.63v29.49a.54.54,0,0,0,.54.54h13.25a.55.55,0,0,0,.55-.54V255.54c0-1.07,0-2.12-.14-3.14A27.63,27.63,0,0,0,241.22,242.74Z"
                                        fill="white"
                                      ></path>
                                      <path
                                        d="M174.91,253.47s-6.76-1.59-9.25-2.23-6.84-2-6.84-5.29,3.51-4.34,7.07-4.34,7.52.86,7.83,4.81a.57.57,0,0,0,.57.52l13.09-.05a.56.56,0,0,0,.56-.6c-.81-12.64-11.9-17.16-22.13-17.16-12.13,0-21,8-21,16.82,0,6.44,1.82,12.48,16.13,16.68,2.51.73,5.92,1.68,8.9,2.51,3.58,1,5.51,2.51,5.51,4.89,0,2.76-4,4.68-7.93,4.68-5.69,0-9.73-2.11-10.06-5.9a.57.57,0,0,0-.57-.5l-13.06.06a.57.57,0,0,0-.57.59c.6,11.93,12.12,18.36,22.86,18.36,16,0,23.23-9,23.23-17.43C189.27,265.93,188.36,256.91,174.91,253.47Z"
                                        style={{ fill: "white" }}
                                      ></path>
                                      <path
                                        d="M343.31,232.12c-6.65,0-12.22,3.68-15.81,8.12v-7.6a.54.54,0,0,0-.53-.54H314.55a.54.54,0,0,0-.54.54v71a.54.54,0,0,0,.54.53h13.29a.53.53,0,0,0,.53-.53V280.3h.2c2.11,3.22,7.88,7.08,15.42,7.08,14.18,0,26-11.76,26-27.65C370,244.48,358.24,232.12,343.31,232.12Zm-1.23,41.73a14.09,14.09,0,1,1,13.74-14.12A13.9,13.9,0,0,1,342.08,273.85Z"
                                        fill="white"
                                      ></path>
                                      <path
                                        d="M274.68,229c-12.39,0-18.57,4.21-23.53,7.58l-.15.1a1.23,1.23,0,0,0-.37,1.63l4.9,8.44a1.24,1.24,0,0,0,.87.6,1.21,1.21,0,0,0,1-.27l.39-.32c2.55-2.14,6.64-5,16.54-5.78,5.51-.44,10.27,1,13.78,4.28,3.86,3.56,6.17,9.31,6.17,15.38,0,11.17-6.58,18.19-17.15,18.33-8.71-.05-14.56-4.59-14.56-11.3,0-3.56,1.61-5.88,4.75-8.2a1.22,1.22,0,0,0,.37-1.56l-4.4-8.32a1.29,1.29,0,0,0-.77-.62,1.24,1.24,0,0,0-1,.13c-4.94,2.93-11,8.29-10.67,18.59.4,13.11,11.3,23.12,25.47,23.53l.71,0H278c16.84-.55,29-13.05,29-30C307,245.66,295.66,229,274.68,229Z"
                                        style={{ fill: "white" }}
                                      ></path>
                                      <path
                                        d="M342.08,245.68a14.09,14.09,0,1,0,13.74,14.05A13.84,13.84,0,0,0,342.08,245.68Z"
                                        fill="rgb(90, 49, 244)"
                                      ></path>
                                      <rect
                                        x="383.23"
                                        y="214.02"
                                        width="141.73"
                                        height="90.42"
                                        rx="14.17"
                                        fill="white"
                                      ></rect>
                                      <path
                                        d="M439.07,246.62c0,9.67-6.77,16.57-16.23,16.57h-8.92a.75.75,0,0,0-.75.75v12.7a.75.75,0,0,1-.75.75h-6.28a.76.76,0,0,1-.75-.75V230.81a.75.75,0,0,1,.75-.75h16.7C432.3,230.06,439.07,237,439.07,246.62Zm-7.78,0c0-5.54-3.79-9.6-8.93-9.6h-8.44a.76.76,0,0,0-.75.75v17.71a.75.75,0,0,0,.75.74h8.44C427.5,256.22,431.29,252.17,431.29,246.62Z"
                                        fill="rgb(90, 49, 244)"
                                      ></path>
                                      <path
                                        d="M440.92,268.6a8.91,8.91,0,0,1,3.72-7.64c2.44-1.83,6.22-2.78,11.83-3l5.95-.2V256c0-3.51-2.36-5-6.15-5s-6.18,1.34-6.74,3.53a.72.72,0,0,1-.72.52h-5.87a.74.74,0,0,1-.75-.85c.88-5.2,5.18-9.15,14.35-9.15,9.74,0,13.25,4.53,13.25,13.18v18.38a.75.75,0,0,1-.75.76h-5.93a.75.75,0,0,1-.75-.76v-1.37a.56.56,0,0,0-1-.39c-1.77,1.93-4.65,3.33-9.24,3.33C445.39,278.2,440.92,274.68,440.92,268.6Zm21.5-4v-1.42l-7.7.4c-4.06.21-6.43,1.9-6.43,4.74,0,2.57,2.17,4,5.95,4C459.38,272.32,462.42,269.54,462.42,264.61Z"
                                        fill="rgb(90, 49, 244)"
                                      ></path>
                                      <path
                                        d="M475.75,291.27v-5.35a.76.76,0,0,1,.9-.75,14.84,14.84,0,0,0,2.75.26,7.11,7.11,0,0,0,7.17-5.07l.39-1.23a.74.74,0,0,0,0-.51l-12.34-31.7a.76.76,0,0,1,.71-1h6a.77.77,0,0,1,.71.49l8.38,22.36a.77.77,0,0,0,1.44,0l7.27-22.3a.75.75,0,0,1,.72-.52H506a.76.76,0,0,1,.71,1l-13.2,35.21c-3,8.18-8.25,10.28-14,10.28a11.17,11.17,0,0,1-3.21-.39A.77.77,0,0,1,475.75,291.27Z"
                                        fill=" rgb(90, 49, 244)"
                                      ></path>
                                    </symbol>
                                  </defs>
                                </svg>
                              </div>
                            </div>
                            <button
                              type="button"
                              class="shopify-payment-button__button shopify-payment-button__button--unbranded BUz42FHpSPncCPJ4Pr_f jjzYeefyWpPZLH9pIgyw RWJ0IfBjxIhflh4AIrUw"
                              data-testid="Checkout-button"
                            >
                              {i18n.t("Buy it now")}
                            </button>
                            <div>
                              <div></div>
                            </div>
                            <div></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </product-form>
              </div>
            </div>
          </div>
        </div>

        <product-modal
          id="ProductModal-template--14473720397887__main"
          class="product-media-modal media-modal"
        >
          <div
            class="product-media-modal__dialog"
            role="dialog"
            aria-label="Media gallery"
            aria-modal="true"
            tabindex="-1"
          >
            <button
              id="ModalClose-template--14473720397887__main"
              type="button"
              class="product-media-modal__toggle"
              aria-label="Close"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                role="presentation"
                class="icon icon-close"
                fill="none"
                viewBox="0 0 18 17"
              >
                <path
                  d="M.865 15.978a.5.5 0 00.707.707l7.433-7.431 7.579 7.282a.501.501 0 00.846-.37.5.5 0 00-.153-.351L9.712 8.546l7.417-7.416a.5.5 0 10-.707-.708L8.991 7.853 1.413.573a.5.5 0 10-.693.72l7.563 7.268-7.418 7.417z"
                  fill="currentColor"
                ></path>
              </svg>
            </button>
            <div
              class="product-media-modal__content"
              role="document"
              aria-label="Media gallery"
              tabindex="0"
            >
              <img
                class="img-fluid mx-auto"
                sizes="(min-width: 768px) calc(100vw - 22rem), 1100px"
                src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/9_1445x.jpg?v=1575011120"
                alt=""
                loading="lazy"
                width="1100"
                height="1100"
                data-media-id="5824576487487"
              />
              <img
                class="img-fluid mx-auto"
                sizes="(min-width: 768px) calc(100vw - 22rem), 1100px"
                src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/10_1445x.jpg?v=1575011120"
                alt=""
                loading="lazy"
                width="1100"
                height="1100"
                data-media-id="5824576520255"
              />
              <img
                class="img-fluid mx-auto"
                sizes="(min-width: 768px) calc(100vw - 22rem), 1100px"
                src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/13_1445x.jpg?v=1575011120"
                alt=""
                loading="lazy"
                width="1100"
                height="1100"
                data-media-id="5824594051135"
              />
              <img
                class="img-fluid mx-auto"
                sizes="(min-width: 768px) calc(100vw - 22rem), 1100px"
                src="./cdn.shopify.com/s/files/1/0257/0492/3199/products/14_1445x.jpg?v=1575011120"
                alt=""
                loading="lazy"
                width="1100"
                height="1100"
                data-media-id="5824594116671"
              />
            </div>
          </div>
        </product-modal>
      </Modal>
    </>
  );
}
