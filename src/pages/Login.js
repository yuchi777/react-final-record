import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    
    const { name, value } = e.target;
    // console.log(name, value);

    setData({
      ...data, [name]:value
    })
    // console.log(data);
  }

  const submit = async(e) => {

    const res= await axios.post(`/v2/admin/signin`, data);
    // console.log(res);

    //axios在headers加入token驗證資訊
    const { token, expired } = res.data;
    console.log(res.data);

    // 儲存Token
    // document.cookie = "doDomethingOnlyOnce=true; expires=Fri, 31 DEc 9999 23:59:59 GMT; SameSite=None; Secure";
    // document.cookie = `doDomethingOnlyOnce=true; expires=Fri, 31 DEc 9999 23:59:59 GMT`;
    document.cookie = `yuchiToken=${token}; expires=${new Date(expired)}`;

    if(res.data.success){
      navigate('/admin/products');
    }
    
    
  }
  

  

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>登入帳號</h2>
          <div className="alert alert-danger" role="alert">
            錯誤訊息
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="form-label w-100">
              Email
              <input type="email" id="email" className="form-control" name="username" placeholder="Email Address" onChange={handleChange}/>
            </label>
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="form-label w-100">
              Password
              <input type="password" id="password" className="form-control" name="password" placeholder="name@example.com" onChange={handleChange}/>
            </label>
          </div>
          <button className="btn btn-primary" type="button" onClick={submit}>登入</button>
        </div>

      </div>

    </div>
  )
}

export default Login;