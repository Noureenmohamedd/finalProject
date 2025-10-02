"use server";

import getMyToken from "@/utilities/token";
import axios from "axios";

export default async function AddToCart(id) {
  const token = await getMyToken();

  const values = {
    productId: id
  };

  const { data } = await axios.post(
    "https://ecommerce.routemisr.com/api/v1/cart",
    values,
    {
      headers: {
        token: token
      }
    }
  );

  return data;
}
