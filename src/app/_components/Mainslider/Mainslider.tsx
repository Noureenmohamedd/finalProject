"use client"
import React from 'react'
import banner1 from "./../../../../public/screens/slider/grocery-banner.png"
import banner2 from "./../../../../public/screens/slider/grocery-banner-2.jpeg"

import slid1 from "./../../../../public/screens/slider/slider-image-1.jpeg"
import slid2 from "./../../../../public/screens/slider/slider-image-2.jpeg"
import slid3 from "./../../../../public/screens/slider/slider-image-3.jpeg"
import slid4 from "./../../../../public/screens/slider/slider-2.jpeg"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import "swiper/css/pagination";
import Image from 'next/image'
import { Autoplay, Pagination } from 'swiper/modules'
const Mainslider = () => {
  return (
    <div className='mb-10  flex '>
        <div className='w-2/3'>
          <Swiper
      spaceBetween={0}
      slidesPerView={1}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
      loop={true} 
        autoplay={{
            delay: 5000, 
            disableOnInteraction: false, 
          }}
          pagination={{
            clickable: true, 
            dynamicBullets: true,
          }}
          modules={[Autoplay, Pagination]}
          className="main-slider"
    >
      <SwiperSlide> <Image className='h-[400] object-cover' src={slid1} alt='slide1' /></SwiperSlide>
      <SwiperSlide> <Image className='h-[400] object-cover' src={slid2} alt='slide2' /></SwiperSlide>
      <SwiperSlide> <Image className='h-[400] object-cover' src={slid3} alt='slide3' /></SwiperSlide>
      <SwiperSlide> <Image className='h-[400] object-cover' src={slid4} alt='slide4' /></SwiperSlide>
      
    </Swiper>

        </div>

        <div className='w-1/3'>
        <Image className='h-[200] object-cover' src={banner1} alt='banner1' />
        <Image className='h-[200] object-cover' src={banner2} alt='banner2' />

        </div>
    </div>
  )
}

export default Mainslider