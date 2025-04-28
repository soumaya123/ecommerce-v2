import React, {  useEffect, useState } from 'react';
import Header from '../../components/Header'
import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import Categories from "../../components/Categories";
import Hero from "../../components/Hero";
import LatestProduct from "../../components/Products/latest-product";
import Products from "../../components/Products/product";
import Blog from "../../components/Blog";
import Banner from "../../components/Banner";
//import SpecialProduts from "../../components/Products/ProductSpecial/product-special";
//import { GetProducts } from "../../services";

const Homepage = () => {
 
  useEffect(() => {
    
    //getLists()
}, []

)
  
  return (
    <> 
        <Menu/>
        <Header> </Header>
        <Hero/>
       <Categories/>
       <Products  />
      <Banner />         
      <LatestProduct/>
      <Blog/>     
      <Footer/>
      
    </>
  );
};

export default Homepage;