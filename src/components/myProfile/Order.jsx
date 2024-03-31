import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Slide, toast } from 'react-toastify';
import Loader from '../loader/Loader';
import { UserContext } from '../../context/User';

function Order() {
const { userToken } = useContext(UserContext);
const [order,setOrder]=useState([]);
const [loader, setLoader] = useState(true);

  const getOrder =async()=>{
    setLoader(true);
  
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/order` ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data.orders);
        setOrder(data.orders);
        

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
     

   

  }
  const removeOrder=async(id)=>{
    console.log("removed",id);
    setLoader(true);
  
      try{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/order/cancel/${id}`,null,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

       if(data.message == 'success'){
          toast.success('Cancel Successfuly!', {
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
            getOrder();
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
     

  }
  useEffect(() => {
    getOrder();
  }, []);

  if (loader) {
    return <Loader />;
  }   
  return (
    <>
 
 <section className="container">
  <div className=" p-2 w-100">
    <div className="row d-flex justify-content-center align-items-center w-100">
      <div className="col-md-12 col-lg-12 col-xl-12 ">
       { order.map( orderitem=>(
         <div className="card w-100 mb-4 border border-dark" style={{borderRadius: 16}} key={orderitem._id}>
         <div className="card-header p-2">
           <div className="row d-flex justify-content-between align-items-center ">
             <div className='col-lg-11'>
               <p className="fw-bold mb-2 fs-5"> Order Number: <span className='text-danger'>{order.indexOf(orderitem)}</span></p>
             </div>
             <div className=" col-lg-1">
              
                <button  className="btn btn-danger" onClick={()=>removeOrder(orderitem._id) }>
                 
                    cancel
                    </button>
              </div>
             <div>
             </div>
           </div>
         </div>
         <div className="card-body p-4">
           <div className="d-flex flex-row mb-4 pb-2">
             <div className="flex-fill">
               <h3 className="bold text-center">Order Detailes </h3>
               <p className="text-dark fw-bold">Order ID : <span className="text-danger">{orderitem._id}</span></p>
               <p className="text-dark fw-bold"> Qt: <span className='text-danger'>{orderitem.products.length}</span> item</p>
               <p className="text-dark fw-bold">Price : <span className="text-danger "> $ {orderitem.finalPrice} </span><span className=" text-danger"> {orderitem.paymentType} </span></p>
               <p className="text-dark fw-bold">Tracking Status : <span className="text-danger">{orderitem.status}</span></p>
               <p className="text-dark fw-bold">Address : <span className="text-danger">{orderitem.address}</span></p>
               <p className="text-dark fw-bold">Phone Number : <span className="text-danger">{orderitem.phoneNumber}</span></p>

             </div>
             
           </div>
         </div>
         <div className="card-footer p-4">
         <h3 className="bold text-center p-3">Products In Order </h3>
         <div className="text-center container py-5">
          <div className="row">
          
                    {orderitem.products.map(pro=>(
      <div className="col-lg-3 col-md-6 col-sm-12 mb-4"key={pro.productId._id}>

        <div className="card"  >
          <div className="h-50" >
            <img src={pro.productId.mainImage.secure_url} className=" orderImage" />
          </div>
          <div className="card-body">
              <h5 className="card-title mb-3 single">{pro.productId.name}</h5>
            
              <p>Quantity: {pro.quantity}</p>
            
            <h6 className="mb-3">${pro.productId.finalPrice}</h6>
          </div>
        </div>
      </div>

              

            ))}
           
           </div>
         </div>
       </div>
</div>
       ))}
       
      </div>
    </div>
 </div>
</section>

 
 
 
 </>
  )
}

export default Order