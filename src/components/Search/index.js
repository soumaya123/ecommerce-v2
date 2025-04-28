import React, { useEffect, useState } from "react";
import i18n from "../../i18n";
import ProductView from "../ProductSpecial/ProductView";
import createHistory from "history/createBrowserHistory";
import { GetProducts, Brands, Attributs } from "../../services";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom";

// import { Link } from 'react-router-dom'
const Search = () => {
  const { push } = useHistory();

  const history = createHistory();

  const [search, setSearch] = useState(history.location?.state?.search);

  const [products, setproducts] = useState([]);
  const [brandselected, setbrandselected] = useState([]);
  const [colorselected, setcolorselected] = useState([]);
  const [brands, setbrands] = useState([]);
  const [colors, setcolors] = useState([]);
  const [priceselected, setpriceselected] = useState({});

  const handleChange = (event) => {
    event.persist();
    setSearch(event.target.value);
  };
  
  const handleChangeBrand = async (brand) => {
    setbrandselected([...brandselected, brand]);
  };
  const handleChangeColor = async (c) => {
    setcolorselected([...colorselected, c]);
  };
  const clear = async () => {
    setbrandselected([]);
    setcolorselected([]);
    setpriceselected({});
  };
  const brandReset = async (brand) => {
    setbrandselected(brandselected.filter((e) => e.id !== brand.id));
  };
  const colorReset = async (c) => {
    //console.log('c',c)
    //console.log('colors',colorselected.filter((e) => e.id !== c.id))
    setcolorselected(colorselected.filter((e) => e.id !== c.id));
  };
  const getList = async (x) => {
    var list = await Brands.getAllBrands();
    if (list) setbrands(list.data);
    var list1 = await GetProducts.getSearchProduct(x);
    if (list1) {
      setproducts(Object.values(list1.data));
    }
    var listA = await Attributs.AttributsIndex();
    if (listA) {
      var configValue = await Attributs.ConfigValuesById(
        listA.data.find((e) => e.type === "Couleur")?.id
      );
      if (configValue) {
        setcolors(configValue.data);
      }
      // console.log("configValue", configValue)
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        push({
        pathname: "/search",
        state: { search: search },
        });
    }
  };
  useEffect(() => {
    // console.log("search",x)
    getList(history.location?.state?.search);
  }, [history.location?.state?.search]);
  let x = [];
  if (
    brandselected.length > 0 &&
    colorselected.length === 0 &&
    !priceselected.min &&
    !priceselected.max
  ) {
    brandselected.map((e) => {
      products.map(
        (p) =>
          p.filter((prod) => prod.brandId === e.id).length > 0 &&
          x.push(p.filter((prod) => prod.brandId === e.id))
      );
    });
  } else if (
    brandselected.length === 0 &&
    colorselected.length > 0 &&
    !priceselected.min &&
    !priceselected.max
  ) {
    colorselected.forEach((color) => {
      products.forEach((productGroup, index) => {
        const existsInX = x.some(
          (existingGroup) => existingGroup === productGroup
        );

        if (!existsInX) {
          let filteredProducts = productGroup.filter(
            (product) => product.color.name === color.name
          );

          if (filteredProducts && filteredProducts.length > 0) {
            x.push(productGroup);
          }
        }
      });
    });
  } else if (
    (brandselected.length === 0 &&
      colorselected.length === 0 &&
      priceselected.min) ||
    priceselected.max
  ) {
    if (priceselected.min && !priceselected.max) {
      // products
      //   .filter((prod) => prod.price >= priceselected.min)
      //   .map((p) => x.push(p));
      products.map(
        (p) =>
          p.filter((prod) => prod.price >= priceselected.min).length > 0 &&
          x.push(p.filter((prod) => prod.price >= priceselected.min))
      );
    }
    if (!priceselected.min && priceselected.max) {
      // products
      //   .filter((prod) => prod.price <= priceselected.max)
      //   .map((p) => x.push(p));
      products.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );
    }
    if (priceselected.min && priceselected.max) {
      products.map(
        (p) =>
          p.filter(
            (prod) =>
              prod.price >= priceselected.min && prod.price <= priceselected.min
          ).length > 0 &&
          x.push(
            p.filter(
              (prod) =>
                prod.price >= priceselected.min &&
                prod.price <= priceselected.min
            )
          )
      );
    }
    //console.log("price", x);
  } else if (
    brandselected.length > 0 &&
    colorselected.length > 0 &&
    !priceselected.min &&
    !priceselected.max
  ) {
    let z = [];
    brandselected.map((e) => {
      products.map(
        (p) =>
          p.filter((prod) => prod.brandId === e.id).length > 0 &&
          z.push(p.filter((prod) => prod.brandId === e.id))
      );
    });
    colorselected.forEach((color) => {
      z.forEach((productGroup, index) => {
        const existsInX = x.some(
          (existingGroup) => existingGroup === productGroup
        );

        if (!existsInX) {
          let filteredProducts = productGroup.filter(
            (product) => product.color.name === color.name
          );

          if (filteredProducts && filteredProducts.length > 0) {
            x.push(productGroup);
          }
        }
      });
    });
  } else if (
    (brandselected.length > 0 &&
      colorselected.length === 0 &&
      priceselected.min) ||
    priceselected.max
  ) {
    let f = [];
    // brandselected.map((e) =>
    //   products
    //     .filter((prod) => prod.brandId === e.id)
    //     .map((brand) => f.push(brand))
    // );
    brandselected.map((e) => {
      products.map(
        (p) =>
          p.filter((prod) => prod.brandId === e.id).length > 0 &&
          f.push(p.filter((prod) => prod.brandId === e.id))
      );
    });
    if (priceselected.min && !priceselected.max) {
      f.map(
        (p) =>
          p.filter((prod) => prod.price >= priceselected.min).length > 0 &&
          x.push(p.filter((prod) => prod.price >= priceselected.min))
      );
    }
    if (!priceselected.min && priceselected.max) {
      f.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );
    }
    if (priceselected.min && priceselected.max) {
      f.map(
        (p) =>
          p.filter(
            (prod) =>
              prod.price >= priceselected.min && prod.price <= priceselected.min
          ).length > 0 &&
          x.push(
            p.filter(
              (prod) =>
                prod.price >= priceselected.min &&
                prod.price <= priceselected.min
            )
          )
      );

      // f.filter(
      //   (prod) =>
      //     prod.price >= priceselected.min && prod.price <= priceselected.min
      // ).map((p) => x.push(p));
    }
    // console.log("price",x)
  } else if (
    (brandselected.length === 0 &&
      colorselected.length > 0 &&
      priceselected.min) ||
    priceselected.max
  ) {
    let z = [];
    colorselected.forEach((color) => {
      products.forEach((productGroup, index) => {
        const existsInX = x.some(
          (existingGroup) => existingGroup === productGroup
        );

        if (!existsInX) {
          let filteredProducts = productGroup.filter(
            (product) => product.color.name === color.name
          );

          if (filteredProducts && filteredProducts.length > 0) {
            z.push(productGroup);
          }
        }
      });
    });
    if (priceselected.min && !priceselected.max) {
      z.map(
        (p) =>
          p.filter((prod) => prod.price >= priceselected.min).length > 0 &&
          x.push(p.filter((prod) => prod.price >= priceselected.min))
      );
      //z.filter((prod) => prod.price >= priceselected.min).map((p) => x.push(p));
    }
    if (!priceselected.min && priceselected.max) {
      z.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );
      // z.filter((prod) => prod.price <= priceselected.max).map((p) => x.push(p));
    }
    if (priceselected.min && priceselected.max) {
      z.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );

      // z.filter(
      //   (prod) =>
      //     prod.price >= priceselected.min && prod.price <= priceselected.min
      // ).map((p) => x.push(p));
    }
  } else if (
    (brandselected.length > 0 &&
      colorselected.length > 0 &&
      priceselected.min) ||
    priceselected.max
  ) {
    let z = [];
    let t = [];
    brandselected.map((e) => {
      products.map(
        (p) =>
          p.filter((prod) => prod.brandId === e.id).length > 0 &&
          z.push(p.filter((prod) => prod.brandId === e.id))
      );
    });
    // brandselected.map((e) =>
    //   products
    //     .filter((prod) => prod.brandId === e.id)
    //     .map((brand) => z.push(brand))
    // );
    colorselected.forEach((color) => {
      z.forEach((productGroup, index) => {
        const existsInX = x.some(
          (existingGroup) => existingGroup === productGroup
        );

        if (!existsInX) {
          let filteredProducts = productGroup.filter(
            (product) => product.color.name === color.name
          );

          if (filteredProducts && filteredProducts.length > 0) {
            t.push(productGroup);
          }
        }
      });
    });
    if (priceselected.min && !priceselected.max) {
      t.map(
        (p) =>
          p.filter((prod) => prod.price >= priceselected.min).length > 0 &&
          x.push(p.filter((prod) => prod.price >= priceselected.min))
      );
      // t.filter((prod) => prod.price >= priceselected.min).map((p) => x.push(p));
    }
    if (!priceselected.min && priceselected.max) {
      t.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );
      // t.filter((prod) => prod.price <= priceselected.max).map((p) => x.push(p));
    }
    if (priceselected.min && priceselected.max) {
      t.map(
        (p) =>
          p.filter((prod) => prod.price <= priceselected.max).length > 0 &&
          x.push(p.filter((prod) => prod.price <= priceselected.max))
      );
      // t.filter(
      //   (prod) =>
      //     prod.price >= priceselected.min && prod.price <= priceselected.min
      // ).map((p) => x.push(p));
    }
    // console.log("price", x);
  }

  const filteredProducts = x;
  // console.log("search", products);
  return (
    <>
      <div className="">
        <nav
          className="breadcrumb row"
          role="navigation"
          aria-label="breadcrumbs"
        >
          <div className="col-12">
            <a href="/" title="Home">
              {i18n.t("home")}
            </a>

            <span aria-hidden="true">
              <i className="fa fa-angle-right"></i>
            </span>
            <span>
              {i18n.t("Search")}:
              {" " +
                products.length +
                " " +
                i18n.t("Results Found For") +
                '"' +
                history.location?.state?.search ? history.location?.state?.search:search +
                '"'}
            </span>
          </div>
        </nav>
      </div>
      <div
        id="shopify-section-template--14270126161983__product-grid"
        class="shopify-section collection-grid-section"
      >
        <div className="template-search__header  center">
          <h1 className="h2">{i18n.t("Search")}</h1>
        </div>
        <div className="template-search__search">
          <predictive-search data-loading-text="Loading...">
            <div className="field">
              <input
                className="search__input field__input"
                id="Search-In-Template"
                type="search"
                name="q"
                value={search}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
              />
              <label className="field__label" for="Search-In-Template">
                {i18n.t("Search")}
              </label>
              <input name="options[prefix]" type="hidden" value="last" />
              <div
                className="predictive-search predictive-search--search-template"
                tabindex="-1"
                data-predictive-search
              >
                <div className="predictive-search__loading-state">
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

              <span
                className="predictive-search-status visually-hidden"
                role="status"
                aria-hidden="true"
              ></span>
              <button
                className="search__button field__button"
                onClick={() => getList(search)}
              >
                <svg className="icon icon-search">
                  <use href="#icon-search" />
                </svg>
              </button>
            </div>
          </predictive-search>
        </div>
        {products.length > 0 && (
          <div id="ProductGridContainer">
            <div class="collection ">
              <div
                id="main-collection-filters"
                data-id="template--14270126161983__product-grid"
              >
                <div class="facets-container">
                  <facet-filters-form class="facets small-hide">
                    <div class="active-facets active-facets-desktop">
                      {brandselected.length > 0 &&
                        brandselected.map((brand) => (
                          <facet-remove>
                            <Link
                              to={"#"}
                              class="active-facets__button active-facets__button--light"
                              onClick={() => brandReset(brand)}
                            >
                              <span class="active-facets__button-inner button">
                                {brand.name}
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  width="12"
                                  height="13"
                                  class="icon icon-close-small"
                                  viewBox="0 0 12 13"
                                  fill="none"
                                >
                                  <path
                                    d="M8.48627 9.32917L2.82849 3.67098"
                                    stroke="#f5f5f5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M2.88539 9.38504L8.42932 3.61524"
                                    stroke="#f5f5f5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>

                                {/* <span class="visually-hidden">Clear filter</span> */}
                              </span>
                            </Link>
                          </facet-remove>
                        ))}

                      {(priceselected.min || priceselected.max) && (
                        <facet-remove>
                          <Link
                            to={"#"}
                            class="active-facets__button active-facets__button--light"
                            onClick={() => setpriceselected({})}
                          >
                            <span class="active-facets__button-inner button">
                              {priceselected.min && priceselected.max
                                ? "DA " +
                                  priceselected?.min +
                                  " - DA " +
                                  priceselected?.max
                                : priceselected.min && !priceselected.max
                                ? "DA " + priceselected?.min
                                : !priceselected.min && priceselected.max
                                ? "DA " + priceselected?.max
                                : ""}
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                role="presentation"
                                width="12"
                                height="13"
                                class="icon icon-close-small"
                                viewBox="0 0 12 13"
                                fill="none"
                              >
                                <path
                                  d="M8.48627 9.32917L2.82849 3.67098"
                                  stroke="#f5f5f5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M2.88539 9.38504L8.42932 3.61524"
                                  stroke="#f5f5f5"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>

                              {/* <span class="visually-hidden">Clear filter</span> */}
                            </span>
                          </Link>
                        </facet-remove>
                      )}
                      {colorselected.length > 0 &&
                        colorselected.map((color) => (
                          <facet-remove>
                            <Link
                              to={"#"}
                              class="active-facets__button active-facets__button--light"
                              onClick={() => colorReset(color)}
                            >
                              <span class="active-facets__button-inner button">
                                {color.name}
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  role="presentation"
                                  width="12"
                                  height="13"
                                  class="icon icon-close-small"
                                  viewBox="0 0 12 13"
                                  fill="none"
                                >
                                  <path
                                    d="M8.48627 9.32917L2.82849 3.67098"
                                    stroke="#f5f5f5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                  <path
                                    d="M2.88539 9.38504L8.42932 3.61524"
                                    stroke="#f5f5f5"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  ></path>
                                </svg>

                                {/* <span class="visually-hidden">Clear filter</span> */}
                              </span>
                            </Link>
                          </facet-remove>
                        ))}
                      <facet-remove class="active-facets__button-wrapper">
                        <Link
                          to={"#"}
                          class="active-facets__button-remove underlined-link"
                          onClick={() => clear()}
                        >
                          <span>{i18n.t("Clear all")}</span>
                        </Link>
                      </facet-remove>
                    </div>

                    <div class="facets__wrapper">
                      <details
                        id="Details-1-template--14270126161983__product-grid"
                        class="disclosure-has-popup facets__disclosure js-filter"
                        data-index="1"
                      >
                        <summary class="facets__summary caption-large focus-offset">
                          <div>
                            <span>{i18n.t("Brands")}</span>
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
                        </summary>
                        <div
                          id="Facet-1-template--14270126161983__product-grid"
                          class="facets__display"
                        >
                          <div class="facets__header">
                            <span class="facets__selected no-js-hidden">
                              {brandselected.length} {i18n.t("selected")}
                            </span>
                            <facet-remove>
                              <Link
                                to="#"
                                class="facets__reset link underlined-link"
                                onClick={() => setbrandselected([])}
                              >
                                {i18n.t("Reset")}
                              </Link>
                            </facet-remove>
                          </div>

                          <ul class="facets__list list-unstyled">
                            {brands.map((brand) => (
                              <li class="list-menu__item facets__item">
                                <label
                                  class="facet-checkbox"
                                  //onClick={()=>handleChange(brand)}
                                >
                                  <input
                                    type="checkbox"
                                    value={brand.id}
                                    //onChange={(e)=>console.log(e)}
                                    //onBlur={handleBlur}
                                    //checked={brandselected.findIndex(e => {e === brand.id})>-1 ? true: false}
                                    onChange={(e) =>
                                      e.target.checked
                                        ? handleChangeBrand(brand)
                                        : setbrandselected(
                                            brandselected.filter(
                                              (e) => e.id !== brand.id
                                            )
                                          )
                                    }

                                    //checked={true}
                                    //id="Filter-Availability-1"
                                  />
                                  <svg
                                    width="1.6rem"
                                    height="1.6rem"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                    focusable="false"
                                  >
                                    <rect
                                      width="16"
                                      height="16"
                                      stroke="currentColor"
                                      fill="none"
                                      stroke-width="1"
                                    ></rect>
                                  </svg>
                                  <svg
                                    class="icon icon-checkmark"
                                    width="1.1rem"
                                    height="0.7rem"
                                    viewBox="0 0 11 7"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                      stroke="currentColor"
                                      stroke-width="1.75"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  {brand.name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <details
                        id="Details-2-template--14270126161983__product-grid"
                        class="disclosure-has-popup facets__disclosure js-filter"
                        data-index="2"
                      >
                        <summary class="facets__summary caption-large focus-offset">
                          <div>
                            <span>{i18n.t("Price")}</span>
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
                        </summary>
                        <div
                          id="Facet-2-template--14270126161983__product-grid"
                          class="facets__display"
                        >
                          <div class="facets__header">
                            <span
                              class="facets__selected"
                              style={{ fontSize: "12px" }}
                            >
                              {filteredProducts.filter(
                                (p) => p.status_product === 1
                              ).length > 0
                                ? i18n.t("The highest price is") +
                                  " DA " +
                                  filteredProducts.reduce(
                                    (max, product) =>
                                      product.price > max ? product.price : max,
                                    0
                                  )
                                : i18n.t("The highest price is") +
                                  " DA " +
                                  products.reduce(
                                    (max, product) =>
                                      product.price > max ? product.price : max,
                                    0
                                  )}
                            </span>
                            <facet-remove>
                              <a
                                href="/"
                                class="facets__reset link underlined-link"
                              >
                                {i18n.t("Reset")}
                              </a>
                            </facet-remove>
                          </div>
                          <price-range class="facets__price">
                            <span class="field-currency">DA</span>
                            <div class="field">
                              <input
                                class="field__input"
                                name="filter.v.price.gte"
                                id="Filter-Price-GTE"
                                type="number"
                                onChange={(e) =>
                                  setpriceselected({
                                    ...priceselected,
                                    min: e.target.value,
                                  })
                                }
                                placeholder="0"
                                min="0"
                                max={
                                  filteredProducts.filter(
                                    (p) => p.status_product === 1
                                  ).length > 0
                                    ? filteredProducts.reduce(
                                        (max, product) =>
                                          product.price > max
                                            ? product.price
                                            : max,
                                        0
                                      )
                                    : products.reduce(
                                        (max, product) =>
                                          product.price > max
                                            ? product.price
                                            : max,
                                        0
                                      )
                                }
                              />
                              <label
                                class="field__label"
                                for="Filter-Price-GTE"
                              >
                                {i18n.t("From")}
                              </label>
                            </div>
                            <span class="field-currency">DA</span>
                            <div class="field">
                              <input
                                class="field__input"
                                name="filter.v.price.lte"
                                id="Filter-Price-LTE"
                                type="number"
                                min="0"
                                onChange={(e) =>
                                  setpriceselected({
                                    ...priceselected,
                                    max: e.target.value,
                                  })
                                }
                                //   placeholder="450.00"
                                max={
                                  filteredProducts.filter(
                                    (p) => p.status_product === 1
                                  ).length > 0
                                    ? filteredProducts.reduce(
                                        (max, product) =>
                                          product.price > max
                                            ? product.price
                                            : max,
                                        0
                                      )
                                    : products.reduce(
                                        (max, product) =>
                                          product.price > max
                                            ? product.price
                                            : max,
                                        0
                                      )
                                }
                              />
                              <label
                                class="field__label"
                                for="Filter-Price-LTE"
                              >
                                {i18n.t("To")}
                              </label>
                            </div>
                          </price-range>
                        </div>
                      </details>

                      <details
                        id="Details-3-template--14270126161983__product-grid"
                        class="disclosure-has-popup facets__disclosure js-filter"
                        data-index="3"
                      >
                        <summary class="facets__summary caption-large focus-offset">
                          <div>
                            <span>{i18n.t("Color")}</span>
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
                        </summary>
                        <div
                          id="Facet-3-template--14270126161983__product-grid"
                          class="facets__display"
                        >
                          <div class="facets__header">
                            <span class="facets__selected no-js-hidden">
                              {colorselected.length} {i18n.t("selected")}
                            </span>
                            <facet-remove>
                              <a
                                href="/"
                                class="facets__reset link underlined-link"
                                onClick={() => setcolorselected([])}
                              >
                                {i18n.t("Reset")}
                              </a>
                            </facet-remove>
                          </div>

                          <ul class="facets__list list-unstyled">
                            {colors.map((color) => (
                              <li class="list-menu__item facets__item">
                                <label class="facet-checkbox">
                                  <input
                                    type="checkbox"
                                    style={{
                                      backgroundColor: color.values,
                                      zIndex: "unset",
                                    }}
                                    value={color.id}
                                    // onChange={(e)=>console.log(e.target.checked)}
                                    onChange={(e) =>
                                      e.target.checked
                                        ? handleChangeColor(color)
                                        : setcolorselected(
                                            colorselected.filter(
                                              (e) => e.id !== color.id
                                            )
                                          )
                                    }
                                  />
                                  <svg
                                    width="1.6rem"
                                    height="1.6rem"
                                    viewBox="0 0 16 16"
                                    aria-hidden="true"
                                    focusable="false"
                                  >
                                    <rect
                                      width="16"
                                      height="16"
                                      stroke="currentColor"
                                      fill="none"
                                      stroke-width="1"
                                    ></rect>
                                  </svg>
                                  <svg
                                    class="icon icon-checkmark"
                                    width="1.1rem"
                                    height="0.7rem"
                                    viewBox="0 0 11 7"
                                    fill="none"
                                  >
                                    <path
                                      d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                      stroke="currentColor"
                                      stroke-width="1.75"
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                    />
                                  </svg>
                                  {color.name}
                                </label>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </details>

                      <noscript>
                        <a type="submit" class="">
                          Filter
                        </a>
                      </noscript>
                    </div>
                  </facet-filters-form>
                  <div class="active-facets active-facets-mobile  medium-hide large-up-hide">
                    <facet-remove class="active-facets__button-wrapper">
                      <a
                        href="/"
                        class="active-facets__button-remove underlined-link"
                      >
                        <span>Clear all</span>
                      </a>
                    </facet-remove>
                  </div>
                  <div class="product-count light hidden " role="status">
                    <p id="ProductCount" class="product-count__text">
                      {" "}
                      {brandselected.length > 0
                        ? filteredProducts.length + " " + i18n.t("products")
                        : products.length + " " + i18n.t("products")}
                    </p>
                    <div class="loading-overlay__spinner">
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
                  </div>

                  <menu-drawer
                    class="mobile-facets__wrapper  medium-hide large-up-hide"
                    data-breakpoint="mobile"
                  >
                    <details class="mobile-facets__disclosure disclosure-has-popup">
                      <summary class="mobile-facets__open-wrapper focus-offset">
                        <span class="mobile-facets__open">
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            class="icon icon-filter"
                            fill="none"
                            viewBox="0 11 20 20"
                          >
                            <line
                              x1="16.5"
                              y1="17.5"
                              x2="3.5"
                              y2="17.5"
                              stroke="#3F7972"
                              stroke-linecap="round"
                            />
                            <line
                              x1="16.5"
                              y1="24.5"
                              x2="3.5"
                              y2="24.5"
                              stroke="#3F7972"
                              stroke-linecap="round"
                            />
                            <circle
                              cx="13"
                              cy="24.5"
                              r="2"
                              fill="white"
                              stroke="#3F7972"
                            />
                            <circle
                              cx="7"
                              cy="17.5"
                              r="2"
                              fill="white"
                              stroke="#3F7972"
                            />
                          </svg>

                          <span class="mobile-facets__open-label button-label">
                            Filter and sort
                          </span>
                        </span>
                        <span
                          tabindex="0"
                          class="mobile-facets__close mobile-facets__close--no-js"
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
                            />
                          </svg>
                        </span>
                      </summary>
                      <facet-filters-form>
                        <form id="FacetFiltersFormMobile" class="mobile-facets">
                          <div class="mobile-facets__inner">
                            <div class="mobile-facets__header">
                              <div class="mobile-facets__header-inner">
                                <h2 class="mobile-facets__heading">
                                  Filter and sort
                                </h2>
                                <p class="mobile-facets__count">
                                  {" "}
                                  {brandselected.length > 0
                                    ? filteredProducts.length +
                                      " " +
                                      i18n.t("products")
                                    : products.length +
                                      " " +
                                      i18n.t("products")}
                                </p>
                              </div>
                            </div>
                            <div class="mobile-facets__main">
                              <details
                                id="Details-Mobile-1-template--14270126161983__product-grid"
                                class="mobile-facets__details js-filter"
                                data-index="mobile-1"
                              >
                                <summary class="mobile-facets__summary focus-inset">
                                  <div>
                                    <span>Availability</span>
                                    <span class="mobile-facets__arrow no-js-hidden">
                                      <svg
                                        viewBox="0 0 14 10"
                                        fill="none"
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        class="icon icon-arrow"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    <noscript>
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
                                    </noscript>
                                  </div>
                                </summary>
                                <div
                                  id="FacetMobile-1-template--14270126161983__product-grid"
                                  class="mobile-facets__submenu"
                                >
                                  <button
                                    class="mobile-facets__close-button link link--text focus-inset"
                                    aria-expanded="true"
                                    type="button"
                                  >
                                    <svg
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      class="icon icon-arrow"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    Availability
                                  </button>
                                  <ul class="mobile-facets__list list-unstyled">
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Availability-mobile-1"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.availability"
                                          value="1"
                                          id="Filter-Availability-mobile-1"
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        In stock (5)
                                      </label>
                                    </li>
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Availability-mobile-2"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.availability"
                                          value="0"
                                          id="Filter-Availability-mobile-2"
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        Out of stock (3)
                                      </label>
                                    </li>
                                  </ul>

                                  <div class="no-js-hidden mobile-facets__footer">
                                    <facet-remove class="mobile-facets__clear-wrapper">
                                      <a
                                        href="/"
                                        class="mobile-facets__clear underlined-link"
                                      >
                                        Clear
                                      </a>
                                    </facet-remove>
                                    <button
                                      type="button"
                                      class="no-js-hidden button button--primary"
                                      onclick="this.closest('.mobile-facets__wrapper').querySelector('summary').click()"
                                    >
                                      Apply
                                    </button>
                                    <noscript>
                                      <button class="button button--primary">
                                        Apply
                                      </button>
                                    </noscript>
                                  </div>
                                </div>
                              </details>

                              <details
                                id="Details-Mobile-2-template--14270126161983__product-grid"
                                class="mobile-facets__details js-filter"
                                data-index="mobile-2"
                              >
                                <summary class="mobile-facets__summary focus-inset">
                                  <div>
                                    <span>Price</span>
                                    <span class="mobile-facets__arrow no-js-hidden">
                                      <svg
                                        viewBox="0 0 14 10"
                                        fill="none"
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        class="icon icon-arrow"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    <noscript>
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
                                    </noscript>
                                  </div>
                                </summary>
                                <div
                                  id="FacetMobile-2-template--14270126161983__product-grid"
                                  class="mobile-facets__submenu"
                                >
                                  <button
                                    class="mobile-facets__close-button link link--text focus-inset"
                                    aria-expanded="true"
                                    type="button"
                                  >
                                    <svg
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      class="icon icon-arrow"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    Price
                                  </button>

                                  <p class="mobile-facets__info">
                                    The highest price is DA 450.00
                                  </p>

                                  <price-range class="facets__price">
                                    <span class="field-currency">DA</span>
                                    <div class="field">
                                      <input
                                        class="field__input"
                                        name="filter.v.price.gte"
                                        id="Mobile-Filter-Price-GTE"
                                        type="number"
                                        placeholder="0"
                                        min="0"
                                        inputmode="decimal"
                                        max="450.00"
                                      />
                                      <label
                                        class="field__label"
                                        for="Mobile-Filter-Price-GTE"
                                      >
                                        From
                                      </label>
                                    </div>

                                    <span class="field-currency">DA</span>
                                    <div class="field">
                                      <input
                                        class="field__input"
                                        name="filter.v.price.lte"
                                        id="Mobile-Filter-Price-LTE"
                                        type="number"
                                        min="0"
                                        inputmode="decimal"
                                        placeholder="450.00"
                                        max="450.00"
                                      />
                                      <label
                                        class="field__label"
                                        for="Mobile-Filter-Price-LTE"
                                      >
                                        To
                                      </label>
                                    </div>
                                  </price-range>
                                  <div class="no-js-hidden mobile-facets__footer">
                                    <facet-remove class="mobile-facets__clear-wrapper">
                                      <a
                                        href="/"
                                        class="mobile-facets__clear underlined-link"
                                      >
                                        Clear
                                      </a>
                                    </facet-remove>
                                    <button
                                      type="button"
                                      class="no-js-hidden button button--primary"
                                      onclick="this.closest('.mobile-facets__wrapper').querySelector('summary').click()"
                                    >
                                      Apply
                                    </button>
                                    <noscript>
                                      <button class="button button--primary">
                                        Apply
                                      </button>
                                    </noscript>
                                  </div>
                                </div>
                              </details>

                              <details
                                id="Details-Mobile-3-template--14270126161983__product-grid"
                                class="mobile-facets__details js-filter"
                                data-index="mobile-3"
                              >
                                <summary class="mobile-facets__summary focus-inset">
                                  <div>
                                    <span>Color</span>
                                    <span class="mobile-facets__arrow no-js-hidden">
                                      <svg
                                        viewBox="0 0 14 10"
                                        fill="none"
                                        aria-hidden="true"
                                        focusable="false"
                                        role="presentation"
                                        class="icon icon-arrow"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                          fill="currentColor"
                                        />
                                      </svg>
                                    </span>
                                    <noscript>
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
                                    </noscript>
                                  </div>
                                </summary>
                                <div
                                  id="FacetMobile-3-template--14270126161983__product-grid"
                                  class="mobile-facets__submenu"
                                >
                                  <button
                                    class="mobile-facets__close-button link link--text focus-inset"
                                    aria-expanded="true"
                                    type="button"
                                  >
                                    <svg
                                      viewBox="0 0 14 10"
                                      fill="none"
                                      aria-hidden="true"
                                      focusable="false"
                                      role="presentation"
                                      class="icon icon-arrow"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M8.537.808a.5.5 0 01.817-.162l4 4a.5.5 0 010 .708l-4 4a.5.5 0 11-.708-.708L11.793 5.5H1a.5.5 0 010-1h10.793L8.646 1.354a.5.5 0 01-.109-.546z"
                                        fill="currentColor"
                                      />
                                    </svg>
                                    Color
                                  </button>
                                  <ul class="mobile-facets__list list-unstyled">
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Color-mobile-1"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.option.color"
                                          value="Black"
                                          id="Filter-Color-mobile-1"
                                          style={{ backgroundColor: "Black" }}
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        Black (5)
                                      </label>
                                    </li>
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Color-mobile-2"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.option.color"
                                          value="Blue"
                                          id="Filter-Color-mobile-2"
                                          style={{ backgroundColor: "Blue" }}
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        Blue (2)
                                      </label>
                                    </li>
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Color-mobile-3"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.option.color"
                                          value="Gray"
                                          id="Filter-Color-mobile-3"
                                          style={{ backgroundColor: "Gray" }}
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        Gray (2)
                                      </label>
                                    </li>
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Color-mobile-4"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.option.color"
                                          value="Pink"
                                          id="Filter-Color-mobile-4"
                                          style={{ backgroundColor: "Pink" }}
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        Pink (4)
                                      </label>
                                    </li>
                                    <li class="mobile-facets__item list-menu__item">
                                      <label
                                        for="Filter-Color-mobile-5"
                                        class="mobile-facets__label"
                                      >
                                        <input
                                          class="mobile-facets__checkbox"
                                          type="checkbox"
                                          name="filter.v.option.color"
                                          value="White"
                                          id="Filter-Color-mobile-5"
                                          style={{ backgroundColor: "White" }}
                                        />
                                        <span class="mobile-facets__highlight"></span>
                                        <svg
                                          width="1.6rem"
                                          height="1.6rem"
                                          viewBox="0 0 16 16"
                                          aria-hidden="true"
                                          focusable="false"
                                        >
                                          <rect
                                            width="16"
                                            height="16"
                                            stroke="currentColor"
                                            fill="none"
                                            stroke-width="1"
                                          ></rect>
                                        </svg>
                                        <svg
                                          class="icon icon-checkmark"
                                          width="1.1rem"
                                          height="0.7rem"
                                          viewBox="0 0 11 7"
                                          fill="none"
                                        >
                                          <path
                                            d="M1.5 3.5L2.83333 4.75L4.16667 6L9.5 1"
                                            stroke="currentColor"
                                            stroke-width="1.75"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                          />
                                        </svg>
                                        White (2)
                                      </label>
                                    </li>
                                  </ul>

                                  <div class="no-js-hidden mobile-facets__footer">
                                    <facet-remove class="mobile-facets__clear-wrapper">
                                      <a
                                        href="/"
                                        class="mobile-facets__clear underlined-link"
                                      >
                                        Clear
                                      </a>
                                    </facet-remove>
                                    <button
                                      type="button"
                                      class="no-js-hidden button button--primary"
                                      onclick="this.closest('.mobile-facets__wrapper').querySelector('summary').click()"
                                    >
                                      Apply
                                    </button>
                                    <noscript>
                                      <button class="button button--primary">
                                        Apply
                                      </button>
                                    </noscript>
                                  </div>
                                </div>
                              </details>

                              <div
                                class="mobile-facets__details js-filter"
                                data-index="mobile-"
                              >
                                <div class="mobile-facets__summary">
                                  <div class="mobile-facets__sort">
                                    <label for="SortBy-mobile">Sort by:</label>
                                    <div class="select">
                                      <select
                                        name="sort_by"
                                        class="select__select"
                                        id="SortBy-mobile"
                                        aria-describedby="a11y-refresh-page-message"
                                      >
                                        <option value="manual">Featured</option>
                                        <option
                                          value="best-selling"
                                          selected="selected"
                                        >
                                          Best selling
                                        </option>
                                        <option value="title-ascending">
                                          Alphabetically, A-Z
                                        </option>
                                        <option value="title-descending">
                                          Alphabetically, Z-A
                                        </option>
                                        <option value="price-ascending">
                                          Price, low to high
                                        </option>
                                        <option value="price-descending">
                                          Price, high to low
                                        </option>
                                        <option value="created-ascending">
                                          Date, old to new
                                        </option>
                                        <option value="created-descending">
                                          Date, new to old
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
                                </div>
                              </div>

                              <div class="mobile-facets__footer">
                                <facet-remove class="mobile-facets__clear-wrapper">
                                  <a
                                    href="/"
                                    class="mobile-facets__clear underlined-link"
                                  >
                                    Clear all
                                  </a>
                                </facet-remove>
                                <button
                                  type="button"
                                  class="no-js-hidden button button--primary"
                                  onclick="this.closest('.mobile-facets__wrapper').querySelector('summary').click()"
                                >
                                  Apply
                                </button>
                                <noscript>
                                  <button class="button button--primary">
                                    Apply
                                  </button>
                                </noscript>
                              </div>
                            </div>
                          </div>
                        </form>
                      </facet-filters-form>
                    </details>
                  </menu-drawer>
                </div>
              </div>
              <div class="rightcol">
                <div class="loading-overlay gradient"></div>
                <ul
                  id="product-grid"
                  data-id="template--14270126161983__product-grid"
                  className={"row rless grid product-grid"}
                >
                  {brandselected.length > 0 ||
                  colorselected.length > 0 ||
                  priceselected.min ||
                  priceselected.max
                    ? filteredProducts.length > 0 &&
                      filteredProducts
                        // .filter((e) => e.status_product === 1)
                        .map((product) => {
                          return (
                            <>
                              <ProductView products={product} />
                            </>
                          );
                        })
                    : products.length > 0 &&
                      products
                        // .filter((e) => e.status_product === 1)
                        .map((product) => {
                          return (
                            <>
                              <ProductView products={product} />
                            </>
                          );
                        })}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Search;
