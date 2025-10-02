"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';

const Swipercategory = ({ categories }) => {
  return (  
    <div>
      <Swiper
        spaceBetween={1}
        slidesPerView={7}
        loop={true}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
           pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="main-slider"
      >
        {categories.map((category, idx) => (
          <SwiperSlide key={idx}>
            <img 
              src={category.image} 
              alt={category.name || 'category'} 
              className="w-full h-[200px] object-cover rounded-lg" 
            />
            <p className="text-center mt-2 font-semibold">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Swipercategory
