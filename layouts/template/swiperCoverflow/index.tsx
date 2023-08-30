"use client";
/* eslint-disable @next/next/no-img-element */
import { EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

export default function SwiperCoverflow(props: { images: any[] }) {
  return (
    <div>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.2}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        breakpoints={{
          // When window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // When window width is < 768px
          0: {
            slidesPerView: 1.5,
          },
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="Products"
      >
        {props.images &&
          props.images.map((image, i) => (
            <div key={i}>
              <SwiperSlide>
                <img alt="oke" src={image} className="w-32 h-32 md:h-52 md:w-52" />
              </SwiperSlide>
            </div>
          ))}
      </Swiper>
    </div>
  );
}
