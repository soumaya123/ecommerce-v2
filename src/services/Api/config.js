//const API_URL = "http://localhost:3009"
// const API_URL = "https://lo-ecommerceiysaal.my.p4d.click"
//const API_URLs = "http://localhost:8009"
const API_URLS = "http://127.0.0.1:8100"; // logistic
const API_URL = "http://127.0.0.1:3009";
// const API_URLS ="https://logisticiysaal.my.p4d.click"
// const API_URL = "https://lo-ecommerceiysaal.my.p4d.click"
const Apis = {
  ///////Account////////
  UserLogin: `${API_URL}/api/root/login`,
  forgetPassword: `${API_URL}/api/root/forgot-password`,
  UserRegsiter: `${API_URL}/api/customers`,
  UserById: `${API_URL}/api/customers/`,
  UserUpdate: `${API_URL}/api/customers/update/`,
  uploadFile: `${API_URL}/api/customers/upload/`,
  /////  Categories/////////////////////////////
  slug: `${API_URL}/slug/images/`,
  pub: `${API_URL}/slug/publications/`,
  brand: `${API_URL}/slug/brands/`,
  GetAllCategoryList: `${API_URL}/api/items/details/ordering`,
  GetTopCategorie: `${API_URL}/api/category`,
  ByCategory: `${API_URL}/api/`,
  /////////////Brands///////
  getAllBrands: `${API_URL}/api/brands`,
  ////////////Attributs/////
  api_attributsIndex: `${API_URL}/api/attributs`,
  api_configValuesbyid: `${API_URL}/api/config_values/`,
  api_productsattributsIndex: `${API_URL}/api/product_attribut`,
  /////////Tarif//////
  api_tarifIndex: `${API_URL}/api/tarif`,

  //////////////Products///////////

  getAllProducts: `${API_URL}/api/products`,
  getAllProductsGroup: `${API_URL}/api/products/group`,
  getProductFiltre: `${API_URL}/api/products/filtre`,

  getProductByCategory: `${API_URL}/api/products/`,
  getProductByName: `${API_URL}/api/products/product/`,
  getProductByReference: `${API_URL}/api/products/reference/`,
  getSearchProduct: `${API_URL}/api/products/search/`,
  getProductByfacilated: `${API_URL}/api/product_by_facilated/`,
  getAllProductByfacilated: `${API_URL}/api/product_by_facilated`,
  getGaleryProduct: `${API_URL}/api/products/product_image/`,
  getAttributProduct: `${API_URL}/api/products/product_attribut/`,
  /////////////////////Settings//////////
  api_settingsIndex: `${API_URL}/api/settings`,
  ///////////Contact//////////
  api_contactAdd: `${API_URL}/api/contact`,
  ///////////////////:Orders///////
  orders: `${API_URL}/api/orders`,
  orderschildByParentId: `${API_URL}/api/orders_child/details/`,
  ordersById: `${API_URL}/api/orders/orders/details/`,
  ordersChildById: `${API_URL}/api/orders_child/`,
  createOrder: `${API_URL}/api/orders/create`,
  orders_delivery: `${API_URLS}/api/sc/list/deliverys/ecommerce/`,

  //////Pub////////
  api_publicationsIndex: `${API_URL}/api/publications/type/`,
};
export { API_URL, Apis };
