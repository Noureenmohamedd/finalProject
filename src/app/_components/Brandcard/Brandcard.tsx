import React from 'react'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from 'next/link';
import { Brand } from '@/types/brand.t';

const Brandcard = ({product} :{product: Brand}) => {
  return (
    <div   className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5  p-3 ">
      
   
      
      <div className="Inner ">


    <Card className="p-2 gap-2  flex flex-col justify-between h-full btransition-all duration-300 group hover:shadow-lg hover:shadow-gray-400 hover:border-b-4 hover:border-green-500 relative">
      <Link href={`/categorydetails/${product.id}`} >
      <CardHeader className="p-0">
        

        <img className="w-full h-48 object-contain" src={product.image} alt=""/> 
      
      </CardHeader>
      <CardContent className="p-0 flex-grow">
        {/*<p className=""> {product.category.name}</p>
       */} 
       <p className="line-clamp-2  text-black mb-3"> {product.name}</p>
      </CardContent>
      <CardFooter className="p-0">
      
      </CardFooter> 
      </Link>
  
        </Card>
  



      </div>
     

      </div>
  )
}

export default Brandcard