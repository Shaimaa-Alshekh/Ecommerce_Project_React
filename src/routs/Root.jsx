import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './../components/navbar/Navbar';
import Hero from './../components/hero/Hero';
import Footer from './../components/footer/Footer';
import { UserContext } from '../context/User';
import Footerfinal from '../components/footer/Footerfinal';

function Root() {
  const { userName,userToken } = useContext(UserContext);
  
  return (
    <>
    {userToken 
    ? <>
    <Navbar />
    <Hero />
    <Outlet />
    <Footer/></>  
    :  <>
    <Navbar />
    <Outlet />
    <Footerfinal />
    </>}
    
    </>

)
}

export default Root