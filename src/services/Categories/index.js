import api from '../Api/api';
import { Apis } from '../Api/config';
const getAllCategoryList = async () => {
    try {
    console.log(Apis.GetAllCategoryList)
      let result = await api.get(Apis.GetAllCategoryList);
      if (result.data.error) {
        return null;
      }
     
      return result.data;
    } catch (error) {
      ;
      return null;
    }
  };
  const getTopCategory= async () => {
    try {

        let result = await api.get(Apis.GetTopCategorie);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
};
  const getByCategory = async (id) => {
    try {
      

        let result = await api.get(Apis.ByCategory+id);
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

    getAllCategoryList,
    getTopCategory,
    getByCategory,
  
};