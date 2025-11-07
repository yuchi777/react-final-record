import { useEffect, useState } from "react";
import axios from "axios"; 
import { useParams } from "react-router-dom"; //useParams方法取得路由網址中的參數

function ProductDetail() {

const [product, setProduct] = useState({});
const { id } = useParams();
console.log(id);

const getProduct = async(id) => {

  const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
  console.log(productRes);
  setProduct(productRes.data.product);
}

useEffect(() => {
  getProduct(id);
}, [id]);


  return (
    <div className="container">
      <div 
        style= {{ 
        minHeight: '400px', 
        backgroundImage: `url(${product.imageUrl ? "" : 'https://picsum.photos/g/1080/?blur'})`,
        backgroundPosition: 'center center'}}
      >
      </div>
      <div className="row justify-content-between mt-4 mb-7">
        <div className="col-md-7">
          <h2 className="mb-0">{product.title}</h2>
          <p className="fw-bold">{product.price}</p>
          <p>{product.content}</p>
          <div className="my-4">
            <img src="https://picsum.photos/g/400/?blur" alt="" className="img-fluid mt-4" />
              <img src="https://picsum.photos/g/400/?blur" alt="" className="img-fluid mt-4" />
                <img src="https://picsum.photos/g/400/?blur" alt="" className="img-fluid mt-4" />
                </div>
                <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                  <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                      <div className="d-flex justify-content-between align-items-center pe-1">
                        <h4 className="mb-0">
                          Lorem ipsum
                        </h4>
                        <i className="fas fa-minus"></i>
                      </div>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                      <div className="card-body pb-5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      </div>
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                      <div className="d-flex justify-content-between align-items-center pe-1">
                        <h4 className="mb-0">
                          Lorem ipsum
                        </h4>
                        <i className="fas fa-plus"></i>
                      </div>
                    </div>
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                      <div className="card-body pb-5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      </div>
                    </div>
                  </div>
                  <div className="card border-0">
                    <div className="card-header py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                      <div className="d-flex justify-content-between align-items-center pe-1">
                        <h4 className="mb-0">
                          Lorem ipsum
                        </h4>
                        <i className="fas fa-plus"></i>
                      </div>
                    </div>
                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                      <div className="card-body pb-5">
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="input-group mb-3 border mt-3">
                  <div className="input-group-prepend">
                    <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon1">
                      <i className="fas fa-minus"></i>
                    </button>
                  </div>
                  <input type="text" className="form-control border-0 text-center my-auto shadow-none" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1"  />
                    <div className="input-group-append">
                      <button className="btn btn-outline-dark rounded-0 border-0 py-3" type="button" id="button-addon2">
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                </div>
                <a href="./checkout.html" className="btn btn-dark btn-block rounded-0 py-3">Lorem ipsum</a>
              </div>
          </div>
        </div>
        )
}
export default ProductDetail;