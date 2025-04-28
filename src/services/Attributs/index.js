import api from '../Api/api';
import { Apis } from '../Api/config';

const AttributsIndex = async () => {
    try {
        let result = await api.get(Apis.api_attributsIndex);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const ProductsAttributsIndex = async () => {
    try {
        console.log(Apis.api_productsattributsIndex)
        let result = await api.get(Apis.api_productsattributsIndex);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const  ConfigValuesById = async (id) => {
    try {
        let result = await api.get(Apis.api_configValuesbyid+id);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};

  export default {
    
    AttributsIndex,
    ProductsAttributsIndex,
    ConfigValuesById
};