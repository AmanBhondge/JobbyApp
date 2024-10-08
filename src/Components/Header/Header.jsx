import React from 'react'
import "./Header.css"
import { Link, useNavigate } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import Cookies from 'js-cookie';

const Header = () => {

    const navigate = useNavigate();

    const LogoutEvent =()=>{
        Cookies.remove("jwtToken");
        navigate("/login");

    }
    return (

        <div>
            <nav className='my-nav-small'>
                <div>
                    <Link to="/">
                        <img className='logo' src="https://assets.ccbp.in/frontend/react-js/logo-img.png" />
                    </Link>
                </div>
                <div>
                    <ul className='nav-links-small'>
                        <li>
                            <Link to="/"><FaHome /></Link>
                        </li>
                        <li>
                            <Link to="/jobs"><MdFindInPage /></Link>
                        </li>
                        <li>
                            <Link to=""><IoLogOut /></Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className='my-nav-large'>
                <Link to="/">
                    <img src="https://assets.ccbp.in/frontend/react-js/logo-img.png" />
                </Link>
                <ul className='nav-links'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/jobs">Jobs</Link></li>
                </ul>
                <button className='btn btn-primary' onClick={LogoutEvent}>Logout</button>
            </nav>
        </div>
    )
}

export default Header;