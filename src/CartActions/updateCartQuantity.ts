"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function updateCartQuantity(productId: string, count: number) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login first.");
  }

  const values = {
    count: count
  };

  const { data } = await axios.put(
    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
    values,
    {
      headers: {
        token: token
      }
    }
  );

  return data;
}
