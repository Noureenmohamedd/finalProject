"use server"



import getMyToken from "@/utilities/token"
import axios from "axios"
import { jwtDecode } from "jwt-decode"

export default async function getUserOrder() {
  const token = await getMyToken()

  
  if (!token || typeof token !== "string") {
    throw new Error("Login first")
  }


  const { id } = jwtDecode<{ id: string }>(token)

  const { data } = await axios.get(
    `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    }
  )

  return data
}
