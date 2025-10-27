import { useEffect } from "react";
import axios from "axios";

function AdminProducts() {

    useEffect(()=>{
    // 取出Token
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('yuchiToken='))
      ?.split('=')[1];
    console.log(token,'token is here');


    axios.defaults.headers.common['Authorization'] = token ;
    // (async()=>{
    //   const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`)
    //   console.log(productRes);
    
    // })();

  },[])


  return(
    <div className="p-3">
            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
              <button
                className="btn btn-primary btn-sm"
                type="button"
                >
                建立新商品
              </button>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">分類</th>
                  <th scope="col">名稱</th>
                </tr>
              </thead>
            </table>
          </div>
  );
}

export default AdminProducts;