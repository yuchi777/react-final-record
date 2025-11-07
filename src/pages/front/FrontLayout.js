import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";

function FrontLayou() {
  
  const [cartData, setCartData] = useState({}); //存放購物車的資料

  const getCart = async() => {
    try {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
      console.log('購物車內容',res);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, [])


  return (
    <>
      <Navbar cartData={cartData}/>

      {/* //將getCart傳給子元件用物件方式，如果子元件要用解構方式接收 */}
      <Outlet context={{getCart}}/> 

      <div className="bg-dark">
        <div className="container">
          <div className="d-flex align-items-center justify-content-between text-white py-4">
            <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
            <ul className="d-flex list-unstyled mb-0 h4">
              <li><a href="/" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
              <li><a href="/" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
              <li><a href="/" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )

}

export default FrontLayou;