"use client"
import getWishlistAction from '@/WishlistActions/getWishlist'
import addToWishlist from '@/WishlistActions/addToWishlist'
import removeFromWishlist from '@/WishlistActions/removeFromWishlist'
import { Wishlist, WishlistProduct } from '@/types/wishlist.t'
import React, { createContext, useEffect, useState } from 'react'

type WishlistContextType = {
  wishlistCount: number
  wishlistProducts: WishlistProduct[]
  isLoading: boolean
  isInWishlist: (productId: string) => boolean
  addToWishlistHandler: (productId: string) => Promise<boolean>
  removeFromWishlistHandler: (productId: string) => Promise<boolean>
  updateWishlist: () => void
}

export const wishlistContext = createContext<WishlistContextType>({
  wishlistCount: 0,
  wishlistProducts: [],
  isLoading: false,
  isInWishlist: () => false,
  addToWishlistHandler: async () => false,
  removeFromWishlistHandler: async () => false,
  updateWishlist: () => {}
})

const WishlistContextProvider = ({children}: {children: React.ReactNode}) => {
  const [wishlistCount, setWishlistCount] = useState<number>(0)
  const [wishlistProducts, setWishlistProducts] = useState<WishlistProduct[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  async function getWishlist() {
    setIsLoading(true)
    
    try {
      const data: Wishlist = await getWishlistAction()
      setWishlistProducts(data.data)
      setWishlistCount(data.count)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      setIsLoading(false)
      // Reset wishlist state on error
      setWishlistCount(0)
      setWishlistProducts([])
    }
  }

  // Function to refresh wishlist data
  const updateWishlist = () => {
    getWishlist()
  }

  // Check if product is in wishlist
  const isInWishlist = (productId: string): boolean => {
    return wishlistProducts.some(product => product.id === productId)
  }

  // Add product to wishlist
  const addToWishlistHandler = async (productId: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await addToWishlist(productId)
      if (response.status === "success") {
        await getWishlist() // Refresh wishlist data
        return true
      }
      return false
    } catch (error) {
      console.error('Error adding to wishlist:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  // Remove product from wishlist
  const removeFromWishlistHandler = async (productId: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await removeFromWishlist(productId)
      if (response.status === "success") {
        await getWishlist() // Refresh wishlist data
        return true
      }
      return false
    } catch (error) {
      console.error('Error removing from wishlist:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  return (
    <wishlistContext.Provider 
      value={{
        wishlistCount,
        wishlistProducts,
        isLoading,
        isInWishlist,
        addToWishlistHandler,
        removeFromWishlistHandler,
        updateWishlist
      }}>
      {children}
    </wishlistContext.Provider>
  )
}

export default WishlistContextProvider
