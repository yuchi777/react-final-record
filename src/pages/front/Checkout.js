import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Input } from '../../components/FormElement';

function Checkout() {

  const { cartData } = useOutletContext(); //使用useOutletContext方法從子元件取得父元件的方法

  const [orderDate] = useState(new Date().toLocaleString());
  const navigate = useNavigate();


  const { //useForm方法取得表單資料
    register,
    handleSubmit, // 使用handleSubmit來觸發表單驗證
    // watch,
    // getValues,
    // control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onTouched" //設定表單驗證模式
  });

  const onSubmit = async (data) => {
    try {
      const { name, email, tel, address } = data;
      const form = {
        data: {
          user: { name, email, tel, address },
          message: "訂購單訊息",
        },
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/v2/api/${process.env.REACT_APP_API_PATH}/order`,
        form
      );

      console.log("訂單成功送出", res.data);
      alert("訂單已成功送出！");
       navigate(`/success/${res.data.orderId}`);

    } catch (error) {
      console.error("訂單送出失敗：", error);
      alert("訂單送出失敗，請稍後再試。");
    }
  }

  return (
    <div className="bg-light pt-5 pb-7">
      <div className="container">
        <div className="row justify-content-center flex-md-row flex-column-reverse">
          {/* //使用useForm方法取得表單資料 //使用handleSubmit來觸發表單驗證 */}
          <div className="col-md-6" >
            <div className="bg-white p-4">
              <h4 className="fw-bold">訂單資料</h4>
              <p className="mt-4">{orderDate}</p>

              <form onSubmit={handleSubmit(onSubmit)}>

                <div className="mb-2">
                  <Input
                    id="email"
                    labelText="Email"
                    type="email"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "Email為必填",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // 驗證email格式符合條件
                        message: "Email格式不正確"
                      }
                    }}
                  />
                </div>



                <div className="mb-2">
                  <Input
                    id="name"
                    type="text"
                    errors={errors}
                    labelText="訂購人名稱"
                    register={register}
                    rules={{
                      required: "請輸入訂購人名稱",
                      maxLength: {
                        value: 10,
                        message: "最多輸入10個字"
                      }
                    }}
                  />
                </div>

                <div className="mb-2">
                  <Input
                    id="tel"
                    labelText="電話"
                    type="tel"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "電話為必填",
                      minLength: {
                        value: 6,
                        message: "最少輸入6個碼"
                      },
                      maxLength: {
                        value: 12,
                        message: "最多輸入12碼"
                      },
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "電話只能輸入數字"
                      }
                    }}
                  />
                </div>

                <div className="mb-2">
                  <Input
                    id="address"
                    labelText="地址"
                    type="text"
                    errors={errors}
                    register={register}
                    rules={{
                      required: "地址為必填"
                    }}
                  />
                </div>

                <div className='d-grid'>
                  <button
                    type="submit"
                    className="btn btn-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? '送出中...' : '送出訂單'}
                  </button>
                </div>

              </form>
            </div>


          </div>


          <div className="col-md-4">
            <div className="border p-4 mb-4">
              <h4 className="mb-4">Order Detail</h4>
              {
                cartData?.carts?.map((item) => {
                  return (
                    <div className="d-flex" key={item.id}>
                      <img
                        src="https://picsum.photos/g/50/?blur"
                        alt=""
                        className="me-2"
                        style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                      />
                      <div className="w-100">
                        <div className="d-flex justify-content-between fw-bold">
                          <p className="mb-0">{item.product.title}</p>
                          <p className="mb-0">x{item.qty}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0">
                            <small>單價: {item.product.price}</small>
                          </p>

                        </div>
                        <div className="d-flex justify-content-between">
                          <p className="mb-0">
                            <small>小計: {item.final_total}</small>
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })
              }


              <div className="d-flex justify-content-between mt-4">
                <p className="mb-0 h4 fw-bold">
                  總計
                  ${cartData?.final_total}
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout;