import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Loader from "../../components/loader/Loader";
import { NavLink } from "react-router-dom";
import mystyle from "./product.module.css";
function Products() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [error, setError] = useState("");
  const [pagesCount,setPagesCount]=useState(0);
  const [currentPage,setCurrentPage]=useState(1);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/products?page=${currentPage}&limit=2`
      );
      console.log(data);
      setProducts(data.products);
      setPagesCount(data.total / data.page);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getAllProducts();
  }, [currentPage]);

 /*search */
 const handleInputChange = (e) => {
  console.log(e.target.value);
  const {name,value} = e.target;
  setSearchName({
    [name]: value,
  });
  console.log(searchName)
};
const handleSearch = async(e) => {
  e.preventDefault();
  setLoader(true);
  console.log(searchName);
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products?search=${searchName}`
    );
    console.log(data);
    setProducts(data.products);
    setError("");
  } catch (error) {
    console.log(error);
    setError("error to load data");
  } finally {
    setLoader(false);
  }
};
/*
useEffect(() => {
  handleSearch();
}, [searchName]);
*/
 /*end search */
  if (loader) {
    return <Loader />;
  }
  return (
    <div className="py-2 " style={{ backgroundColor: "#eee" }}>
      {error ?? <p>{error}</p>}
       {/**
          <div className="bg-primary w-100 p-3 ">
           
             * 
             *  <form onSubmit={handleSearch}>
  <label htmlFor="gsearch">Search :</label>
  <input type="search"   name='searchName'  onChange={handleInputChange}/>
  <input type="submit"className="btn bg-main  border-danger" />
</form>

             * 
           
           
          </div>  */}
          <h2 className="text-center p-2">
            <strong>Products</strong>
          </h2>
          {/*
          
          */}
      <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          
          <div className="row d-flex justify-content-center align-items-center">
            {products.map((ele) => (
              <div className="col-lg-3 col-md-6 col-sm-12 mb-4" key={ele._id}>
                <div className="card border border-danger">
                  <div className="bg-image " data-mdb-ripple-color="light">
                    <img
                      src={ele.mainImage.secure_url}
                      className={mystyle.imgprop}
                    />
                    
                  </div>
                  <div className="card-body bg-dark text-light">
                    <a href className="text-reset text-decoration-none">
                      <h5 className="card-title mb-3 text-truncate ">
                        {ele.name}
                      </h5>
                    </a>

                    <h6 className="mb-3">${ele.finalPrice}</h6>
                    <button className="btn btn-danger btn-sm" type="button">
                      <NavLink
                        to={`/productdetailes/${ele._id}`}
                        className="btn  btn-danger"
                      >
                        Detailes
                      </NavLink>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav aria-label="Page navigation example text-center ">
  <ul className="pagination d-flex justify-content-center align-items-center">
    <li className="page-item">
      <button className="page-link"  aria-label="Previous"  disabled={currentPage === 1} onClick={()=>setCurrentPage(currentPage-1)}>
        <span aria-hidden="true">Previous</span>
      </button>
    </li>

{Array.from({length: pagesCount }, (_,index) => index + 1).map((e) =>(

  
  <button className="page-link" key={e} onClick={()=> setCurrentPage(e)}  style={{backgroundColor :e ===currentPage && '#f7444e', color:e===currentPage && "white"}}>{e}</button>

)

)}
    
   
    <li className="page-item">
      <button className="page-link" href="#" aria-label="Next" disabled={currentPage === pagesCount} onClick={()=>setCurrentPage(currentPage+1)}>
        <span aria-hidden="true">Next</span>
      </button>
    </li>
  </ul>
</nav>

        
    </div>
  );
}

export default Products;



