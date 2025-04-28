import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetProducts } from "../../services";
import { Apis } from "../../services/Api/config";
import { useSelector } from "react-redux";
import ModalProductDetails from "./product-details-modal";
import Slider from "react-slick";
import { cartActions } from "../../store/shopping-cart/cartSlice";
import { wishlistActions } from "../../store/wislist/wishlistSlice";
import { useDispatch } from "react-redux";
import i18n from "../../i18n";
import CartNotification from "./../Notification";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import "../Categories/style.css"
const Products = () => {
  const [open, setopen] = useState("none");
  const [products, setproducts] = useState([]);
  const [product, setProduct] = useState({});
  const [show, setshow] = useState("none");
  const [productNotif, setproductNotif] = useState({});
  const [indexColors, setIndexColors] = useState(
    Array(products.length).fill(0)
  );
  const wishlist = useSelector((state) => state.wishlist.wishlistItems);
  const [index, setIndex] = useState(0);

  //console.log("wishlist",wishlist)
  //const [settings, setSettings] = useState({})
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
  const deleteWishlist = (e) => {
    //console.log(e)
    dispatch(wishlistActions.deleteItem(e.id));
  };
  const openProduct = (product, i) => {
    setProduct(product);
    setIndexColors(i);
    open === "none" ? setopen("inline-block") : setopen("none");
  };

  const getList = async () => {
    var list1 = await GetProducts.getAllProductsGroup();
  
    if (list1) {
     let  list=[]
      Object.values(list1.data).map(l=>{
      
        Object.values(l).map(l1=>{
          list.push(l1)
        })
      })
      setIndexColors(Array(list1.data?.length).fill(0));
      setproducts(list);
    }
  };
  const settings1 = {
    //dots: false,
    //arrows: true,
    //infinite: false,
    //autoplay: false,
    className: "owl-toppro",
    //autoplaySpeed: 2000,
    //slidesToShow: 4,
    touchThreshold: 5,
    useCSS: !0,
    //rtl: false,
    accessibility: !0,
    adaptiveHeight: !1,
    arrows: !0,
    asNavFor: null,
    autoplay: !1,
    autoplaySpeed: 3e3,
    centerMode: !1,
    //centerPadding:"50px",
    cssEase: "ease",
    dots: !1,
    //dotsClass:"slick-dots",
    draggable: !0,
    easing: "linear",
    edgeFriction: 0.35,
    fade: !1,
    focusOnSelect: !1,
    focusOnChange: !1,
    infinite: !0,
    initialSlide: 0,
    lazyLoad: "ondemand",
    mobileFirst: !1,
    pauseOnHover: !0,
    pauseOnFocus: !0,
    pauseOnDotsHover: !1,
    respondTo: "window",
    //responsive:null,
    // rows:1,
    //rtl:!1,
    slide: "",
    slidesPerRow: 1,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: !0,
    swipeToSlide: !1,
    touchMove: !0,
    useTransform: !0,
    variableWidth: !1,
    vertical: !1,
    verticalSwiping: !1,
    waitForAnimate: !0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 361,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    prevArrow: (
      <button class="slick-prev" aria-label="Previous" type="button">
        <i class="fa fa-angle-left"></i>
      </button>
    ),
    nextArrow: (
      <button class="slick-next" aria-label="Next" type="button">
        <i class="fa fa-angle-right"></i>
      </button>
    ),
  };
  const changeColor = (index, indexProduit) => {
    console.log("index", index);
    const indexColorsMisAJour = [...indexColors];
    indexColorsMisAJour[indexProduit] = index;
    setIndexColors(indexColorsMisAJour);
  };
  useEffect(() => {
    getList();
  }, [open]);
  let z = [];
  products.map(
    (p) =>
      p.filter((prod) => prod.cost_price !== null).length > 0 &&
      z.push(p.filter((prod) => prod.cost_price !== null))
  );
  console.log("products", JSON.stringify(products));
  return (
    <>
      {show === "block" ? (
        <CartNotification product={productNotif} show={show} />
      ) : null}
      <section
        id="shopify-section-template--14270126194751__16542455861c80cea1"
        class="shopify-section spaced-section"
      >
        <div class="product-tab-item">
          <div class="pro-tab tabs">
            <h2 class="heading text-center">
              <span>{i18n.t("Our product")}</span>
            </h2>
            <ul class="list-inline nav nav-tabs text-center">
              <li class="nav-item active">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
                >
                  <span>{i18n.t("all")}</span>
                </a>
              </li>
              <li class="nav-item ">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#wbprodtab1-1ccb1891-b5e1-4fb3-9730-41ac25850458"
                >
                  <span>{i18n.t("new products")}</span>
                </a>
              </li>
              <li class="nav-item ">
                <a
                  class="nav-link"
                  data-toggle="tab"
                  href="#wbprodtab1-71b9c2d5-bb14-4545-80b9-d1c81c7b59a6"
                >
                  <span>{i18n.t("special products")}</span>
                </a>
              </li>
            </ul>
          </div>
          <div class="clearfix"></div>
          <div class="tab-content tab-pro">
            <div
              class="tab-pane fade show active"
              id="wbprodtab1-f25f0917-6051-401a-9571-3dad3669d52d"
            >
              <div class="rless">
                {window.innerWidth <= 1591 ? (
                  <Slider {...settings1} class="owl-toppro ">
                    {products.length > 0
                      ? products.map((product, indexProduit) => {
                          console.log("prodhiiii", indexColors[indexProduit]);
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      { x?.color?.name &&<variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value={p.color?.name}

                                                    //   onChange={(e)=>{changeColor(e)}}

                                                    //checked
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    htmlFor="template--14270126194751__16542455861c80cea1-4397860585535-1-0"
                                                    data-val="Blue"
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                      //   backgroundImage:
                                                      //     "url(./cdn.shopify.com/s/files/1/0257/0492/3199/files/blue_50x50.png)",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          //selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
                                            name="add"
                                            class="cartb product-form__submit button"
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            {wishlist.findIndex(
                                              (e) => e.id === x?.id
                                            ) > -1 ? (
                                              <a
                                                href="# "
                                                class="wishlist"
                                                onClick={() =>
                                                  deleteWishlist(x)
                                                }
                                                title={i18n.t("wishlist")}
                                              >
                                                <span class="wbwishirmv">
                                                  <i class="fa fa-remove"></i>
                                                </span>
                                              </a>
                                            ) : (
                                              <a
                                                href="# "
                                                class="wishlist"
                                                onClick={() => addWishlist(x)}
                                                title={i18n.t("wishlist")}
                                              >
                                                <svg viewBox="0 0 129 129">
                                                  <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                                </svg>
                                                <span class="wbaddwish">
                                                  Add To Wishlist
                                                </span>
                                              </a>
                                            )}
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </Slider>
                ) : (
                  <div class="  owl-toppro ">
                    {products.length > 0
                      ? products.map((product, indexProduit) => {
                          console.log("indexColors", indexColors);
                          console.log("indexProduit", indexProduit);
                          console.log(
                            "indexColors[indexProduit]",
                            indexColors[indexProduit]
                          );
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      { x?.color?.name &&<variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value={p.color?.name}

                                                    //   onChange={(e)=>{changeColor(e)}}

                                                    //checked
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    htmlFor="template--14270126194751__16542455861c80cea1-4397860585535-1-0"
                                                    data-val="Blue"
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                      //   backgroundImage:
                                                      //     "url(./cdn.shopify.com/s/files/1/0257/0492/3199/files/blue_50x50.png)",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          //selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            {wishlist.findIndex(
                                              (e) => e.id === x?.id
                                            ) > -1 ? (
                                              <a
                                                href="# "
                                                class="wishlist"
                                                onClick={() =>
                                                  deleteWishlist(x)
                                                }
                                                title={i18n.t("wishlist")}
                                              >
                                                <span class="wbwishirmv">
                                                  <i class="fa fa-remove"></i>
                                                </span>
                                              </a>
                                            ) : (
                                              <a
                                                href="# "
                                                class="wishlist"
                                                onClick={() => addWishlist(x)}
                                                title={i18n.t("wishlist")}
                                              >
                                                <svg viewBox="0 0 129 129">
                                                  <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                                </svg>
                                                <span class="wbaddwish">
                                                  Add To Wishlist
                                                </span>
                                              </a>
                                            )}
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </div>
                )}
              </div>
            </div>
            <div
              class="tab-pane fade "
              id="wbprodtab1-1ccb1891-b5e1-4fb3-9730-41ac25850458"
            >
              <div class="rless">
                {window.innerWidth <= 1591 ? (
                  <Slider {...settings1} class="  owl-toppro ">
                    {products.length > 0
                      ? products.map((product, indexProduit) => {
                          // console.log("prodhiiii",product)
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          // x ? x:product[0]

                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                     {  x?.color?.name && <variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value="Blue"
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    htmlFor="template--14270126194751__16542455861c80cea1-4397860585535-1-0"
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          //selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
                                            name="add"
                                            class="cartb product-form__submit button"
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            <a
                                              href="# "
                                              class="wishlist"
                                              onClick={() => addWishlist(x)}
                                              title={i18n.t("wishlist")}
                                            >
                                              {" "}
                                              <svg viewBox="0 0 129 129">
                                                <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                              </svg>
                                              <span class="wbaddwish">
                                                Add To Wishlist
                                              </span>
                                            </a>
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </Slider>
                ) : (
                  <div class=" owl-toppro ">
                    {products.length > 0
                      ? products.map((product, indexProduit) => {
                          console.log("prodhiiii", product);
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                     { x?.color?.name && <variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                        data-layout="card"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value="Blue"
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    htmlFor="template--14270126194751__16542455861c80cea1-4397860585535-1-0"
                                                    data-val="Blue"
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                      //   backgroundImage:
                                                      //     "url(./cdn.shopify.com/s/files/1/0257/0492/3199/files/blue_50x50.png)",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          //selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            <a
                                              href="# "
                                              class="wishlist"
                                              onClick={() => addWishlist(x)}
                                              title={i18n.t("wishlist")}
                                            >
                                              {" "}
                                              <svg viewBox="0 0 129 129">
                                                <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                              </svg>
                                              <span class="wbaddwish">
                                                Add To Wishlist
                                              </span>
                                            </a>
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </div>
                )}
              </div>
            </div>
            <div
              class="tab-pane fade "
              id="wbprodtab1-71b9c2d5-bb14-4545-80b9-d1c81c7b59a6"
            >
              <div class="rless">
                {window.innerWidth <= 1591 ? (
                  <Slider {...settings1} class="  owl-toppro ">
                    {z.length > 0
                      ? z.map((product, indexProduit) => {
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          //console.log("x",x)
                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                     { x?.color?.name &&<variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                        data-product="4397860585535"
                                        data-url="/products/bajaj-gx1-500-w-camera"
                                        data-update-url="false"
                                        data-layout="card"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value="Blue"
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                      //   backgroundImage:
                                                      //     "url(./cdn.shopify.com/s/files/1/0257/0492/3199/files/blue_50x50.png)",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          //selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
                                            name="add"
                                            class="cartb product-form__submit button"
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            <a
                                              href="# "
                                              class="wishlist"
                                              onClick={() => addWishlist(x)}
                                              title={i18n.t("wishlist")}
                                            >
                                              {" "}
                                              <svg viewBox="0 0 129 129">
                                                <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                              </svg>
                                              <span class="wbaddwish">
                                                Add To Wishlist
                                              </span>
                                            </a>
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </Slider>
                ) : (
                  <div class="  owl-toppro ">
                    {z.length > 0
                      ? z.map((product, indexProduit) => {
                          console.log(product);
                          //console.log("prodhiiii",product[indexColors[indexProduit]])
                          //let p = product.filter((p) => p.cost_price !== null);
                          let x = product[indexColors[indexProduit]]
                            ? product[indexColors[indexProduit]]
                            : product[0];
                          return (
                            <div
                              class="grid__item col-12 cless list-unstyled"
                              key={x?.id}
                            >
                              <div class="card-wrapper wbproduct-container">
                                <div class="card">
                                  <div class="wbimgblock">
                                    <div
                                      id="webipro-template--14270126194751__16542455861c80cea1-4397860585535"
                                      class="card__media"
                                    >
                                      <div
                                        class="product__media-item"
                                        data-media-id="template--14270126194751__16542455861c80cea1-4397860585535-5824692715583"
                                      >
                                        <Link
                                          to={`/products/${x?.name}`}
                                          title=""
                                          class="media media--transparent media--adapt media--hover-effect "
                                          style={{ paddingBottom: "100.0%" }}
                                        >
                                          <img
                                            class="img-fluid mx-auto"
                                            src={Apis.slug + x?.image}
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
                                        {x?.stock > 0 ? "Dispo" : "Non dispo"}
                                      </span>
                                    </div>
                                  </div>

                                  <div class="wbproductdes">
                                    <p class="wbprotype">{x?.Brand?.name}</p>

                                    <h3 class="product-title">
                                      <Link to={`/products/${x?.reference}`}>
                                        {x?.name}
                                      </Link>
                                    </h3>
                                    <span class="caption-large light"></span>
                                    <div id="ProductInfo-template--14270126194751__16542455861c80cea1-4397860585535">
                                      <div
                                        class="no-js-hidden wbhprice"
                                        id="price-template--14270126194751__16542455861c80cea1-4397860585535"
                                        role="status"
                                      >
                                        <div class="price price--on-sale ">
                                          <div class="price__container">
                                            {x?.cost_price === null ? (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.price}
                                                </span>
                                              </div>
                                            ) : (
                                              <div class="price__sale">
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Sale price
                                                </span>
                                                <span class="price-item price-item--sale price-item--last">
                                                  DA {x?.cost_price}
                                                </span>
                                                <span class="visually-hidden visually-hidden--inline">
                                                  Regular price
                                                </span>
                                                <span>
                                                  <s class="price-item price-item--regular">
                                                    DA {x?.price}
                                                  </s>
                                                </span>
                                              </div>
                                            )}
                                            <small class="unit-price caption hidden">
                                              <span class="visually-hidden">
                                                Unit price
                                              </span>
                                              <span class="price-item price-item--last">
                                                <span></span>
                                                <span aria-hidden="true">
                                                  /
                                                </span>
                                                <span class="visually-hidden">
                                                  &nbsp;per&nbsp;
                                                </span>
                                                <span></span>
                                              </span>
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                      { x?.color?.name && <variant-radios
                                        class="no-js-hidden new-swatch variant-webi"
                                        data-section="template--14270126194751__16542455861c80cea1"
                                      >
                                        <fieldset class="swatchComponent inner-class">
                                          <div class="wbswatchclr">
                                            {product.map((p, index) => {
                                              return (
                                                <>
                                                  <input
                                                    type="radio"
                                                    name="Color"
                                                    value="Blue"
                                                    //   onChange={(e)=>{changeColor(e)}}
                                                    checked={
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? true
                                                        : false
                                                    }
                                                  />

                                                  <label
                                                    className={`color-swatchimg color-swatch ${
                                                      index ===
                                                      indexColors[indexProduit]
                                                        ? "active"
                                                        : ""
                                                    }`}
                                                    htmlFor="template--14270126194751__16542455861c80cea1-4397860585535-1-0"
                                                    onClick={() => {
                                                      changeColor(
                                                        index,
                                                        indexProduit
                                                      );
                                                    }}
                                                    style={{
                                                      backgroundColor:
                                                        p.color?.values,
                                                      marginRight: "3px",
                                                      //   backgroundImage:
                                                      //     "url(./cdn.shopify.com/s/files/1/0257/0492/3199/files/blue_50x50.png)",
                                                    }}
                                                  ></label>
                                                </>
                                              );
                                            })}
                                          </div>
                                        </fieldset>
                                      </variant-radios>}
                                      <select
                                        name="id"
                                        id="Variants-template--14270126194751__16542455861c80cea1-4397860585535"
                                        class="select__select no-js"
                                        form="product-form-template--14270126194751__16542455861c80cea1-f25f0917-6051-401a-9571-3dad3669d52d-4397860585535"
                                      >
                                        <option
                                          data-v-title="Blue"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice="DA 650.00"
                                          // selected="selected"
                                          value="31374910324799"
                                        >
                                          Blue - DA 450.00
                                        </option>
                                        <option
                                          data-v-title="Pink"
                                          data-unitprice=""
                                          data-unitvalue=""
                                          data-price="DA 450.00"
                                          data-cprice=""
                                          value="31374910390335"
                                        >
                                          Pink - DA 450.00
                                        </option>
                                      </select>

                                      <product-form class="product-form">
                                        <div class="button-group">
                                          <div
                                            class="wbquicksuccess hidden"
                                            hidden
                                          >
                                            <i
                                              class="fa fa-check-circle"
                                              aria-hidden="true"
                                            ></i>{" "}
                                            Your item is successfully added to
                                            the Cart!!
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
                                                strokeWidth="2"
                                              />
                                              <circle
                                                cx="6.5"
                                                cy="6.5"
                                                r="5.5"
                                                fill="#EB001B"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                              <path
                                                d="M5.87413 3.52832L5.97439 7.57216H7.02713L7.12739 3.52832H5.87413ZM6.50076 9.66091C6.88091 9.66091 7.18169 9.37267 7.18169 9.00504C7.18169 8.63742 6.88091 8.34917 6.50076 8.34917C6.12061 8.34917 5.81982 8.63742 5.81982 9.00504C5.81982 9.37267 6.12061 9.66091 6.50076 9.66091Z"
                                                fill="white"
                                              />
                                              <path
                                                d="M5.87413 3.17832H5.51535L5.52424 3.537L5.6245 7.58083L5.63296 7.92216H5.97439H7.02713H7.36856L7.37702 7.58083L7.47728 3.537L7.48617 3.17832H7.12739H5.87413ZM6.50076 10.0109C7.06121 10.0109 7.5317 9.57872 7.5317 9.00504C7.5317 8.43137 7.06121 7.99918 6.50076 7.99918C5.94031 7.99918 5.46982 8.43137 5.46982 9.00504C5.46982 9.57872 5.94031 10.0109 6.50076 10.0109Z"
                                                fill="white"
                                                stroke="#EB001B"
                                                strokeWidth="0.7"
                                              />
                                            </svg>
                                            <span class="product-form__error-message"></span>
                                          </div>

                                          <button
                                            onClick={() => addItem(x)}
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
                                                  strokeWidth="6"
                                                  cx="33"
                                                  cy="33"
                                                  r="30"
                                                ></circle>
                                              </svg>
                                            </div>
                                          </button>
                                          <div class="wbwish">
                                            <a
                                              href="# "
                                              class="wishlist"
                                              onClick={() => addWishlist(x)}
                                              title={i18n.t("wishlist")}
                                            >
                                              {" "}
                                              <svg viewBox="0 0 129 129">
                                                <path d="m121.6,40.1c-3.3-16.6-15.1-27.3-30.3-27.3-8.5,0-17.7,3.5-26.7,10.1-9.1-6.8-18.3-10.3-26.9-10.3-15.2,0-27.1,10.8-30.3,27.6-4.8,24.9 10.6,58 55.7,76 0.5,0.2 1,0.3 1.5,0.3 0.5,0 1-0.1 1.5-0.3 45-18.4 60.3-51.4 55.5-76.1zm-57,67.9c-39.6-16.4-53.3-45-49.2-66.3 2.4-12.7 11.2-21 22.3-21 7.5,0 15.9,3.6 24.3,10.5 1.5,1.2 3.6,1.2 5.1,0 8.4-6.7 16.7-10.2 24.2-10.2 11.1,0 19.8,8.1 22.3,20.7 4.1,21.1-9.5,49.6-49,66.3z"></path>
                                              </svg>
                                              <span class="wbaddwish">
                                                Add To Wishlist
                                              </span>
                                            </a>
                                          </div>

                                          <div class="wbqvtop">
                                            <button
                                              class="focus-inset wbquickv quick_shop js-wbquickview-link"
                                              onClick={() =>
                                                openProduct(
                                                  product,
                                                  indexColors
                                                )
                                              }
                                              aria-label="Quick view"
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
                            </div>
                          );
                        })
                      : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {open === "inline-block" ? (
          <ModalProductDetails open={open} product={product} />
        ) : null}
      </section>
    </>
  );
};

export default Products;
