"use client"
import CartContextProvider from '@/context/CartContext'
import WishlistContextProvider from '@/context/WishlistContext'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Providers = ({children} :{children:React.ReactNode}) => {
  return (
    <SessionProvider >
      <CartContextProvider>
        <WishlistContextProvider>
          {children}
        </WishlistContextProvider>
      </CartContextProvider>
    </SessionProvider>
        
  )
}

export default Providers