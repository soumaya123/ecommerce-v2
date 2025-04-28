import React, { useEffect, useState } from "react";
import ProductView from "../ProductSpecial/ProductView";
import i18n from "./../../i18n";
import { Brands, Attributs, GetProducts } from "../../services";
import { Link } from "react-router-dom";

// import { Link } from 'react-router-dom'
function TopProducts(props) {
  const [display, setdisplay] = useState("flex");
  const [brandselected, setbrandselected] = useState([]);
  const [brands, setbrands] = useState([]);
  const [sortBy, setSortBy] = useState("all"); // 'best-selling' is the default value
  const [products, setproducts] = useState([]);
  const [colors, setcolors] = useState([]);
  const [colorselected, setcolorselected] = useState([]);
  const [productsAttribut, setproductsAttribut] = useState([]);
  const [priceselected, setpriceselected] = useState({});
  const [productsAll, setproductsAll] = useState([]);
  const convertData = (inputData) => {
    const result = [];
    for (const key in inputData) {
      const categoryArray = inputData[key];

      categoryArray.forEach((item) => {
        const newItem = {
          id: item.id,
          name: item.name,
          reference: item.reference,
          code: item.code,
          price: item.price,
          cost_price: item.cost_price,
          status_product: item.status_product,
          status_promotion: item.status_promotion,
          stock: item.stock,
          description: item.description,
          image: item.image,
          CategoryId: item.CategoryId,
          itemskitsId: item.itemskitsId,
          ItemsId: item.ItemsId,
          brandId: item.brandId,
          distributors: item.distributors,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          Brand: {
            name: item.Brand.name,
            id: item.Brand.id,
          },
          category: {
            name: item.category.name,
            id: item.category.id,
          },
          items: item.items,
          itemskits: item.itemskits,
          color: item.color,
        };

        result.push(newItem);
      });
    }

    return result;
  };

  const getlist = async () => {
    console.log("brandselected", "hiii");
    var list1 = await GetProducts.getAllProductsGroup();
    console.log("list1", list1);
    if (list1) {
        let  list=[]
         Object.values(list1.data).map(l=>{
         
           Object.values(l).map(l1=>{
             list.push(l1)
           })
         })
      setproducts(list);
  
      let result = convertData(list);
      console.log("result",result)
     setproductsAll(result);
      const groupedProducts = {};

      switch (sortBy) {
        case "all":
          // Sort products alphabetically by name (A-Z)

          setproducts(list);
          break;
        case "title-ascending":
          const ascendingProducts = [...convertData(list)].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
          ascendingProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          //console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        // case "manual":
        //   // Sort products alphabetically by name (A-Z)
        //   const FeaturedProducts = Object.values(list1.data).filter((p) => p.cost_price !== null);
        //   setproducts(FeaturedProducts);
        //   break;
        case "title-descending":
          const descendingProducts = [...convertData(list)].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
          descendingProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        case "price-ascending":
          // Trier les produits par prix (bas à élevé)
          const lowToHighPriceProducts = [...convertData(list)].sort(
            (a, b) => a.price - b.price
          );

          lowToHighPriceProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          //console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        case "price-descending":
          // Trier les produits par prix (élevé à bas)
          const highToLowPriceProducts = [...convertData(list)].sort(
            (a, b) => b.price - a.price
          );
          highToLowPriceProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          //console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        case "created-ascending":
          // Trier les produits par date de création (ancien au récent)
          const oldToNewCreatedProducts = [...convertData(list)].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          oldToNewCreatedProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          //console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        case "created-descending":
          // Trier les produits par date de création (ancien au récent)
          const newToOLdCreatedProducts = [...convertData(list)].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          newToOLdCreatedProducts.forEach((product) => {
            if (!groupedProducts[product.name]) {
              groupedProducts[product.name] = [];
            }
            // Convert Sequelize instances to plain objects
            const plainProduct = product;
            groupedProducts[product.name].push(plainProduct);
          });
          //console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

          setproducts(Object.values(groupedProducts));
          break;
        // ... Ajoutez d'autres cas pour d'autres options de tri
        default:
          // Aucun filtre, retournez tous les produits
          break;
      }
    }
    var l = await Brands.getAllBrands();
    if (l) setbrands(l.data);
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
    var listPA = await Attributs.ProductsAttributsIndex();
    // console.log("productsAttribut",listPA)

    if (listPA) {
      setproductsAttribut(listPA.data);
    }
  };
  const handleChange = async (brand) => {
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
    //console.log("brandselected",brandselected)
    setbrandselected(brandselected.filter((e) => e.id !== brand.id));
    //setc(c.filter((e) => e.id !== brand.id))
  };
  const handleSortBy = (e) => {
    console.log("sortBy", e.target.value);
    setSortBy(e.target.value);
    const groupedProducts = {};
    switch (e.target.value) {
      case "all":
        // Sort products alphabetically by name (A-Z)

        setproducts(products);
        break;
      case "title-ascending":
        const ascendingProducts = [...productsAll].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        ascendingProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          // Convert Sequelize instances to plain objects
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

        setproducts(Object.values(groupedProducts));
        break;
      // case "manual":
      //   // Sort products alphabetically by name (A-Z)
      //   const FeaturedProducts = products.filter((p) => p.cost_price !== null);
      //   setproducts(FeaturedProducts);
      //   break;
      case "title-descending":
        const descendingProducts = [...productsAll].sort((a, b) =>
          b.name.localeCompare(a.name)
        );
        descendingProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          // Convert Sequelize instances to plain objects
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

        setproducts(Object.values(groupedProducts));
        break;
      case "price-ascending":
        // Trier les produits par prix (bas à élevé)
        const lowToHighPriceProducts = [...productsAll].sort(
          (a, b) => a.price - b.price
        );
        lowToHighPriceProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          // Convert Sequelize instances to plain objects
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

        setproducts(Object.values(groupedProducts));
        //setproducts(lowToHighPriceProducts);
        break;
      case "price-descending":
        // Trier les produits par prix (élevé à bas)
        const highToLowPriceProducts = [...productsAll].sort(
          (a, b) => b.price - a.price
        );
        highToLowPriceProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

        setproducts(Object.values(groupedProducts));
        break;
      case "created-ascending":
        // Trier les produits par date de création (ancien au récent)
        const oldToNewCreatedProducts = [...productsAll].sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        oldToNewCreatedProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          // Convert Sequelize instances to plain objects
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        // console.log("title-ascending",JSON.stringify(Object.values(groupedProducts)))

        setproducts(Object.values(groupedProducts));
        break;
      case "created-descending":
        // Trier les produits par date de création (ancien au récent)
        const newToOLdCreatedProducts = [...productsAll].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        newToOLdCreatedProducts.forEach((product) => {
          if (!groupedProducts[product.name]) {
            groupedProducts[product.name] = [];
          }
          // Convert Sequelize instances to plain objects
          const plainProduct = product;
          groupedProducts[product.name].push(plainProduct);
        });
        console.log(
          "created-descending",
          JSON.stringify(Object.values(groupedProducts))
        );

        setproducts(Object.values(groupedProducts));
        break;
      // ... Ajoutez d'autres cas pour d'autres options de tri
      default:
        // Aucun filtre, retournez tous les produits
        break;
    }

    setbrandselected([]);
    setcolorselected([]);
    setpriceselected({});
  };
  const colorReset = async (c) => {
    //console.log('c',c)
    //console.log('colors',colorselected.filter((e) => e.id !== c.id))
    setcolorselected(colorselected.filter((e) => e.id !== c.id));
  };
  useEffect(() => {
    getlist();
  }, []);
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
    console.log("price", x);
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
  console.log("topvvvv", filteredProducts);
  return (
    <>
      <div class="">
        <nav class="breadcrumb row" role="navigation" aria-label="breadcrumbs">
          <div class="col-12">
            <a href="/">{i18n.t("home")}</a>

            <span aria-hidden="true">
              <i class="fa fa-angle-right"></i>
            </span>

            <span>{i18n.t("products")}</span>
          </div>
        </nav>
      </div>
      <div
        id="shopify-section-template--14270126161983__banner"
        class="shopify-section spaced-section--full-width"
      >
        <h1 class="heading text-left">
          <span class="visually-hidden">Collection: </span>
          <span>{i18n.t("products")}</span>
        </h1>
      </div>
      <div
        id="shopify-section-template--14270126161983__product-grid"
        class="shopify-section collection-grid-section"
      >
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
                                      ? handleChange(brand)
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
                    {/* <details
                      id="Details-1-template--14270126161983__product-grid"
                      class="disclosure-has-popup facets__disclosure js-filter"
                      data-index="1"
                    >
                      <summary class="facets__summary caption-large focus-offset">
                        <div>
                          <span>{i18n.t("Availability")}</span>
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
                            0 {i18n.t("selected")}
                          </span>
                          <facet-remove>
                            <a
                              href="/"
                              class="facets__reset link underlined-link"
                            >
                              Reset
                            </a>
                          </facet-remove>
                        </div>

                        <ul class="facets__list list-unstyled">
                          <li class="list-menu__item facets__item">
                            <label
                              for="Filter-Availability-1"
                              class="facet-checkbox"
                            >
                              <input
                                type="checkbox"
                                name="filter.v.availability"
                                value="1"
                                id="Filter-Availability-1"
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

                              {i18n.t("In stock")}
                            </label>
                          </li>
                          <li class="list-menu__item facets__item">
                            <label
                              for="Filter-Availability-2"
                              class="facet-checkbox"
                            >
                              <input
                                type="checkbox"
                                name="filter.v.availability"
                                value="0"
                                id="Filter-Availability-2"
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

                              {i18n.t("Out of stock")}
                            </label>
                          </li>
                        </ul>
                      </div>
                    </details> */}
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
                              : products.length > 0
                              ? i18n.t("The highest price is") +
                                " DA " +
                                products.reduce(
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
                              placeholder="0"
                              onChange={(e) =>
                                setpriceselected({
                                  ...priceselected,
                                  min: e.target.value,
                                })
                              }
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
                                  : products.length > 0
                                  ? products.reduce(
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
                            <label class="field__label" for="Filter-Price-GTE">
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
                                  : products.length > 0
                                  ? products.reduce(
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
                            <label class="field__label" for="Filter-Price-LTE">
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
                              onClick={() => setcolorselected([])}
                              class="facets__reset link underlined-link"
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

                    {/* <noscript>
                                            <a href="#" type="submit"  >Filter</a>
                                        </noscript> */}
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
                    {brandselected.length > 0 || colorselected.length > 0
                      ? filteredProducts.length
                      : products.length > 0
                      ? products.length
                      : products.length}
                    {" " + i18n.t("products")}
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
                                  : products.length + " " + i18n.t("products")}
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
              <div class="row wbsortbar">
                <div class="wbglbtn col-md-3 col-5">
                  <button
                    className={
                      "gridv wblistgridbtn " +
                      (display === "flex" ? "active" : "")
                    }
                    aria-label="grid"
                    onClick={() => {
                      setdisplay("flex");
                    }}
                  >
                    <svg viewBox="0 0 52 52">
                      <path d="M14,16H2a2,2,0,0,1-2-2V2A2,2,0,0,1,2,0H14a2,2,0,0,1,2,2V14A2,2,0,0,1,14,16ZM4,12h8V4H4Z" />
                      <path d="M14,34H2a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H14a2,2,0,0,1,2,2V32A2,2,0,0,1,14,34ZM4,30h8V22H4Z" />
                      <path d="M14,52H2a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H14a2,2,0,0,1,2,2V50A2,2,0,0,1,14,52ZM4,48h8V40H4Z" />
                      <path d="M32,16H20a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V14A2,2,0,0,1,32,16ZM22,12h8V4H22Z" />
                      <path d="M32,34H20a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V32A2,2,0,0,1,32,34ZM22,30h8V22H22Z" />
                      <path d="M32,52H20a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2V50A2,2,0,0,1,32,52ZM22,48h8V40H22Z" />
                      <path d="M50,16H38a2,2,0,0,1-2-2V2a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V14A2,2,0,0,1,50,16ZM40,12h8V4H40Z" />
                      <path d="M50,34H38a2,2,0,0,1-2-2V20a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V32A2,2,0,0,1,50,34ZM40,30h8V22H40Z" />
                      <path d="M50,52H38a2,2,0,0,1-2-2V38a2,2,0,0,1,2-2H50a2,2,0,0,1,2,2V50A2,2,0,0,1,50,52ZM40,48h8V40H40Z" />
                    </svg>
                  </button>
                  <button
                    className={
                      "listv wblistgridbtn " +
                      (display === "block" ? "active" : "")
                    }
                    aria-label="list"
                    onClick={() => {
                      setdisplay("block");
                    }}
                  >
                    <svg viewBox="0 0 16 16">
                      <path d="M3 1H1V3H3V1Z" />
                      <path d="M3 5H1V7H3V5Z" />
                      <path d="M1 9H3V11H1V9Z" />
                      <path d="M3 13H1V15H3V13Z" />
                      <path d="M15 1H5V3H15V1Z" />
                      <path d="M15 5H5V7H15V5Z" />
                      <path d="M5 9H15V11H5V9Z" />
                      <path d="M15 13H5V15H15V13Z" />
                    </svg>
                  </button>
                </div>

                <div class="wbcatsort col-md-9 col-7">
                  <facet-filters-form class="small-hide">
                    <form id="FacetFiltersForm">
                      <div class="product-count" role="status">
                        <h2 class="product-count__text">
                          <span id="ProductCountDesktop">
                            {" "}
                            {brandselected.length > 0 ||
                            colorselected.length > 0 ||
                            priceselected.min ||
                            priceselected.max
                              ? filteredProducts.length +
                                " " +
                                i18n.t("products")
                              : products.length + " " + i18n.t("products")}
                          </span>
                        </h2>
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
                      <div class="facet-filters sorting caption">
                        <div class="facet-filters__field">
                          <span class="facet-filters__label">
                            <label for="SortBy">{i18n.t("Sort by")}:</label>
                          </span>
                          <div class="select">
                            <select
                              name="sort_by"
                              class="facet-filters__sort select__select caption-large"
                              id="SortBy"
                              onChange={(e) => handleSortBy(e)}
                            >
                              {/* <option value="best-selling" selected="selected">{i18n.t('Best selling')}</option> */}
                              <option value="all">{i18n.t("All")}</option>
                              {/* <option value="manual">
                                {i18n.t("Featured")}
                              </option> */}
                              <option value="title-ascending">
                                {i18n.t("Alphabetically, A-Z")}
                              </option>
                              <option value="title-descending">
                                {i18n.t("Alphabetically, Z-A")}
                              </option>
                              <option value="price-ascending">
                                {i18n.t("Price, low to high")}
                              </option>
                              <option value="price-descending">
                                {i18n.t("Price, high to low")}
                              </option>
                              <option value="created-ascending">
                                {i18n.t("Date, old to new")}
                              </option>
                              <option value="created-descending">
                                {i18n.t("Date, new to old")}
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
                        <noscript>
                          <button
                            type="submit"
                            class="facets__button-no-js button"
                          >
                            Sort
                          </button>
                        </noscript>
                      </div>
                    </form>
                  </facet-filters-form>
                </div>
              </div>
              <div class="loading-overlay gradient"></div>
              <ul
                id="product-grid"
                data-id="template--14270126161983__product-grid"
                className={
                  "row rless grid " +
                  (display === "flex" ? "product-grid" : "product-list")
                }
              >
                {brandselected.length > 0 ||
                colorselected.length > 0 ||
                priceselected.min ||
                priceselected.max
                  ? filteredProducts.length > 0 &&
                    filteredProducts.map((product) => {
                      return (
                        <>
                          <ProductView products={product} />
                        </>
                      );
                    })
                  : products.length > 0
                  ? products.map((product) => {
                      console.log("productComp", product);
                      return (
                        <>
                          <ProductView products={product} />
                        </>
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TopProducts;
