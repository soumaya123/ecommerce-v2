import api from '../Api/api';
import { Apis } from '../Api/config';

  const getAllProducts = async () => {
    try {
      //alert(Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getAllProducts);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getAllProductsGroup = async () => {
    try {
      //alert(Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getAllProductsGroup);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProductFiltre = async (ids) => {
    try {
      //alert(Apis.getProductByCategory+id)
        console.log(Apis.getProductFiltre,ids)
        let result = await api.post(Apis.getProductFiltre,ids);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProduct = async (id) => {
    try {
      console.log("cc11",Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getProductByCategory+id);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProductByName = async (name) => {
    try {
      console.log("cc11",Apis.getProductByName+name)
        
        let result = await api.get(Apis.getProductByName+name);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProductByReference = async (ref) => {
    try {
      console.log("cc11",Apis.getProductByReference+ref)
        
        let result = await api.get(Apis.getProductByReference+ref);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProductByCategory = async (id) => {
    try {
      //alert(Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getProductByCategory+id);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getSearchProduct = async (id) => {
    try {
      //alert(Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getSearchProduct+id);
      
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
  };
  const getProductByfacilated = async (status) => {
    console.log("okkkk",Apis.getProductByfacilated+status)
    try {
        let result = await api.get(Apis.getProductByfacilated+status);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const getGalerieProduct = async (id) => {
  try {
    console.log(Apis.getGaleryProduct+id)
      
      let result = await api.get(Apis.getGaleryProduct+id);
    
      if (result.data.error) {
          return null;
      }
      return result.data;
  } catch (error) {
      ;
      return null;
  }
};
const getAllProductByfacilated = async () => {
  console.log("okkkk",Apis.getAllProductByfacilated)
  try {
      let result = await api.get(Apis.getAllProductByfacilated);
      if (result.data.error) {
          return null;
      }
      return result.data;
  } catch (error) {
      console.log(error);
      return null;
  }
};
const getAttributProduct = async (id) => {
  try {
    console.log(Apis.getAttributProduct+id)
      
      let result = await api.get(Apis.getAttributProduct+id);
    
      if (result.data.error) {
          return null;
      }
      return result.data;
  } catch (error) {
      ;
      return null;
  }
};

  export default {
    
    getAllProducts,
    getAllProductsGroup,
    getProductFiltre,
    getProduct,
    getProductByName,
    getProductByReference,
    getProductByCategory,
    getSearchProduct,
    getProductByfacilated,
    getGalerieProduct,
    getAllProductByfacilated,
    getAttributProduct,

  
};