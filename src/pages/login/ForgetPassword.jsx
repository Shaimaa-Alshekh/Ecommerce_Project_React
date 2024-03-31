import axios from 'axios';
import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Bounce, Slide, toast } from 'react-toastify';
import { object, string } from 'yup';
import { UserContext } from '../../context/User';

function ForgetPassword() {
    const navigate=useNavigate();
    const {setUserToken}=useContext(UserContext);

    let [user,setUser] = useState({
        email: '',
        password: '',
        code:'',
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
          code:string().required(),
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
            const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,user);
            console.log(data);
            setUser({email: '',password: '',code:''});
    
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
                
                navigate('/');
             }
    
          }catch(error){
            console.log(error);
            if(error.message=='Request failed with status code 400'){
                toast.error('invalid data', {
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
                }
            
          }finally{
            setLoader(false);
          }
         
    
        }else{
          console.log("error requesr",error);
          
        }
    
       
      };
  return (
    <>
    <div className='container pt-5 w-75'>
    <div className="card text-center m-auto w-50" style={{width: 300}}>
  <div className="card-header h5 text-white bg-main">Password Reset</div>
  <div className="card-body px-5">
    <p className="card-text py-2">
      Enter your email address and we will send you an email code to reset your password.
    </p>
    <form onSubmit={handleSubmit}>
    <div className="form-outline">
      <input type="email" name='email' value={user.email} onChange={handleInputChange} className="form-control my-3" placeholder='Enter email'/>
      <input type="password" name="password" value={user.password} onChange={handleInputChange} autoComplete="on" className="form-control my-3" placeholder='Enter password'/>
      <input type="text" name='code' value={user.code} onChange={handleInputChange} className="form-control my-3" placeholder='Enter code'/>

    </div>
    <button type='submit' className="btn bg-main w-100 border-danger" disabled={loader?'disabled':null}>{!loader?'Submit' :'wait...'}</button>

    </form>
  
    
  </div>
</div>

    </div>
    </>
  )
}

export default ForgetPassword