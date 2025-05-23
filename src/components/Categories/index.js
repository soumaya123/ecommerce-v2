import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetCategories } from "../../services";
import { Apis } from "../../services/Api/config";
import i18n from "../../i18n";
const Categories = () => {
  return (
    <section class="categories">
      <div class="container">
        <div class="row">
          <div class="categories__slider owl-carousel">
            <div class="col-lg-3">
              <div
                class="categories__item set-bg"
                data-setbg="img/categories/cat-1.jpg"
              >
                <h5>
                  <a href="#">Fresh Fruit</a>
                </h5>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="categories__item set-bg"
                data-setbg="img/categories/cat-2.jpg"
              >
                <h5>
                  <a href="#">Dried Fruit</a>
                </h5>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="categories__item set-bg"
                data-setbg="img/categories/cat-3.jpg"
              >
                <h5>
                  <a href="#">Vegetables</a>
                </h5>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="categories__item set-bg"
                data-setbg="img/categories/cat-4.jpg"
              >
                <h5>
                  <a href="#">drink fruits</a>
                </h5>
              </div>
            </div>
            <div class="col-lg-3">
              <div
                class="categories__item set-bg"
                data-setbg="img/categories/cat-5.jpg"
              >
                <h5>
                  <a href="#">drink fruits</a>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
