import api from '../Api/api';
import { Apis } from '../Api/config';

  const getAllBrands = async () => {
    try {
      //alert(Apis.getProductByCategory+id)
        
        let result = await api.get(Apis.getAllBrands);
      
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
    
    getAllBrands,
  
};