import { Outlet } from "react-router-dom";


function Dashboard(){


  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <p className="text-white mb-0">後台管理系統</p>
          <button 
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
        </div>
      </nav>
      <div 
        className="d-flex"
        style={{ minHeight: 'calc(100vh-56px)' }}
      >
        <div 
          className="bg-light"
          stylle={{ width: '200px' }}
        >
          <ul className="list-group list-group-flush">
            <a 
              to="/admin/products" 
              className="list-group-item list-group-item-action py-3"
            >
              <i className="bi bi-cup-fill me-2">
                產品列表
              </i>
            </a>
            <a 
              to="/admin/coupons" 
              className="list-group-item list-group-item-action py-3">
                <i className="bi bi-ticket-perforated-fill me-2">
                  優惠卷列表
                </i>
            </a>
            <a 
              to="/admin/orders"
              className="list-group-item list-group-item-action py-3">
                <i className="bi bi-ticket-perforated-fill me-2">
                  訂單列表
                </i>
            </a>
          </ul>  
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </>
  )
}

export default Dashboard;