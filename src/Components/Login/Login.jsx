import React, { useEffect, useState } from 'react';
import './Login.css';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

  const [allValues, setAllValues] = useState({
    username: "",
    password: "",
    errorMsg: ""
  });
  
  const token = Cookies.get("jwtToken");
  const nagivate = useNavigate();
  
  const onSubmitUserDetails = async (e) => {

    e.preventDefault();

    const api = "https://apis.ccbp.in/login";

    const userDetails = {
      username: allValues.username,
      password: allValues.password
    }

    const options = {

      method: "POST",
      body: JSON.stringify(userDetails)

    }

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      nagivate("/");
      Cookies.set("jwtToken",data.jwt_token);

      if (response.ok === true) {
        setAllValues({ ...allValues, errorMsg: "" })

      }
      else {
        setAllValues({ ...allValues, errorMsg: data.error_msg })

      }

    } catch (error) {
      console.log(error);
    }
  }

  const setUserName = (e) => {
    setAllValues({ ...allValues, username: e.target.value });

  }
  const setPassword = (e) => {
    setAllValues({ ...allValues, password: e.target.value });

  }

  useEffect (()=>{
    if(token !== undefined){
      nagivate("/");

    }
  },[]);

  return (
    <div className='main-cont'>
      <form className='cont' onSubmit={onSubmitUserDetails}>
        <div className="form-group">
          <div className='logo mt-2'>
            <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png  " />
          </div>
          <label htmlFor="exampleInputEmail1">USERNAME</label>
          <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={setUserName} placeholder='rahul' />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">PASSWORD</label>
          <input type="password" onChange={setPassword} className="form-control" id="exampleInputPassword1" placeholder='rahul@2021' />
        </div>
        <button type="submit" className="btn btn-primary form-control mb-4 ">SignIn</button>
        <p className="text-danger">{allValues.errorMsg}</p>
      </form>
    </div>
  );
};

export default Login;