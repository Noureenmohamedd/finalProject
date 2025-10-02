import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Link from 'next/link';
import { Product } from '@/types/product.t';
import Addbtn from '../AddbtnCard/Addbtn';
import WishlistButton from '../WishlistButton/WishlistButton';
import Image from 'next/image';
const Homecard = ({product} : {product: Product}) => {
  return (
    <div   className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  p-3 ">
      
      
      
      <div className="Inner ">


    <Card className="p-2 gap-2 transition-all duration-300 group hover:shadow-lg hover:shadow-gray-400 hover:border-b-4 hover:border-green-500 relative">
      <div className="absolute top-2 right-2 z-10">
        <WishlistButton productId={product.id} />
      </div>
      <Link href={`/productdetails/${product.id}`} >
      <CardHeader className="p-0">
        

        <Image src={product.imageCover} alt={product.title} width={200} height={200}/> 
      
      </CardHeader>
      <CardContent className="p-0">
       <p className="font-bold text-green-500 mb-3"> {product.category.name}</p>
       <p className="line-clamp-2"> {product.title}</p>
      </CardContent>
      <CardFooter className="p-0">
       <div className="w-full flex justify-between item-center">
        <p>{product.price} EGP</p>
        <p>{product.ratingsAverage}  <i className="fa-solid fa-star text-yellow-400"></i></p>


       </div>
      
      </CardFooter> 
      </Link>
      <Addbtn id={product.id} showOnHover={true}/>
      
        </Card>
  



      </div>
     

      </div>
  )
}

export default Homecard