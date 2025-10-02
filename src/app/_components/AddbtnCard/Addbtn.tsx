"use client"

import AddToCart from '@/CartActions/addToCart'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { toast } from 'sonner'
import { cartContext } from '@/context/CartContext'

const Addbtn = ({id, showOnHover = false}: { id: string, showOnHover?: boolean }) => {
  const { updateCart } = useContext(cartContext)

   async function handleCard(){
    const data = await AddToCart(id)

    if (data.status==="success"){
        toast.success(data.message , {duration:1000 , position: 'top-center'})
        updateCart() 
    }

    else{
         toast.error("Failed to add" , {duration:1000 , position: 'top-center'})
    }

    }
  const visibilityClasses = showOnHover
    ? 'opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300'
    : '';

  return (
    <div>
      <Button
        className={`w-[45%] bg-green-600 mt-3 ${visibilityClasses}`}
        variant="default"
        onClick={handleCard}
      >
        Add To Cart
      </Button>
    </div>
  )
}

export default Addbtn