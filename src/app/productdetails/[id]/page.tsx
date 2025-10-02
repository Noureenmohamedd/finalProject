import React from 'react'
import getSingleProduct from '../../../apis/singleProuct'
import Addbtn from '@/app/_components/AddbtnCard/Addbtn'
import WishlistButton from '@/app/_components/WishlistButton/WishlistButton'
import Image from 'next/image'

const Productdetails = async ( {params}: {params : {id: string }}) => {
  const {id} =await params 
  const data = await getSingleProduct(id)

  return (
    <div className='w-full px-5 md:w-[80%] md:px-0 mx-auto my-10 flex items-center flex-col md:flex-row'>
      <div className='w-full md:w-1/3'>
      <Image src={data.imageCover} className="w-full" alt={data.title} width={400} height={400} />

      </div>

      <div className='w-full md:w-2/3 px-3 m-10 md:m0 ps-0 md:ps-5'>
      <div className="flex justify-between items-start mb-4">
        <h2 className='text-2xl text-black font-bold'> {data.title} </h2>
        <WishlistButton productId={data.id} />
      </div>

      <p className='my-5 '> {data.description}</p>
    
      
      <div className="w-full my-5 flex justify-between item-center">
        <p>{data.price} EGP</p>
        <p>{data.ratingsAverage}  <i className="fa-solid fa-star text-yellow-400"></i></p>
      </div>
       
      <Addbtn id={data.id}/>
     
      </div>
    </div>
  )
}

export default Productdetails