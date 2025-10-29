import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Modal } from 'bootstrap';
import CouponModal from "../../components/CouponModal.js";
import DeleteModal from "../../components/DeleteModal.js";
import Pagination from "../../components/Pagination.js";

function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [pagination, setPagination] = useState({});

  // type: 決定modal展開的用途
  const [type, setType] = useState('create'); //create or edit
  const [tempCoupon, setTempCoupon] = useState({});  //儲存目前正在編輯的產品資料

  const couponModal = useRef(null);
  const deleteModal = useRef(null);


  useEffect(() => {

    //創建Modal的實體
    //加入設定值 backdrop:'static' 點擊背景不會關閉modal
    couponModal.current = new Modal('#couponModal', {
      backdrop: 'static',
    });

    deleteModal.current = new Modal('#deleteModal', {
      backdrop: 'static'
    })

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
    getCoupons();

  }, [])


  const getCoupons = async (page = 1) => { //page預設為第一頁

    const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`);
    console.log(res);
    setCoupons(res.data.coupons);
    setPagination(res.data.pagination);
  }

  //開啟Modal
  const openCouponModal = (type, item) => {
    setType(type);
    setTempCoupon(item);
    couponModal.current.show();
  }

  //關閉Modal
  const closeModal = () => {
    couponModal.current.hide();
  }

  //開啟Modal
  const openDeleteModal = (product) => {
    setTempCoupon(product);
    deleteModal.current.show();
  }

  //關閉Modal
  const closeDeleteModal = () => {
    deleteModal.current.hide();
  }

  const deleteCoupon = async (id) => {
    try {
      const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
      // console.log(res);
      if (res.data.success) {
        getCoupons();
        deleteModal.current.hide();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-3">
      <CouponModal
        closeModal={closeModal}
        getCoupons={getCoupons}
        tempCoupon={tempCoupon}
        type={type}
      />
      <DeleteModal
        close={closeDeleteModal}
        text={tempCoupon.title}
        handleDelete={deleteCoupon}
        id={tempCoupon.id}
      />
      <h3>優惠卷列表</h3>
      <hr />
      <div className="text-end">
        <button
          className="btn btn-primary btn-sm"
          type="button"
          onClick={() => openCouponModal('create', {})}
        >
          建立新優惠卷
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">標題</th>
            <th scope="col">折扣</th>
            <th scope="col">到期日</th>
            <th scope="col">優惠碼</th>
            <th scope="col">啟用狀態</th>
            <th scope="col">編輯</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map(
            (product) => {
              return (
                <tr key={product.id}>
                  <td>{product.title}</td>
                  <td>{product.percent}</td>
                  <td>{product.due_date}</td>
                  <td>{product.code}</td>
                  <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => { openCouponModal('edit', product) }}
                    >
                      編輯
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => openDeleteModal(product)}
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
      <Pagination
        pagination={pagination}
        changePage={getCoupons}
      />
      
    </div>
  );
}

export default AdminCoupons;