import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader/Loader";
import { NavLink, Navigate, useParams } from "react-router-dom";
import mystyle from "./category.module.css";
import { Slide, toast } from "react-toastify";
import { UserContext } from "../../context/User";

function Category() {
  const { userToken } = useContext(UserContext);
  const { id } = useParams();
  console.log(id);
  const [productofcategory, setproductofcategory] = useState([]);
  const [getspeccategory,setGetSpecCategory]=useState('');
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const addToCart =async(product_id)=>{
    setLoader(true);
  
      try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart` ,{productId:product_id} ,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);

        if(data.message == 'success'){
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
  
  const Get_Spec_Category = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/${id}`
      );

      console.log(data.category);
      setGetSpecCategory(data.category);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    Get_Spec_Category();
  }, []);
  const Product_Of_Category = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/category/${id}`
      );

      console.log(data.products);
      setproductofcategory(data.products);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    Product_Of_Category();
  }, []);

  if (loader) {
    return <Loader />;
  }

  return (
    <>
     
      {error ?? <p>{error}</p>}
      <section style={{ backgroundColor: "#eee" }}>
      <h2>{getspeccategory.name}</h2>
  
    <div className="container py-5">
          {(productofcategory.length>0) ?productofcategory.map((pro) => (
            <div className="row justify-content-center mb-3" key={pro._id}>
              <div className="col-md-12 col-xl-10">
                <div className="card shadow-0 border rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                        <div className="">
                          <img className={mystyle.imgprop} src={pro.mainImage.secure_url} />
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6 col-xl-6">
                        <h5>{pro.name}</h5>
                        <div className="d-flex flex-row">
                          <div className="text-danger mb-1 me-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="#ffc107"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="#ffc107"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="#ffc107"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={16}
                              height={16}
                              fill="#ffc107"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                          </div>
                          <span>{pro.status}</span>
                        </div>

                        <div className=" mb-4 mb-md-0">
                          <p className={mystyle.single}>{pro.description}</p>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                        <div className="d-flex flex-row align-items-center mb-1">
                          <h4 className="mb-1 me-1">${pro.finalPrice}</h4>
                          <span className="text-danger">
                            <s>${pro.price}</s>
                          </span>
                        </div>
                        <h6 className="text-success">Free shipping</h6>
                        <div className="d-flex flex-column mt-4">
                          <button className="btn btn-danger btn-sm" type="button" >
                            <NavLink  to={`/productdetailes/${pro._id}`} className="btn btn-danger w-100"> Detailes</NavLink>
                          </button>
                          <button className="btn btn-outline-primary btn-sm mt-2" onClick={()=>addToCart(pro._id)} type="button">Add to Cart </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )):<p>no product</p>}
        </div>
  
 
        
      </section>
    </>
  );
}

export default Category;
