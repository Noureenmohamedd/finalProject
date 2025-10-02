"use client"
import getUserCartAction from '@/CartActions/getUserCart'
import updateCartQuantity from '@/CartActions/updateCartQuantity'
import removeCartItem from '@/CartActions/removeCartItem'
import clearUserCart from '@/CartActions/clearCart'
import { Cart, ProductCart } from '@/types/cart.t'
import React, { useEffect, useState, useCallback } from 'react'
import { createContext } from 'react'

type CartContextType = {
  numOfCart: number
  totalPrice: number
  product: ProductCart[]
  isloading: boolean
  cartId: string
  updateCart: () => void
  updateQuantity: (productId: string, newCount: number) => void
  removeItem: (productId: string) => void
  clearCart: () => void
  afterPayment: () => void
}

export const cartContext = createContext<CartContextType>({
  cartId:"",
  numOfCart: 0,
  totalPrice: 0,
  product: [],
  isloading: false,
  updateCart: () => {},
  updateQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
  afterPayment: () => {}
})

const CartContextProvider = ({children} : {children :React.ReactNode}) => {
    const [numOfCart, setnumOfCart] = useState(0)
    const [totalPrice, settotalPrice] = useState(0)
    const [product, setproduct] = useState<ProductCart[]>([])
    const [isloading, setisloading] = useState(false)
    const [cartId, setcartId] = useState("")


const getUserCart = useCallback(async () => {
    setisloading(true)
    
    try {
        
        const data :Cart  = await getUserCartAction()

        setproduct(data.data.products)
        settotalPrice(data.data.totalCartPrice)
        
       
        const cartCount = data.numofcartItems || calculateCartCount(data.data.products)
        setnumOfCart(cartCount)

        setcartId(data.cartId)
        
        setisloading(false)


    }
    catch(error){
        console.log(error)
        setisloading(false)
    
        setnumOfCart(0)
        setproduct([])
        settotalPrice(0)

    }


   }, [])

  
   const updateCart = () => {
     getUserCart()
   }

  
   const calculateCartCount = (products: ProductCart[]) => {
     return products.reduce((total, item) => total + item.count, 0)
   }

 
   const updateQuantity = async (productId: string, newCount: number) => {
     try {
       setisloading(true)
       const response = await updateCartQuantity(productId, newCount)
       if (response.status === "success") {
        
         await getUserCart()
       }
     } catch (error) {
       console.error('Error updating quantity:', error)
     } finally {
       setisloading(false)
     }
   }


   const removeItem = async (productId: string) => {
     try {
       setisloading(true)
       const response = await removeCartItem(productId)
       if (response.status === "success") {
        
         await getUserCart()
       }
     } catch (error) {
       console.error('Error removing item:', error)
     } finally {
       setisloading(false)
     }
   }

   const clearCart = async () => {
     try {
       setisloading(true)
       const response = await clearUserCart()
       if (response.message === "success" || response.status === "success") {
      
         setproduct([])
         setnumOfCart(0)
         settotalPrice(0)
       } else {
        
         await getUserCart()
       }
     } catch (error) {
       console.error('Error clearing cart:', error)
      
       await getUserCart()
     } finally {
       setisloading(false)
     }
   }

 
   useEffect(() => {
     const newCount = calculateCartCount(product)
     if (newCount !== numOfCart) {
       setnumOfCart(newCount)
     }
   }, [product, numOfCart])

   useEffect( function( ) {
    getUserCart()
   }, [getUserCart])

   function afterPayment(){
    setcartId("")
    setnumOfCart(0)
    settotalPrice(0)
    setproduct([])



   }
  
  
  
  
  
  
    return (
    <cartContext.Provider 
      value={{
        isloading,
        numOfCart , 
        product, 
        totalPrice,
        updateCart,
        updateQuantity,
        removeItem,
        clearCart,
        cartId,
        afterPayment,
      }}>
        
         {children}
         
    </cartContext.Provider>
   
  )
}

export default CartContextProvider