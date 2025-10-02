"use server";

import getMyToken from "@/utilities/token";

export default async function getWishlistAction() {
  const token = await getMyToken();

  if (!token) {
    throw new Error("Login first.");
  }

  const response = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
    headers: {
      token: token as string,
    }
  });

  const data = await response.json();

  return data;
}
