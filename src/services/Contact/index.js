import api from '../Api/api';
import { Apis } from '../Api/config';
import 'react-notifications/lib/notifications.css';
// import {NotificationManager} from 'react-notifications';

const ContactAdd = async (data) => {

    try {
        console.log(Apis.api_contactAdd)
        let result = await api.post(Apis.api_contactAdd,data);
        if (result.data.error) {
            return null;
        }
        return result.data;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const functionexport ={
    ContactAdd,
};
export default functionexport 
