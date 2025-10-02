"use client"

import { wishlistContext } from '@/context/WishlistContext'
import React, { useContext } from 'react'
import { toast } from 'sonner'

const WishlistButton = ({productId}: {productId: string}) => {
  const { isInWishlist, addToWishlistHandler, removeFromWishlistHandler, isLoading } = useContext(wishlistContext)
  
  const inWishlist = isInWishlist(productId)

  const handleWishlistToggle = async () => {
    if (inWishlist) {
      const success = await removeFromWishlistHandler(productId)
      if (success) {
        toast.success("Removed from wishlist", {duration: 1000, position: 'top-center'})
      } else {
        toast.error("Failed to remove from wishlist", {duration: 1000, position: 'top-center'})
      }
    } else {
      const success = await addToWishlistHandler(productId)
      if (success) {
        toast.success("Added to wishlist", {duration: 1000, position: 'top-center'})
      } else {
        toast.error("Failed to add to wishlist", {duration: 1000, position: 'top-center'})
      }
    }
  }

  return (
    <button
      onClick={handleWishlistToggle}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-300 ${
        inWishlist 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <i className={`text-xl ${inWishlist ? 'fas fa-heart' : 'far fa-heart'}`}></i>
    </button>
  )
}

export default WishlistButton
