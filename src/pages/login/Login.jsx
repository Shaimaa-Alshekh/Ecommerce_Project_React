import axios from "axios";
import React, { useContext, useState } from "react";
import { object, string, } from 'yup';
import {  Bounce, Slide, toast } from 'react-toastify';
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";

function Login() {
  const navigate=useNavigate();
  const {setUserToken}=useContext(UserContext);
  let [user,setUser] = useState({
    email: '',
    password: '',
  });
  const [error,setError]=useState([]);
  const [loader,setLoader]=useState(false);
  
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };


  const validateData=async()=>{
    let LoginSchema = object({
      email: string().email().required(),
      password: string().min(8).max(20),

    });
    try{
      await LoginSchema.validate(user ,{abortEarly:false});
      return true;

    }catch(error){
      console.log("error validate",error.errors);
      for(let i=0;i<error.errors.length;i++){
          toast.error(error.errors[i], {
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

      setError(error.errors);
      setLoader(false)
      return false;
    }
    
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoader(true);
    const validate=await validateData();
    console.log(validate);
  
    if(validate){
      try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,user);
        console.log(data);
        setUser({email: '',password: '',});

        if(data.message == 'success'){
          toast.success('Login Successfuly!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
            
            });
            localStorage.setItem('userToken',data.token);
            setUserToken(data.token);
            navigate('/');
         }

      }catch(error){
        console.log(error.response);
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
     

    }else{
      console.log("error requesr",error);
      
    }

   
  };
  
  

  return (
    <>
       
{/*
      <div className="container mt-5 p-3 fs-4 w-25 border border-danger rounded">


        <form onSubmit={handleSubmit}>
          <div className="form-group p-3">
            <input
              type="email"
              value={user.email}
              className="form-control"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              onChange={handleInputChange}
            />
          </div>
         
          <div className="form-group p-3">
            <input
              type="password"
              value={user.password}
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              autoComplete="on"
            />
          </div>
         

          <button type="submit" className="btn btn-danger  p-3 w-75" disabled={loader?'disabled':null}>
            {!loader?'Login' :'wait...'}
          </button>

        </form>
      </div> 
  */}
      <div className='container pt-5 w-75'>
    <div className="card text-center m-auto w-50" style={{width: 300}}>
  <div className="card-header h5 text-white bg-main">Login</div>
  <div className="card-body px-5">
    <p className="card-text py-2">
      Enter your email address and your password to log in.
    </p>
    <form onSubmit={handleSubmit}>
    <div className="form-outline">
      <input type="email" name='email' value={user.email} onChange={handleInputChange} className="form-control my-3" placeholder='Enter email'/>
      <input type="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="on" className="form-control my-3" placeholder='Enter password'/>
    </div>
    <button type='submit' className="btn bg-main w-100 border-danger" disabled={loader?'disabled':null}>{!loader?'Login' :'wait...'}</button>
    <NavLink to='/sendcode' className='btn mt-2'>Forget Password ?</NavLink>
    </form>
  
    
  </div>
</div>

    </div>
    </>
  );
}

export default Login;
