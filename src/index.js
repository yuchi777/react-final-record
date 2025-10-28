import React from 'react';
import ReactDOM from 'react-dom/client';

// 加入bootstrap 
// import 'bootstrap/scss/bootstrap.scss';
// 加入自定義boostrap樣式
import './stylesheets/all.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
// 加入Axios
import axios from 'axios';

// 加入react-router-dom 
// #（hash）後面的內容不會被伺服器解析，屬於「前端路由」的一部分。
import { HashRouter } from 'react-router-dom';


//預設網址
axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
