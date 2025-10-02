
"use client"
import React, { useContext } from 'react'
import { cartContext } from '../../context/CartContext';
import Loading from "../loading"
import { Button } from "@/components/ui/button"
import { ProductCart } from '../../types/cart.t';
import Image from "next/image";
import Link from 'next/link';

const page =  () => {

  const { isloading,
          product, 
          totalPrice,
          updateQuantity,
          removeItem,
          clearCart} = useContext(cartContext)

 // if (isloading){
   // return <Loading/> 
  //}
  
  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-200'>

      <div className='p-5' > 
        <h1 className='text-2xl font-bold'>
          Shop Cart: 
        </h1>
        <p className='my-3 text-green-800 font-mono' > 
          Total Price : {totalPrice} EGP
        </p>

        <Button className="mb-10 bg-black hover:bg-red-800" onClick={clearCart}>
          Clear Cart
        </Button>

         <Button className="mb-10 bg-black hover:bg-green-800 ms-[20]" >
          <Link href="/payment">Check Out</Link>
        </Button>

        <div className='allProducts'>

          
            {product.map( function (product: ProductCart , idx:number ) {
               return <div key={idx} className='flex item-center justify-between p-3 border-b-[1px] border-green-700/35 '> 
               

                 <div className='flex items-center gap-5'>
                  <div>
                  <Image alt="" src={product.product.imageCover} height={200} width={200} />     
                  </div>

                  <div>
                    <h1> {product.product.title}</h1>
                    <p className='my-3 text-green-700'>Price : {product.price} EGP</p>
                    <Button 
                      className="bg-black hover:bg-red-900"
                      onClick={() => removeItem(product.product.id)}
                    >
                      Remove
                    </Button>
                  </div>

                 

                  
                  
                 </div>   
                 <div className='flex items-center gap-3'>
                      <Button 
                        className="bg-black hover:bg-green-700 w-8 h-8 p-0"
                        onClick={() => updateQuantity(product.product.id, product.count + 1)}
                      >
                        +
                      </Button>
                       <p className="min-w-[2rem] text-center">{product.count}</p>
                        <Button 
                          className='bg-black hover:bg-red-800 w-8 h-8 p-0'
                          onClick={() => {
                            if (product.count === 1) {
                              removeItem(product.product.id)
                            } else {
                              updateQuantity(product.product.id, product.count - 1)
                            }
                          }}
                      >
                        -
                      </Button>
                    </div>


              
               
                </div>
            })}

          </div>
      

      </div>

    </div>
  )
}

export default page