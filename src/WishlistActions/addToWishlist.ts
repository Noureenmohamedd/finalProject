"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function addToWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login first.");
  }

  const values = {
    productId: productId
  };

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/wishlist",
    values,
    {
      headers: {
        token: token as string 
      }
    }
  );

  return data;
}
