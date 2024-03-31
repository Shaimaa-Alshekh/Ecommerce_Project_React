import React, { useContext, useEffect, useState } from 'react'
import { Slide, toast } from 'react-toastify';
import { UserContext } from '../../context/User';
import axios from 'axios';
import Loader from '../loader/Loader';

function contact() {
    const { userToken } = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    const [profile,setProfile]=useState({});
    const getProfileData=async()=>{
       try{
         const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile` ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

        setProfile(data.user);
        setLoader(false);
      }catch(error){
        console.log(error.response);
        
     
    }}
    useEffect( ()=>{getProfileData();},[]);
    if (loader) {
      return <Loader />;
    }
  return (
    <>
    <div className="card-body p-3 container">
  <div className="row">
    <div className="col-sm-3">
      <p className="mb-0">Full Name</p>
    </div>
    <div className="col-sm-9">
      <p className="text-muted mb-0">{profile.userName}</p>
    </div>
  </div>
  <hr />
  <div className="row">
    <div className="col-sm-3">
      <p className="mb-0">Email</p>
    </div>
    <div className="col-sm-9">
      <p className="text-muted mb-0">{profile.email}</p>
    </div>
  </div>
  <hr />
</div>

        
    </>
  )
}

export default contact