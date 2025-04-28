import api from '../Api/api';
import { Apis } from '../Api/config';
import 'react-notifications/lib/notifications.css';
import {NotificationManager} from 'react-notifications';
const SettingsIndex = async () => {
    try {
        let result = await api.get(Apis.api_settingsIndex);
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
    SettingsIndex,
};
export default functionexport 
