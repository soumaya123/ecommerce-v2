import api from '../Api/api';
import { Apis } from '../Api/config';
import { setCookie } from "../jwt/function";
import jwt_decode from "jwt-decode";
const userRegister = async (data) => {
  try {
      let result = await api.post(Apis.UserRegsiter, data);
      if (result.data.error) {
         
          return null;
      }
      return result.data;
  } catch (error) {
      ;
      return null;
  }
};
const forgotPassword = async (data) => {
    try {
        console.log(Apis.forgetPassword, data)
        let result = await api.post(Apis.forgetPassword, data);
        if (result.data.error) {
           
            return null;
        }
        return result.data;
    } catch (error) {
        ;
        return null;
    }
};
const UserLogin = async (data) => {
     //console.log("data", Apis.UserLogin)
        try {
            let result = await api.post(Apis.UserLogin, data, {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type": "application/json",
                
                },
            });
            if (result.data.error) {
            // NotificationPop("error", i18n.t("not success"), "check login")
                window.reload()
                return null;
            }
        // NotificationPop("success", i18n.t("success"), "")
            return result.data;
        } catch (error) {
            //NotificationPop("error",i18n.t ("not success"), "check login")

            return null;
        }
    };
    const userByID = async (id) => {
        try {
          
    
            let result = await api.get(Apis.UserById+id);
            if (result.data.error) {
                return null;
            }
            return result.data;
        } catch (error) {
            ;
            return null;
        }
      };
    const authenticate = (user, next) => {
        //console.log("authenticate", typeof window)
       // console.log("authenticate", user.token)
        localStorage.setItem('@access_token', user.token)
        localStorage.setItem('user', JSON.stringify(user?.user))
        next();
        if (typeof window !== "undefined") {
            setCookie("@token_session", user.token, 10);
            next();
        }
    };
    const GET_Role = () => {

    if (localStorage.getItem('@access_token')) {
        var decodedHeader = jwt_decode(localStorage.getItem('@access_token'));
        //console.log("decodedHeader", decodedHeader);
        return decodedHeader.roles
    } else { return [] }

    }
    const userUpdate = async (id,data) => {
        try {
            let result = await api.put(Apis.UserUpdate+id,data);
           // console.log(Apis.UserUpdate+id)
            if (result.data.error) {
               
                return null;
            }
            return result.data;
        } catch (error) {
            ;
            return null;
        }
    };
    const uploadFile = async (id,data) => {
        try {
            let result = await api.put(Apis.uploadFile+id,data);
           // console.log(Apis.UserUpdate+id)
            if (result.data.error) {
               
                return null;
            }
            return result.data;
        } catch (error) {
            ;
            return null;
        }
    };
    const logout = () => {
        localStorage.removeItem('@access_token',)
        localStorage.removeItem('user',)

    };
    const isAuthenticate = () => {
        if (typeof window == 'undefined') {
            return false;
        }
        var user= {token: localStorage.getItem('@access_token'), user: JSON.parse(localStorage.getItem('user'))}
        return user
    };

  export default {
    
        userRegister,
        forgotPassword,
        UserLogin,
        authenticate,
        GET_Role,
        isAuthenticate,
        logout,
        userByID,
        userUpdate,
        uploadFile,
};
