import axios from "axios";
import { useState, useEffect } from "react";

function ProductModal({ closeProductModal, getProducts, type, tempProduct }) {
  const [tempData, setTempData] = useState({
    title: '',
    category: '',
    origin_price: 100,
    price: 300,
    unit: '',
    description: '',
    content: '',
    is_enabled: 1,
    imageUrl: '',
  });

  useEffect(() => {
    if (type === 'create') {
      setTempData({
        title: '',
        category: '',
        origin_price: 100,
        price: 300,
        unit: '',
        description: '',
        content: '',
        is_enabled: 1,
        imageUrl: '',
      })
    }else if(type === 'edit'){
      setTempData(tempProduct)
    }

  }, [type, tempProduct])

// 表單資料更新
  const handleChange = (e) => {
    const { value, name, checked, type } = e.target;
    console.log(name, value);

    if (['price', 'origin_price'].includes(name)) { //includes判斷陣列內是否有某個欄位名稱
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

      let api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product`;
      let method = 'post';

      if(type === 'edit'){
        api = `/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${tempProduct.id}`;
        method = 'put'
      }
      // const res = await axios.post(api, { data: tempData });
      // axios[method] 是用 JavaScript 的「方括號存取屬性」語法動態呼叫函式。
      const res = await axios[method](api, { data: tempData });


      console.log(res);
      closeProductModal();
      getProducts();
    } catch (error) {
      console.log(error);
    }

  }

  return (

    // Bootstrap Modal 
    <div
      className="modal fade"
      id="productModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              { type === 'create' ? '建立新商品' : `編輯${tempData.title}` }
            </h1>
            <button
              type="button"
              className="btn-close"
              // data-bs-dismiss="modal" //bootstrap內建關閉modal功能
              aria-label="Close"
              onClick={closeProductModal}
            >

            </button>
          </div>
          <div className="modal-body">

            <div className="row">
              <div className="col-sm-4">
                <div className="form-group mb-2">
                  <label htmlFor="image" className="w-100">
                    圖片網址
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    id="image"
                    placeholder="請輸入圖片連結"
                    className="form-control"
                  />
                </div>

                <div className="form-group mb-2">
                  <label htmlFor="customFile" className="w-100">或上傳圖片</label>
                  <input
                    type="file"
                    id="customFile"
                    className="form-control"
                  />
                </div>
                {/* <img src="" alt="" className="img-fluid" /> */}
                {tempData.imageUrl && (
                  <img src={tempData.imageUrl} alt="商品圖片" className="img-fluid" />
                )}
              </div>

              <div className="col-sm-8">

                {/* 顯示目前tempData內容 */}
                {/* <pre>
                  {JSON.stringify(tempData)}
                </pre> */}
                <div className="form-group mb-2">
                  <label htmlFor="title" className="w-100">
                    標題
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="請輸入標題"
                    className="form-control"
                    onChange={handleChange}
                    value={tempData.title}
                  />
                </div>
                <div className="row">
                  <div className="form-group mb-2 col-md-6">
                    <label htmlFor="category" className="w-100">
                      分類
                      <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="請輸入分類"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.category}
                      />
                    </label>
                  </div>
                  <div className="form-group mb-2 col-md-6">
                    <label htmlFor="unit" className="w-100">
                      單位
                      <input
                        type="unit"
                        id="unit"
                        name="unit"
                        placeholder="請輸入單位"
                        className="form-control"
                        onChange={handleChange}
                        value={tempData.unit}
                      />
                    </label>
                  </div>
                  <div className="row">
                    <div className="form-group mb-2 col-md-6">
                      <label htmlFor="origin_price" className="w-100">
                        原價
                        <input
                          type="number"
                          name="origin_price"
                          id="origin_price"
                          className="form-control"
                          placeholder="請輸入原價"
                          onChange={handleChange}
                          value={tempData.origin_price}
                        />
                      </label>
                    </div>
                    <div className="form-group mb-2 col-md-6">
                      <label htmlFor="price" className="w-100">
                        售價
                        <input
                          type="number"
                          id="price"
                          name="price"
                          placeholder="請輸入售價"
                          className="form-control"
                          onChange={handleChange}
                          value={tempData.price}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="description" className="w-100">
                      產品描述
                    </label>
                    <textarea
                      type="text"
                      id="description"
                      name="description"
                      placeholder="請輸入產品描述"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.description}
                    >
                    </textarea>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="content" className="w-100">
                      說明內容
                    </label>
                    <textarea
                      type="text"
                      id="content"
                      name="content"
                      placeholder="請輸入產品說明內容"
                      className="form-control"
                      onChange={handleChange}
                      value={tempData.content}
                    >
                    </textarea>
                  </div>
                  <div className="form-group mb-2">
                    <div className="form-check">
                      <label htmlFor="is_enabled" className="w-100 form-check-label">
                        是否啟用
                      </label>
                      <input
                        type="checkbox"
                        id="is_enabled"
                        name="is_enabled"
                        placeholder="請輸入產品說明內容"
                        className="form-check-input"
                        onChange={handleChange}
                        // checked={Boolean(tempData.is_enabled)} 
                        checked={!!tempData.is_enabled} // !!轉換布林值
                      />
                    </div>
                  </div>
                </div>


              </div>
            </div>

          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              // data-bs-dismiss="modal" //bootstrap內建關閉modal功能
              onClick={closeProductModal}
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

export default ProductModal;