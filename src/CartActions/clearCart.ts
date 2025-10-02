"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function clearUserCart() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login first.");
  }

  const { data } = await axios.delete(
    "https://ecommerce.routemisr.com/api/v1/cart",
    {
      headers: {
        token: token as string 
      }
    }
  );

  return data;
}
