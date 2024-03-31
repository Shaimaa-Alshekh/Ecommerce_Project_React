import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "./logo.png";
import { UserContext } from "../../context/User";
import axios from "axios";
function Navbar() {
  const navigate=useNavigate();
  const { userName,setUserName,setUserToken,userToken } = useContext(UserContext);
  const logout =()=>{
    localStorage.removeItem('userToken');
    setUserName(null);
    setUserToken(null);
    navigate('/login');

  };
  const [count,setCount]=useState(0);
  const getCart =async()=>{
    try{
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart` ,{headers:{Authorization:`Tariq__${userToken}`}});
      setCount(data.count);
    }catch(error){
      console.log(error.response);
  }}
  useEffect(() => {
    getCart();
  }, []);
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body-tertiary ">
      <div className="container">
        <NavLink className="navbar-brand" to="#">
          <img
            src={logo}
            alt="Bootstrap"
            width={250}
            className="d-inline-block align-text-top "
          />
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        
            {userToken 
            ? 
            <>
             <div className="collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0"id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item  d-flex align-item-center"> <NavLink className="nav-link" to="/">HOME</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"> <NavLink className="nav-link" to="/products"> Products</NavLink></li>
            
            </ul></div>
       
            
             <div className="collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0"id="navbarSupportedContent">
               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
               <li className="nav-item"><NavLink className="nav-link" to="/cart">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 576 512"><path fill="#0d0d0d" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/></svg>
                    <sup className="badge rounded-pill badge-notification bg-danger">{count}</sup>

                    </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {userName}
                </NavLink>
                <ul className="dropdown-menu">
                <li><NavLink className="dropdown-item" to="/profile">My profile</NavLink></li>
                 <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                 </ul>
              </li>


            </ul></div>
            </>  
            : 
           
         <>
         <div className="collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0"id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item  d-flex align-item-center"> <NavLink className="nav-link" to="/">HOME</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contact"> Contact </NavLink></li>
       
            </ul></div>
            <div className="collapse navbar-collapse navbar-nav me-auto mb-2 mb-lg-0"  id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item"><NavLink className="nav-link  " to="/login"><button type="button" className="btn btn-outline-danger"> Log In</button> </NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/register"><button type="button" className="btn btn-outline-danger"> Register</button> </NavLink> </li>
          </ul>
          </div>
            </>
            
            }
           
          
        
      </div>
    </nav>
  );
}

export default Navbar;

