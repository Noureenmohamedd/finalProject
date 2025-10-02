"use client"
import React, { useContext } from "react";
import logo from "./../../../../public/screens/freshcart-logo.svg";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { cartContext } from "@/context/CartContext";


const Navbar = () => {
  const {data:session , status}=  useSession()
  const { numOfCart } = useContext(cartContext)

  return (
    <div className="bg-slate-100 py-4 shadow-sm">
      <div className="w-full md:w-[85%] mx-auto flex flex-col md:flex-row items-center justify-between">

        {/*Logo */}
        <div className="flex items-center">
          {status==="authenticated" && <> <Link href="/">
            <Image src={logo} alt="logo" width={120} height={40} />
          </Link> </>}
         
         
        </div>

        {/* Links */}
        <ul className="flex flex-col md:flex-row items-center gap-6  text-gray-600 font-medium">

          {status === "authenticated" && <>  <li><Link href="/" className="hover:text-black">Home</Link></li>
          <li className="relative">
            <Link href="/cart" className="hover:text-black flex items-center gap-2">
             
              Cart
             
            </Link>
          </li>
          
          <Link href="/wishlist" className=" hover:text-black">Wish list</Link>
          <li><Link href="/products" className="hover:text-black">Products</Link></li>
          <li><Link href="/categories" className="hover:text-black">Categories</Link></li>
          <li><Link href="/brands" className="hover:text-black">Brands</Link></li></>}
          {status === "authenticated" && <li><Link href="/orders" className="hover:text-black">My Orders</Link></li>}
          {status==="loading" && <> <h1> LOADING... </h1> </>}

          {status=== "unauthenticated" &&  <><Image src={logo} alt="logo" width={120} height={40} /> </> }


        </ul>
 
     
          {/* Logout */}
          <div> 
            {status === "authenticated"&& <>  
            <Link href="/cart"> <i className="fa-solid fa-cart-shopping"></i> {numOfCart} </Link>
             <button className="px-4 py-2 text-gray-600 hover:text-black transition" onClick={()=> signOut({callbackUrl:"/login"} )}>
            Logout
          </button></>}

          {status === "unauthenticated" && <> 
         
           <button className="px-4 py-2 text-gray-600 hover:text-black transition">
           <Link href="/register">Register</Link>
          </button>
           <button className="px-4 py-2 text-gray-600 hover:text-black transition">
           <Link href="/login">Login</Link>
          </button>
          </>}
         
          
          </div>
        </div>

      </div>
   
  );
};

export default Navbar;
