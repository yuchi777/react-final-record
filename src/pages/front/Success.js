import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
const Success = () => {

  const { orderId } = useParams(); // 取得路由網址中的參數
  console.log('訂單編號ID', orderId);

  const [orderData, setOrderData] = useState({});

  const getCart = async (orderId) => {
    try {
      const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`);
      console.log('orderData', res);
      setOrderData(res.data.order);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCart();
  }, [orderId]);

  return (
    <div className="container">

      <div
        style={{
          minHeight: '400px',
          backgroundImage: 'url(https://picsum.photos/g/800/?blur)',
          backgroundPosition: 'center center',
        }}
      >
      </div>

      <div className="mt-5 mb-7">
        <div className="row">
          <div className="col-md-6">
            <h2>
              您的訂購已成立
            </h2>
            <p className="text-muted">
              感謝您的購買,您的訂單編號為:{orderId}
            </p>
            <Link to='/' className="btn btn-outline-dark me-2 rounded-0 mb-4">
              回到首頁
            </Link>
          </div>
          <div className="col-md-6">
            <div className="card rounded-0 py-4">
              <div className="card-header border-bottom-0 bg-white px-4 py-0">
                <h2>訂單摘要</h2>
              </div>
              <div className="card-body px-4 py-0">
                <ul className="list-group list-group-flush">
                  {orderData && Object.keys(orderData).length === 0 ? (
                    <li className="list-group-item px-0">請稍等,資料載入中...</li>
                  ) : ""}
                  {/* 物件結構轉為陣列使用Object.values()，陣列才有map方法，避免ajax回傳undefined所以加上{}空物件 */}
                  {Object.values(orderData?.products || {})?.map((item) => {
                    return (
                      <li className="list-group-item px-0" key={item.id}>
                        <div className="d-flex  mt-2">
                          <img
                            src="https://picsum.photos/g/50/?blur"
                            alt=""
                            className="me-2"
                            style={{ width: '60px', height: '60px' }}
                          />
                          <div className="w-100 d-flex flex-column">
                            <div className="d-flex justify-content-between fw-bold">
                              <h5>{item.product.title} </h5>
                              <p className="mb-0"></p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Success;
