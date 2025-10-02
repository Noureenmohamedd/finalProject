import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {

  pages: {
    signIn: "/login",
  },

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "username@domain" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) {
            throw new Error("Invalid response from server");
          }

          const data = await res.json();

          if (data?.message === "success" && data?.token) {
            const decoded = jwtDecode(data.token) as { id: string };
            const userId = decoded?.id;

            return {
              id: userId || "", 
              user: data.user,
              token: data.token,
            };
          }

          throw new Error(data?.message || "Failed to login");
        } catch (err) {
          console.error("Authorize error:", err);
          throw new Error("Login failed. Please try again."); 
        }
      },
    }),
  ],


  callbacks: {

   
      async jwt({ token, user }) {

        if(user){
          token.user= user?.user
          token.token= user?.token
        }
      return token
    } ,
     
    
    async session({ session, token }) {

      if(token){
        session.user=token?.user 
      }
      return session
    },
  },  
  
  

};
