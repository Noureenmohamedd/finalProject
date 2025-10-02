"use client"
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Pagination } from 'swiper/modules';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  image: string;
}

interface SwipercategoryProps {
  categories: Category[];
}

const Swipercategory: React.FC<SwipercategoryProps> = ({ categories }) => {
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
            <Image 
              src={category.image} 
              alt={category.name || 'category'} 
              className="w-full h-[200px] object-cover rounded-lg" 
              width={200}
              height={200}
            />
            <p className="text-center mt-2 font-semibold">{category.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Swipercategory
