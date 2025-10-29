import axios from "axios";
import { useState, useEffect } from "react";

function CouponModal({ closeModal, getCoupons, type, tempCoupon }) {
  const [tempData, setTempData] = useState({
    title: '',
    is_enabled: '',
    percent: '',
    due_date: '',
    code: ''
  });

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        is_enabled: '',
        percent: '',
        due_date: '',
        code: ''
      })
    } else if (type === 'edit') {
      setTempData(tempCoupon)
    }

  }, [type, tempCoupon])

  // 表單資料更新
  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    // console.log(name, value);

    if (['due_date', 'percent'].includes(name)) { //includes判斷陣列內是否有某個欄位名稱 //型別確認

      setTempData({
        ...tempData, //展開原本的物件內容
        [name]: Number(value), //更新被改變的欄位//轉成數字
      })
    } else if (type === 'checkbox') { //checkbox特殊處理
      setTempData({
        ...tempData, //展開原本的物件內容
        [name]: checked ? 1 : 0, //更新被改變的欄位//轉成1或0
      })
    } else {
      setTempData({
        ...tempData, //展開原本的物件內容
        [name]: value,
      })
    }
  }

  //提交表單
  const submit = async () => {
    try {

      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon`;
      let method = 'post';

      if (type === 'edit') {
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${tempCoupon.id}`;
        method = 'put'
      }
      // const res = await axios.post(api, { data: tempData });
      // axios[method] 是用 JavaScript 的「方括號存取屬性」語法動態呼叫函式。
      const res = await axios[method](api, { data: tempData });


      console.log(res);
      closeModal();
      getCoupons();
    } catch (error) {
      console.log(error);
    }

  }

  return (

    // Bootstrap Modal 
    <div
      className="modal fade"
      id="couponModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              {type === 'create' ? '建立新優惠卷' : `編輯${tempData.title}`}
            </h1>
            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal" //bootstrap內建關閉modal功能
              aria-label="Close"
              onClick={closeModal}
            >

            </button>
          </div>
          <div className="modal-body">

            <div className="mb-2">
              <label htmlFor="title" className="w-100">
                標題
              </label>
              <input
                type="text"
                id="title"
                placeholder="請輸入標題"
                name="title"
                className="form-control mt-1"
                onChange={handleChange}
                value={tempData.title}
              />
            </div>
            <div className="row">
              <div className="mb-2 col-md-6">
                <label htmlFor="percent" className="w-100">
                  折扣 (%)
                  <input
                    type="text"
                    name="percent"
                    id="percent"
                    placeholder="請輸入折扣(%)"
                    className="form-control mt-1"
                    onChange={handleChange}
                    value={tempData.percent}
                  />
                </label>
              </div>
              <div className="mb-2 col-md-6">
                <label htmlFor="due_date" className="w-100">
                  到期日
                  <input
                    type="due_date"
                    id="due_date"
                    name="due_date"
                    placeholder="請輸入到期日"
                    className="form-control mt-1"
                    onChange={handleChange}
                    value={tempData.due_date}
                  />
                </label>
              </div>

              <div className="mb-2 col-md-6">
                <label htmlFor="code" className="w-100">
                  優惠碼
                  <input
                    type="text"
                    name="code"
                    id="code"
                    className="form-control mt-1"
                    placeholder="請輸入優惠碼"
                    onChange={handleChange}
                    value={tempData.code}
                  />
                </label>
              </div>
              
            
                <div>
                  <label htmlFor="is_enabled" className="w-100 form-check-label">
                    是否啟用
                  </label>
                  <input
                    type="checkbox"
                    id="is_enabled"
                    name="is_enabled"
                    className="form-check-input me-2"
                    onChange={handleChange}
                    // checked={Boolean(tempData.is_enabled)} 
                    checked={!!tempData.is_enabled} // !!轉換布林值
                  />
                </div>
              
            </div>





          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              // data-bs-dismiss="modal" //bootstrap內建關閉modal功能
              onClick={closeModal}
            >
              關閉
            </button>
            <button type="button" className="btn btn-primary" onClick={submit}>儲存</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default CouponModal;