import { Outlet, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useReducer } from "react";
import Message from "../../components/Message";
import { MessageContext, messageReducer, initState  } from "../../store/messageStore";

function Dashboard() {

  const navigate = useNavigate();
  const reducer = useReducer(
    //callback function, state
    messageReducer,
    initState
  );

  //清除cookie
  const logout = () => {
    document.cookie = 'yuchiToken=;';
    navigate('/login');
  }

  // 取出Token
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('yuchiToken='))
      ?.split('=')[1];
    // console.log(token, 'token is here');
    axios.defaults.headers.common['Authorization'] = token;
  
  // useEffect第二個參數為依賴陣列（dependencies）決定何時重跑：
  // 不傳：每次 render 後都跑。
  // [] 空陣列：只在 mount 時跑一次（和 unmount 做清理）。
  // [a, b]：當 a 或 b 改變時重跑。
    useEffect(() => {
      //如果沒有token，導回登入頁
      if(!token){
        // navigate('/login');
        return navigate('/login'); //加return避免後續程式繼續執行
      }

      //如果有token驗證Token是否有效
      (async()=>{
        try {
          await axios.post(`/v2/api/user/check`);
        } catch (error) {
          // console.log(error);
          if(!error.response.data.success){
            navigate('/login');
          }
        }
      })();
      
    }, [navigate, token]);

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
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
          <div id="navbarNav" className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <button 
                type='button' 
                className="btn btn-sm btn-light"
                onClick={logout}
                >
                  登出
                </button>
              </li>
            </ul>
          </div>
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
            <Link
              to="/admin/products"
              className="list-group-item list-group-item-action py-3"
            >
              <i className="bi bi-cup-fill me-2">
                產品列表
              </i>
            </Link>
            <Link
              to="/admin/coupons"
              className="list-group-item list-group-item-action py-3">
              <i className="bi bi-ticket-perforated-fill me-2">
                優惠卷列表
              </i>
            </Link>
            <Link
              to="/admin/orders"
              className="list-group-item list-group-item-action py-3">
              <i className="bi bi-ticket-perforated-fill me-2">
                訂單列表
              </i>
            </Link>
          </ul>
        </div>
        <div className="w-100">
          { token && <Outlet />}
        </div>
      </div>
    </MessageContext.Provider>
  )
}

export default Dashboard;