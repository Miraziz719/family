import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import axios from "@/lib/axiosInstance";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post("/auth/login/", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (res.data.access) {
            return {
              id: String(res.data.user.pk),
              email: res.data.user.email,
              accessToken: res.data.access,
              refreshToken: res.data.refresh,
            };
          }
          throw new Error(res.data);

        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 15;
      }

      if (Date.now() >= token.accessTokenExpires) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};

// 🔹 Access tokenni refresh qilish funksiyasi
async function refreshAccessToken(token: any) {
  try {
    const { data } = await axios.post("/auth/token/refresh", {
      refresh: token.refreshToken,
    });

    return {
      ...token,
      accessToken: data.access,
      refreshToken: data.refresh,
      accessTokenExpires: data.access_expiration || Date.now() + 1000 * 60 * 15, // 15 daqiqa
    };
  } catch (error) {
    console.error("Refresh token eskirgan, logout qilinmoqda!");
    return { ...token, error: "RefreshTokenExpired" };
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };