import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import mystyle from "./categories.module.css";
import Loader from "../../components/loader/Loader";
import { NavLink } from "react-router-dom";
import Products from "../products/Products";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories/active?page=1&limit=9`
      );
      console.log(data.categories);
      setCategories(data.categories);
      setError("");
    } catch (error) {
      console.log(error);
      setError("error to load data");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <div className="container">
      <h2>Categories</h2>
      {error ?? <p>{error}</p>}
      <Swiper
        spaceBetween={30}
        slidesPerView={5}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className={mystyle.mySwiper}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          900: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
      >
        {categories.map((ele) => (
          <SwiperSlide className={mystyle.categoryitem} key={ele._id}>
            <NavLink to={`/category/${ele._id}`}>
            <img src={ele.image.secure_url} alt="" />
            
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Categories;
