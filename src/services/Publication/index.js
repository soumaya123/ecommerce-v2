import api from '../Api/api';
import { Apis } from '../Api/config';

const publicationsIndex = async (type) => {
    try {
        console.log(Apis.api_publicationsIndex+type)
        let result = await api.get(Apis.api_publicationsIndex+type);
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
    
    publicationsIndex

  
};