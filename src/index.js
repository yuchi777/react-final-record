import React from 'react';
import ReactDOM from 'react-dom/client';

// 加入bootstrap 
// import 'bootstrap/scss/bootstrap.scss';
// 加入自定義boostrap樣式
import './stylesheets/all.scss'

import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

//預設網址
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
