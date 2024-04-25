import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/User";
import { Bounce, Slide, toast } from "react-toastify";
import { number, object, string } from "yup";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CountCart";
import Loader from "../../components/loader/Loader";

function Cart() {

  const { userToken } = useContext(UserContext);
  const [cart,setCart]=useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [count,setCount]=useState(0);
  const {setCountCart}=useContext(CartContext);

  const navigate=useNavigate();


  /*START THE CART*/ 
  const getCart =async()=>{
    setLoader(true);
  
      try{
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart` ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);
        setCount(data.count);
        localStorage.setItem('countCart',data.count);
        setCountCart(data.count);

        console.log(data.products);
        setCart(data.products);

       /* if(data.message == 'success'){
          toast.success('Add Successfuly!', {
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
          }*/

      }catch(error){
        console.log(error.response);
           /* toast.error(error.response.data.message, {
              position: "bottom-center",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: 0,
              theme: "dark",
              transition: Slide,
              });*/
        
      }finally{
        setLoader(false);
      }
     

   

  }
  useEffect(() => {
    getCart();
  }, []);

const removeItem=async(id)=>{
    console.log("removed",id);
    setLoader(true);
  
      try{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem` ,{productId:id},{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

       if(data.message == 'success'){
          toast.success('Removed Successfuly!', {
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
            getCart();
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
  const clearItem=async()=>{
    console.log("clear cart");
    setLoader(true);
  if(count > 0){
    try{
      const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear` ,null,{headers:{Authorization:`Tariq__${userToken}`}});
      console.log(data);

     if(data.message == 'success'){
        toast.success('Clear Cart Successfuly!', {
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
          getCart();
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
    toast.warn('Cart is alerady Empty !', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Slide,
      });

  }
     
     

  }
  
  const increaseItem=async(id)=>{
    console.log("incresed",id);
    setLoader(true);
  
      try{
        const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity` ,{productId:id},{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

       if(data.message == 'success'){
          toast.success('Increased Successfuly!', {
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
            getCart();
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
  const decreaseItem=async(id,quantity)=>{
    console.log(quantity);
    
   
    if(quantity > 0){
      console.log("decreased");
      setLoader(true);
    
        try{
          const {data}=await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity` ,{productId:id},{headers:{Authorization:`Tariq__${userToken}`}});
          console.log(data);
  
         if(data.message == 'success'){
            toast.success('Decreased Successfuly!', {
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
              getCart();
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
      removeItem(id);
    }
   
  }
  const handleClick=()=>{
    if(count > 0){
      navigate('/createorder');
    }else{
      toast.warn('Cart is Empty please go to shopping!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide,
        });
      

    }
  }
  /*END THE CART */
  
  return (
    <>

<section className="h-100" style={{backgroundColor: '#eee'}}>
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">
        <div className="d-flex justify-content-between align-items-center mb-4 ">
          <h3 className=" mb-0 text-danger   ">Shopping Cart <span>({count})</span></h3>
          <button onClick={()=>clearItem() } className="btn btn-outline-danger d-flex align-self-end">Clear Cart</button>
        </div>
        <div className="card rounded-3 mb-4">
          
          <div className="card-body p-4">

            {(cart.length>0) ?cart.map((cartItem) => (
              <div className="row d-flex justify-content-between align-items-center py-2 gap-0 w-100" key={cartItem.productId}>
              <div className="col-lg-2  py-2  ">
                <img src={cartItem.details.mainImage.secure_url} className="img-fluid rounded-3" alt="Cotton T-shirt" />
              </div>
              <div className="col-lg-3  ">
                <p className="lead fw-normal mb-2">{cartItem.details.name}</p>
              </div>
              <div className="col-lg-2  d-flex ">
                <button className="btn btn-link " onClick={()=>decreaseItem(cartItem.productId ,cartItem.quantity)}  >
                {!loader?
                   <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="#121212" d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>              

                    :        
                         <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#f7444e" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>                           }
                </button>
                  
                   <span className="border p-3 btn btn-outline-danger fs-4 ">{(cartItem.quantity > 0)? cartItem.quantity : 0 }</span>

                <button className="btn btn-link " onClick={()=>increaseItem(cartItem.productId)}>
                {!loader?
                       <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="#0f0f0f" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>               
                :
                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><path fill="#f7444e" d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"/></svg>                          
                 }

                       </button>
              </div>
              <div className="col-lg-3">
                <h5 className="p-0">price=$<span className="text-black">{cartItem.details.finalPrice} </span> </h5>
                <h5 className="p-0">final_price=<span className="text-danger">${ cartItem.details.finalPrice * cartItem.quantity } </span></h5>

              </div>
              
              <div className="col-lg-1  ">
                <button onClick={()=>removeItem(cartItem.productId) } className="border border-non"><svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 448 512"><path fill="#f7444e" d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg></button>
              </div>
              <hr className="py-2"/>
            </div>

            )):<p>Empty Cart</p>}
            
          </div>
        </div>
        
      
        <div className="card">
          <div className="card-body">
            <button type="button" className="btn btn-warning btn-block btn-lg w-100" onClick={()=>{handleClick()}}>Proceed to Pay</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

  
    </>
  );
}

export default Cart;
