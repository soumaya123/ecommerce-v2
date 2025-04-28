import api from '../Api/api';
import { Apis } from '../Api/config';
    const addOrders = async (data) => {
        try {
        
        let result = await api.post(Apis.createOrder,data);
        if (result.data.error) {
            return null;
        }
        
        return result.data;
        } catch (error) {
        ;
        return null;
        }
  };
    const getOrders = async () => {
        try {
        
        let result = await api.get(Apis.orders);
        if (result.data.error) {
            return null;
        }
        
        return result.data;
        } catch (error) {
        ;
        return null;
        }
    };
    const getOrdersChildByParentId= async (status) => {
        try {
        
        let result = await api.get(Apis.orderschildByParentId+status);
        if (result.data.error) {
            return null;
        }
        
        return result.data;
        } catch (error) {
        ;
        return null;
        }
    };
    const getOrderById = async (id) => {
        try {
        
        let result = await api.get(Apis.ordersById+id);
        if (result.data.error) {
            return null;
        }
        
        return result.data;
        } catch (error) {
        ;
        return null;
        }
    };
    const getOrderChildById = async (id) => {
        try {
        
        let result = await api.get(Apis.ordersChildById+id);
        if (result.data.error) {
            return null;
        }
        
        return result.data;
        } catch (error) {
        ;
        return null;
        }
    };
    const getDelivery = async (status) => {
        try {
            let result = await api.get(Apis.orders_delivery+status);
            if (result.data.error) {
                return null;
            }
            return result.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const changeOrders = async (id,data) => {
        try {
        
        let result = await api.post(Apis.changeordersById+id,data);
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
    addOrders,
    getOrderById,
    getOrderChildById,
    getOrders,
    getOrdersChildByParentId,
    getDelivery,
    changeOrders
  
};