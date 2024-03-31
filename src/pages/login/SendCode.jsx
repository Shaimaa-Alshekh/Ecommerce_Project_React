import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bounce, toast } from 'react-toastify';
import { object, string } from 'yup';

function SendCode() {
  const navigate=useNavigate();
  let [email,setEmail] = useState('');
  const [error,setError]=useState([]);
  const [loader,setLoader]=useState(false);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

    
  
  const sendCode = async(e) => {
    e.preventDefault();
    setLoader(true);

    if(email !=null){
      try{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{ email});
        console.log(data);
        setEmail({email: ''});
        
        navigate('/forgetpassword')
       

      }catch(error){
        console.log(error.response);
           setError(error.response); 
        
      }finally{
        setLoader(false);
      }

    }else{
      toast.error("email is required", {
        position: "bottom-right",
        autoClose: 30000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
  
      
     

   

   
  };


  return (
    <div className='container pt-5 w-75'>
    <div className="card text-center m-auto w-50" style={{width: 300}}>
  <div className="card-header h5 text-white bg-main">Password Reset</div>
  <div className="card-body px-5">
    <p className="card-text py-2">
      Enter your email address and we will send you an email code to reset your password.
    </p>
    <form onSubmit={sendCode}>
    <div className="form-outline">
      <input type="email" name='email' value={email} onChange={handleInputChange} className="form-control my-3" placeholder='Enter email'/>
    </div>
    <button type='submit' className="btn bg-main border border-danger w-100" disabled={loader?'disabled':null}>{!loader?'Send Code' :'wait...'}</button>

    </form>
  
    <div className="d-flex justify-content-between mt-4">
      <NavLink className="btn" to="/login">Login</NavLink>
      <NavLink className="btn " to="/register">Register</NavLink>
    </div>
  </div>
</div>

    </div>
  )
}

export default SendCode