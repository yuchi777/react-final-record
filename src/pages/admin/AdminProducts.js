import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal.js";
import { Modal } from 'bootstrap';


function AdminProducts() {
  const [products, setProducts] = useState([]);
  // const [pagination, setPagination] = useState({});
  
  // type: 決定modal展開的用途
  const [type, setType] = useState('create'); //create or edit
  const [tempProduct, setTempProduct] = useState({});  //儲存目前正在編輯的產品資料

  const productModal = useRef(null);

  useEffect(() => {

    //創建Modal的實體
    //加入設定值 backdrop:'static' 點擊背景不會關閉modal
    productModal.current = new Modal('#productModal', {
      backdrop: 'static',
    });

    // 取出Token
    // const token = document.cookie
    //   .split('; ')
    //   .find(row => row.startsWith('yuchiToken='))
    //   ?.split('=')[1];
    // console.log(token, 'token is here');
    // axios.defaults.headers.common['Authorization'] = token;


    // (async()=>{
    //   const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`)
    //   console.log(productRes);
    // })();

    // (async () => {
    //   const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`);
    //   console.log(productRes);
    //   setProducts(productRes.data.products);
    //   // setPagination(productRes.data.pagination);
    // })();
    getProducts();

  }, [])


  const getProducts = async () => {
    const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`);
    console.log(productRes);
    setProducts(productRes.data.products);
    // setPagination(productRes.data.pagination);
  }


  const openProductModal = (type, product) => {
    setType(type);
    setTempProduct(product);
    productModal.current.show();
  }

  const closeProductModal = () => {
    productModal.current.hide();
  }

  return (
    <div className="p-3">
      <ProductModal 
        closeProductModal={closeProductModal} 
        getProducts={getProducts}
        tempProduct={tempProduct}
        type={type}
      />
      <h3>產品列表</h3>
      <hr />
      <div className="text-end">
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={()=> openProductModal('create', {} )}
        >
          建立新商品
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">分類</th>
            <th scope="col">名稱</th>
            <th scope="col">售價</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {products.map(
            (product) => {
              return (
                <tr key={product.id}>
                  <td>{product.category}</td>
                  <td>{product.title}</td>
                  <td>{product.price}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={()=>{openProductModal('edit',product)}}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                    >
                      刪除
                    </button>
                  </td>
                </tr>
              )
            }
          )}

        </tbody>
      </table>
      {/* <Pagination pagination={pagination} changePage={getProducts} /> */}
    </div>
  );
}

export default AdminProducts;