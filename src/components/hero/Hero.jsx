import React from "react";
import hero from "./hero.jpg";
import man from "./man.jpg";
import woman from "./woman.jpg";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import styles from "./hero.module.css";

function Hero() {
  return (
    <Swiper
      className={styles.herosection}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      modules={[Autoplay, Pagination, Navigation]}
    >
      <SwiperSlide className={styles.SwiperSlide}>
        <img src={hero} alt="" />
        <div className={styles.title}>
          <h1>
            {" "}
            <span>Sale 20% Off </span> <br /> On Everything
          </h1>
          <p>
            Explicabo esse amet tempora quibusdam laudantium, laborum eaque
            magnam fugiat hic? Esse dicta aliquid error repudiandae earum
            suscipit fugiat molestias, veniam, vel architecto veritatis delectus
            repellat modi impedit sequi.
          </p>
          <a>Shop Now</a>
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles.SwiperSlide}>
        <img src={man} alt="" />
        <div className={styles.title}>
          <h1>
            {" "}
            <span>Sale 20% Off </span> <br /> On Everything
          </h1>
          <p>
            Explicabo esse amet tempora quibusdam laudantium, laborum eaque
            magnam fugiat hic? Esse dicta aliquid error repudiandae earum
            suscipit fugiat molestias, veniam, vel architecto veritatis delectus
            repellat modi impedit sequi.
          </p>
          <a>Shop Now</a>
        </div>
      </SwiperSlide>

      <SwiperSlide className={styles.SwiperSlide}>
        <img src={woman} alt="" />
        <div className={styles.title}>
          <h1>
            {" "}
            <span>Sale 20% Off </span> <br /> On Everything
          </h1>
          <p>
            Explicabo esse amet tempora quibusdam laudantium, laborum eaque
            magnam fugiat hic? Esse dicta aliquid error repudiandae earum
            suscipit fugiat molestias, veniam, vel architecto veritatis delectus
            repellat modi impedit sequi.
          </p>
          <a>Shop Now</a>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Hero;
