import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import type { NextAuthOptions, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface DecodedToken {
  id: string;
}

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
      async authorize(credentials): Promise<User | null> {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (!res.ok) throw new Error("Invalid response from server");

          const data = await res.json();

          if (data?.message === "success" && data?.token) {
            const decoded = jwtDecode<DecodedToken>(data.token);

            return {
              id: decoded?.id || "",
              name: data.user?.name || "",
              email: data.user?.email || "",
              token: data.token,
              user: data.user,
            } as unknown as User;
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),
  ],

  callbacks: {

    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // Cast if you’re storing extra fields
        const u = user as unknown as Record<string, unknown>;
        token.user = u.user;
        token.token = u.token;
      }
      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        (session.user as Record<string, unknown>) = token.user as Record<string, unknown>;
      }
      return session;
    },
  },
};
