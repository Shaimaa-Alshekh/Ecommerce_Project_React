import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/User';
import Loader from '../../components/loader/Loader';
import axios from 'axios';
import { Bounce, Slide, toast } from 'react-toastify';
import { object, string } from 'yup';
import { useNavigate } from 'react-router-dom';

function CreatOrder() {
    const { userToken } = useContext(UserContext);
    const navigate=useNavigate();
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState("");
    const [cart,setCart]=useState([]);
    const [coupon,setCoupon]=useState([]);  
  const [order,setOrder]=useState({
    couponName: '',
    address: '',
    phone:'',
  }); 
  const getCart =async()=>{
    setLoader(true);
  
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart` ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);
        console.log(data.products);
        setCart(data.products);

      }catch(error){
        console.log(error.response);
        
      }finally{
        setLoader(false);
      }
     

   

  }
  useEffect(() => {
    getCart();
  }, []);

if(loader){
  <Loader />
}
    /*START THE COUPON*/
  const getCoupon =async()=>{
    setLoader(true);
  
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/coupon`);
        console.log('Coupon: ',data.coupons);
        setCoupon(data.coupons);
       setLoader(false);

      }catch(error){
        console.log(error.response);
        
      }finally{
        setLoader(false);
      }
     

   

  }
  useEffect(() => {
    getCoupon();
  }, []);
  /*END THE COUPON */
  /*START ORDER */
  const handleInputChange = (e) => {
    const {name,value} = e.target;
    setOrder({
      ...order,
      [name]: value,
    });
  };
 
  const validateData=async()=>{
    let LoginSchema = object({
      couponName:string(),
      address: string().max(20).required(),
      phone:string().required().min(10),
    });
    try{
      await LoginSchema.validate(order ,{abortEarly:false});
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
  const handleSubmitOrder=async(e)=>{
    e.preventDefault();
    setLoader(true);
    const validate=await validateData();
    console.log(validate);
  
    if(validate){
      try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/order`,order ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);


        if(data.message == 'success'){
          toast.success('Order Successfuly!', {
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
            navigate('/profile/order');

            
         }

      }catch(error){
        console.log(error);
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
  }


  /*END ORDER */
  return (
    <>
    <section className="h-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-between  h-100">
    <h3 className=" text-center text-danger fs-1 ">Order </h3>
    <div className="card mb-4 p-3 bg-light col-lg-12 col-md-12 d-flex flex-row flex-wrap gap-2">
      {cart.map(item=>(
        <div className="col-2  bg-primary rounded-circle"key={item.productId} style={{width:'100px',height:'100px'}}>
                <img src={item.details.mainImage.secure_url} className="img-fluid rounded-circle w-100 h-100 border border-danger" alt="Cotton T-shirt" />
              </div>
      ))}

</div>
<div className="card mb-4 bg-light col-lg-12 col-md-12 p-2">
  <div className="card-body p-2 d-flex flex-row w-100">
    <form className="form-outline flex-fill  w-100" onSubmit={handleSubmitOrder}>
      <div className="form-group w-100 ">
       {/* <select className="form-control w-50 " id="exampleFormControlSelect1" name='couponName'  onChange={handleSelectChange}>
        {coupon.map(coupon=>(
            <option key={coupon._id} value={coupon.name}>{coupon.name}</option>

        ))}
        </select>*/}

      </div>

       <div className="form-group py-4">
       <input type="text" name='couponName' value={order.couponName} onChange={handleInputChange} className="form-control w-75"  placeholder="couponName" />
          <input type="text" name='address' value={order.address} onChange={handleInputChange} className="form-control mt-2 w-75"  placeholder="Addrees" />
          <input type="text" name='phone' value={order.phone} onChange={handleInputChange} className="form-control mt-2 w-75"  placeholder="Phone" /> 
       </div>
       <button type="submit" className="btn btn-outline-warning btn-lg  w-75">Submit Order</button>

    </form>
  </div>
</div>

    </div>
    </div>
    </section>
    </>
  )
}

export default CreatOrder