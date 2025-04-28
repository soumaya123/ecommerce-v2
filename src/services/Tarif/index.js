import api from '../Api/api';
import { Apis } from '../Api/config';

const TarifIndex = async () => {
    try {
        console.log("tarif",Apis.api_tarifIndex)
        let result = await api.get(Apis.api_tarifIndex);
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
    TarifIndex,
};