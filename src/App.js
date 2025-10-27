import { useEffect } from 'react';
import axios from 'axios';
import {Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {

  //useEffect 內只能放同步函式，不能直接放 async function
  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    // async function fetchData() {
    //   const res = await axios.get(`${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
    //   console.log(res);
    //   }
    // fetchData();

    //立即呼叫 IIFE 
    (async () => {

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      console.log(res);

    })();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </div>
  );
}

export default App;
