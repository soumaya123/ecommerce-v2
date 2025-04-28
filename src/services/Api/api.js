// import axios from "axios";
// import TokenService from "./Token";
// const instance = axios.create({
//   baseURL: "http://localhost:8080/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });
// instance.interceptors.request.use(
//   (config) => {
//     const token = TokenService.getLocalAccessToken();
//     if (token) {
//       // config.headers["Authorization"] = 'Bearer ' + token;  // for Spring Boot back-end
//       config.headers["x-access-token"] = token; // for Node.js Express back-end
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
// instance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   async (err) => {
//     const originalConfig = err.config;
//     if (originalConfig.url !== "/auth/signin" && err.response) {
//       // Access Token was expired
//       if (err.response.status === 401 && !originalConfig._retry) {
//         originalConfig._retry = true;
//         try {
//           const rs = await instance.post("/auth/refreshtoken", {
//             refreshToken: TokenService.getLocalRefreshToken(),
//           });
//           const { accessToken } = rs.data;
//           TokenService.updateLocalAccessToken(accessToken);
//           return instance(originalConfig);
//         } catch (_error) {
//           return Promise.reject(_error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   }
// );
// export default instance;

import axios from 'axios';
import { API_URL } from './config';
//import { getCookie } from '../jwt/function'

export default axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type":"application/json",
     //  "Authorization": getCookie('token'),
        'Access-Control-Allow-Headers': 'Authorization',
        "x-access-token": localStorage.getItem('@access_token'),
        'Authorization': 'Bearer ' + localStorage.getItem('@access_token'),
    },
})
