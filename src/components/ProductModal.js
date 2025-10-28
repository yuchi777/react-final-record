

function ProductModal({closeProductModal}) {

  return (

    // Bootstrap Modal 
    <div 
      className="modal fade" 
      id="productModal" 
      tabIndex="-1" 
      aria-labelledby="exampleModalLabel" 
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
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
            ...
          </div>
          <div className="modal-footer">
            <button 
              type="button" 
              className="btn btn-secondary" 
              // data-bs-dismiss="modal" //bootstrap內建關閉modal功能
              onClick={closeProductModal}
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default ProductModal;