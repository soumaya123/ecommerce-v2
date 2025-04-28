import React from 'react';
import ReactDOM from 'react-dom';
import App from './main-component/App/App';
import './i18n';
import axios from 'axios';
import i18next from 'i18next';
import { BrowserRouter } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
const lang=localStorage.getItem('lang')||'fr';
axios.defaults.headers.common['Accept-Language']=lang;
i18next.changeLanguage(lang);
//console.log = () => {};
ReactDOM.render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    document.getElementById('root')
  );
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
