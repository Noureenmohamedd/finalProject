"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function AddToCart(id: string) {
  const token = await getMyToken();

  if (!token) {
    throw new Error("You must be logged in to add items to the cart");
  }

  const values = {
    productId: id,
  };

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    values,
    {
      headers: {
        token: token as string 
      },
    }
  );

  return data;
}
