import { getToken } from 'next-auth/jwt'
import { NextResponse, NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {

  const cookieName = process.env.NODE_ENV === 'production'
  ? '__Secure-next-auth.session-token'
  : 'next-auth.session-token'

   const token = await getToken({req:request , cookieName})
   const {pathname} =request.nextUrl 

   const authpage =[ "/login" , "/register"]
   const routs =["/" , "allorders","/payment", "/brands" , "categories" , "/cart" , "/productdetails" , "products" , "wishlist"]


    if(!token && routs.includes(pathname))
    {
        return NextResponse.redirect(new URL ('/login' , request.url))
    }

    if(token && authpage.includes(pathname) )
    {
        return NextResponse.redirect(new URL ('/' , request.url))  
    }

 
    return NextResponse.next()
}
 
export const config = {
  matcher: [ "/allorders","/brands" ,"/payment" , "/categories" , "/cart" , "/productdetails" , "/products" , "/wishlist" , "/login" , "/register" ] 
}