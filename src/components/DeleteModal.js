

function DeleteModal({ close, text, handleDelete, id }) {


  return (
    <div
      className="modal fade"
      tabIndex="-1"
      id="deleteModal"
      aria-labelledby="exampleModalLabel"
      aria-hidden='true'
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h1 className="modal-title text-white fs-5" id="exampleModalLabel">
              刪除確認
            </h1>
            <button 
              className="btn-close" 
              type="button" 
              aria-label="Close" 
              onClick={close}
            >
            </button>
          </div>
          <div className="modal-body">刪除 {text}</div>
          <div className="modal-footer">
            <button className="btn btn-secondary" type="button" onClick={close}>取消</button>
            <button className="btn btn-danger" type="button" onClick={()=>{ handleDelete(id)
            }}>確認刪除</button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DeleteModal;
