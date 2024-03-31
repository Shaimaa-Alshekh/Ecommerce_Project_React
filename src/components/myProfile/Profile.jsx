import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User';
import { Slide, toast } from 'react-toastify';
import { NavLink, Outlet } from 'react-router-dom';

function Profile() {

  return (
    < div className='  '>
   
    <ul className="nav nav-tabs">
  <li className="nav-item">
  <NavLink className="nav-link" to="/profile">Info</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/profile/contact">contact</NavLink>
  </li>
  <li className="nav-item">
    <NavLink className="nav-link" to="/profile/order">order</NavLink>
  </li>
  
    </ul>
    
    
   <Outlet />

    
    </div>
  )
}

export default Profile