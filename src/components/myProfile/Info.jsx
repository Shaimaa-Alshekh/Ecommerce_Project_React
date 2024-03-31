import React, { useContext, useEffect, useState } from 'react'
import Profile from './Profile'
import { Slide, toast } from 'react-toastify';
import axios from 'axios';
import { UserContext } from '../../context/User';
import Loader from '../loader/Loader';

function Info() {
    const { userToken } = useContext(UserContext);
    const [loader, setLoader] = useState(true);
    const [profile,setProfile]=useState({});
    const [error, setError] = useState("");

    const getProfileData=async()=>{
       try{
         const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/user/profile` ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

        setProfile(data.user);

      }catch(error){
        console.log(error.response);
        setError(error.response);
            toast.error(error.response.data.message, {
              position: "bottom-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "dark",
              transition: Slide,
              });
        
      }finally{
        setLoader(false);
      }
    }
    useEffect( ()=>{getProfileData();},[]);
    if (loader) {
        return <Loader />;
      }
    return (
        <>
       
       
       {error ?? <p>{error}</p>}

       <div className="container">
  <section className="mx-auto my-5" style={{maxWidth: '23rem'}}>
    <div className="card testimonial-card mt-2 mb-3">
      <div className="card-up aqua-gradient" />
      <div className="avatar mx-auto white w-100 border-rounded">
        <img src={profile.image.secure_url} className=" img-fluid w-100" alt="woman avatar" />
      </div>
      <div className="card-body text-center">
        <h4 className="card-title font-weight-bold">{profile.userName}</h4>
        <hr />
        <p><i className="fas fa-quote-left" /> {profile.role}</p>
        <p><i className="fas fa-quote-left" /> {profile._id}</p>

      </div>
    </div>
  </section>
</div>




</>

        
  )
}

export default Info