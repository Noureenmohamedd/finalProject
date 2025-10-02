"use client"
import React, { useContext } from 'react'
import { wishlistContext } from '../../context/WishlistContext'
import { cartContext } from '../../context/CartContext'
import Loading from "../loading"
import { Button } from "@/components/ui/button"
import { WishlistProduct } from '../../types/wishlist.t'
import Image from "next/image"
import Link from "next/link"
import AddToCart from '@/CartActions/addToCart'
import { toast } from 'sonner'

const WishlistPage = () => {
  const { 
    wishlistProducts, 
    wishlistCount, 
    isLoading, 
    removeFromWishlistHandler 
  } = useContext(wishlistContext)
  
  const { updateCart } = useContext(cartContext)

  const handleAddToCart = async (productId: string) => {
    try {
      const data = await AddToCart(productId)
      if (data.status === "success") {
        toast.success("Added to cart", {duration: 1000, position: 'top-center'})
        updateCart()
        
        await removeFromWishlistHandler(productId)
        toast.success("Removed from wishlist", {duration: 1000, position: 'top-center'})
      } else {
        toast.error("Failed to add to cart", {duration: 1000, position: 'top-center'})
      }
    } catch {
      toast.error("Failed to add to cart", {duration: 1000, position: 'top-center'})
    }
  }

  const handleRemoveFromWishlist = async (productId: string) => {
    const success = await removeFromWishlistHandler(productId)
    if (success) {
      toast.success("Removed from wishlist", {duration: 1000, position: 'top-center'})
    } else {
      toast.error("Failed to remove from wishlist", {duration: 1000, position: 'top-center'})
    }
  }

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='w-full md:w-[80%] mx-auto my-10 px-5 md:px-0 bg-slate-200'>
      <div className='p-5'>
        <h1 className='text-2xl font-bold'>
          My Wishlist
        </h1>
        <p className='my-3 text-green-800 font-mono'>
          {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'} in your wishlist
        </p>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-10">
            <i className="far fa-heart text-6xl text-gray-400 mb-4"></i>
            <p className="text-lg text-gray-600 mb-4">Your wishlist is empty</p>
            <Link href="/products">
              <Button className="bg-green-600 hover:bg-green-700">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className='allProducts'>
            {wishlistProducts.map((product: WishlistProduct, idx: number) => {
              return (
                <div key={idx} className='flex item-center justify-between p-3 border-b-[1px] border-green-700/35'>
                  <div className='flex items-center gap-5'>
                    <div>
                      <Image alt="" src={product.imageCover} height={200} width={200} />
                    </div>

                    <div>
                      <Link href={`/productdetails/${product.id}`}>
                        <h1 className="hover:text-green-600 transition-colors cursor-pointer">
                          {product.title}
                        </h1>
                      </Link>
                      <p className='my-3 text-green-700'>Price: {product.price} EGP</p>
                      <div className="flex gap-3">
                        <Button
                          className="bg-black hover:bg-green-700"
                          onClick={() => handleAddToCart(product.id)}
                        >
                          Add to Cart
                        </Button>
                        <Button
                          className="bg-black hover:bg-red-800"
                          onClick={() => handleRemoveFromWishlist(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className='flex items-center'>
                    <div className="text-right">
                      <p className="text-yellow-500">
                        {product.ratingsAverage} <i className="fa-solid fa-star"></i>
                      </p>
                      <p className="text-gray-500 text-sm">
                        {product.ratingsQuantity} reviews
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage
