import NextAuth from "next-auth"
declare module "next-auth" {
 
  interface User {
    token:string ,
    user: { name : string , email: string , rol:string  },
  }
  interface Session {
    user: User.user
  }
}