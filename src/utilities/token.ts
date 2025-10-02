"use server"
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";


export default async function getMyToken(){
  const cookieStore = await cookies();
  const sessionCookie =
    cookieStore.get("next-auth.session-token")?.value ||
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie) return null;

  const decoded = await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET as string,
  });

  
  return decoded?.token ?? null;
}