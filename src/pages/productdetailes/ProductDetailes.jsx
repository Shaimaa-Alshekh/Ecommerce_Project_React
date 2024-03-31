import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Loader from "./../../components/loader/Loader";
import { useParams } from "react-router-dom";
import { UserContext } from "../../context/User";
import { Slide, toast } from "react-toastify";
import { FaStar } from "react-icons/fa";
function ProductDetailes() {
  const { userToken } = useContext(UserContext);
 const [rat,setRating]=useState(null);
 const [hover ,setHover]=useState(null);
  const { id } = useParams();
  console.log(id);
  let [average, setAverage] = useState("");
  const [productdetailes, setProductDetailes] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [review,setReview]=useState({
    comment:'',
    rating:rat,
  });
  const addToCart =async()=>{
    setLoader(true);
  
      try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart` ,{productId:id} ,{headers:{Authorization:`Tariq__${userToken}`}});
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
  const getProductDetailes = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${id}/`
      );

      setAverage(data.avgRating);
      console.log(data);
      setProductDetailes(data.product);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };
 const creatReview=async () =>{
        try{
        const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/products/${id}/review`,review,{headers:{Authorization:`Tariq__${userToken}`}});
        console.log(data);
        if(data.message == 'success'){
          toast.success('Review Add Successfuly!', {
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
            getProductDetailes();
            setLoader(false);

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
     

   }
 const handleChange =(e)=>{
  const {name,value} = e.target;
  setReview({
    ...review,
    [name]: value,
  });
  
 }
 
  useEffect(() => {
    getProductDetailes();
  }, []);

  if (loader) {
    return <Loader />;
  }
  

  return (
    <>
      <div style={{ backgroundColor: "#f7f6f6" }}>
        {/* details of product */}
        <section className="py-5"style={{ backgroundColor: "#f7f6f6" }}>
          <div className="container">
            <div className="row gx-5">
              <div className="col-lg-6">
                <div className="border rounded-4 mb-3 d-flex justify-content-center  h-75 w-100">
                  <a  className="w-100 h-100 rounded-4">
                    <img
                      className="rounded-4 border border-danger fit  h-100 w-100"
                      src={productdetailes.mainImage.secure_url}
                    />
                  </a>
                </div>
                <div className="d-flex justify-content-center mb-3">
                  {productdetailes.subImages.map((ele) => (
                    <a  key={ele.public_id} className="border mx-1 rounded-2 border border-danger" >
                      <img
                        width={100}
                        height={100}
                        className="rounded-2 border border-danger "
                        src={ele.secure_url}
                      />
                    </a>
                  ))}
                </div>
              </div>
              <main className="col-lg-6">
                <div className="ps-lg-3">
                  <h4 className="title text-dark">{productdetailes.name}</h4>
                  <div className="d-flex flex-row my-3">
                    <div className="text-dark mb-1 me-2">
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
                  </div>
                  <div className="mb-3">
                    <span className="h5 text-danger">${productdetailes.finalPrice}</span>
                    <span className=""> /per one</span>
                  </div>
                  <p >{productdetailes.description}</p>
                  <div className="row">
                    
                    <dt className="col-3">Stock:</dt>
                        <dd className="col-9">{productdetailes.stock}</dd>
                    <dt className="col-3"> Rating:</dt>
                        <dd className="col-9">{average}</dd>
                    <dt className="col-3">Price:</dt>
                        <dd className="col-9">${productdetailes.price}</dd>
                    <dt className="col-3">Discount:</dt>
                        <dd className="col-9">${productdetailes.discount}</dd>
                    <dt className="col-3">FinalPrice:</dt>
                        <dd className="col-9 text-danger">${productdetailes.finalPrice}</dd>
                    <dt className="col-3">Sellers:</dt>
                        <dd className="col-9">{productdetailes.number_sellers}</dd>
                  </div>
                  <hr />
                  
                  
                  <button onClick={()=>addToCart()} className="btn btn-outline-danger shadow-0  btn-lg m-2">Add to Cart</button>

<button type="button" className="btn btn-outline-danger shadow-0  btn-lg m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" data-backdrop="false">Add Review</button>

<div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" data-backdrop="false" aria-hidden="true" >
 
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">New Comment</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">
        <form>
          <div className="mb-3">
            <label htmlFor="recipient-name" className="col-form-label">Comment:</label>
            <input type="text"className="form-control" id="recipient-name"  name='comment' value={review.comment} onChange={handleChange}  />

          </div>
          <div className="mb-3">
            <label htmlFor="message-text" className="col-form-label">Rating :</label><br />
            {[...Array(5)].map((star ,index)=>{
              const currentRating=index+1;
              return(
                <label key={index}>
                  <input 
                     type="radio" 
                     className="starRadio"
                     name="rating"
                     value={currentRating}
                     onClick={()=>{setRating(currentRating);
                      review.rating=currentRating;
                      console.log('rating is'+ review.rating);
                      setLoader(false);
                     

                    }}
                  />
                     <FaStar 
                        className="star" 
                        size={30} 
                        color={currentRating <= (hover || rat) ? '#ffc107' : '#e4e5e9'} 
                        onMouseEnter={()=>setHover(currentRating)}
                        onMouseLeave={() =>setHover(null)}
                        />


                </label>
              );


            })}
            
            <p>your rating is {rat}</p>

                      </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-backdrop="false">Close</button>
        <button type="button" className="btn btn-danger" onClick={()=>creatReview()} data-backdrop="false">Post Comment</button>
      </div>
    </div>
  </div>
</div>


                </div>
              </main>
            </div>
          </div>
        </section>
      {/*comment section */}
     <section style={{backgroundColor: '#f7f6f6'}}>
  <div className="container my-5 py-5 text-dark">
    <hr/>
    <div className="row d-flex justify-content-start">
      <div className="col-md-12 col-lg-10 col-xl-8">
        <div className="d-flex justify-content-between align-items-center mb-4">
          
          <h4 className="text-dark mb-0 p-2">Comments ({productdetailes.reviews.length})</h4>
          
        </div>
        {productdetailes.reviews.map((ele) => (

        <div className="card mb-3" key={ele._id}>
          <div className="card-body">
            <div className="d-flex flex-start">
              <img className="rounded-circle shadow-1-strong me-3" src={ele.createdBy.image.secure_url}  alt="avatar" width={40} height={40} />
              <div className="w-100">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="text-primary fw-bold mb-0">
                  {ele.createdBy.userName}
                    <span className="text-dark ms-2">{ele.comment}</span>
                  </h6>
                  <p className="mb-0 fw-bold text-dark">Rating: <span className='text-danger'>{ele.rating}</span></p>
                  
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="small mb-0" style={{color: '#aaa'}}>
                    <a href="#!" className="btn btn-outline-primary link-grey m-2">Remove</a> 
                    <a href="#!" className="btn btn-outline-primary link-grey m-2">Reply</a>  
                    <a href="#!" className=" btn btn-outline-primary link-grey">Translate</a>
                  </p>
                  <div className="d-flex flex-row">
                    <i className="fas fa-star text-warning me-2" />
                    <i className="far fa-check-circle" style={{color: '#aaa'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        ))}
      </div>
      
      
    </div>
  </div>
</section>

      {error ?? <p>{error}</p>}
      </div>

    </>
  );
}

export default ProductDetailes;
