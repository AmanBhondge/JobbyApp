import { useEffect } from "react";
import React from 'react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = props => {
    const {Component}=props;
    const token = Cookies.get("jwtToken");
    const navigate = useNavigate();
    useEffect(()=>{
        if(token===undefined){
            navigate("/login")
        }
    },[]);

  return  <Component/>
  
}



export default ProtectedRoute;