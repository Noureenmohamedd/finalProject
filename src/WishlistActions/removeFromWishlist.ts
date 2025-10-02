"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function removeFromWishlist(productId: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login first.");
  }

  const { data } = await axios.delete(
    `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
    {
      headers: {
        token: token as string 
      }
    }
  );

  return data;
}
