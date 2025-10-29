import { useEffect } from 'react';
// import axios from 'axios';
import {Routes, Route } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCoupons from './pages/admin/AdminCoupons';

function App() {

  //useEffect 內只能放同步函式，不能直接放 async function
  useEffect(() => {
    // console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    // async function fetchData() {
    //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    //   console.log(res);
    //   }
    // fetchData();

    //立即呼叫 IIFE 
    // (async () => {
    //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    //   console.log(res);
    // })();
  }, []);

  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
        <Route path="/login" element={<Login/>} />
        <Route path='/admin' element={<Dashboard/>}>
          <Route path="products" element={<AdminProducts/>} />
          <Route path="coupons" element={<AdminCoupons/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
