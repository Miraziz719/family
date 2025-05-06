import NextAuth, {Session} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import axios from "@/lib/axiosInstance";

const authOptions: NextAuthOptions = {
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
      
          return {
            id: String(res.data.user.pk),
            email: res.data.user.email,
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          };
        } catch (err: any) {
          let errorMessage = "Noma'lum xatolik yuz berdi";
          
          if (err.response?.data) {
            const errorData = err.response.data;
      
            if (typeof errorData === "string") {
              errorMessage = errorData;
            } else if (errorData.detail) {
              errorMessage = errorData.detail;
            } else if (typeof errorData === "object") {
              errorMessage = Object.values(errorData).flat().join(" ");
            }
          } else if (err.message) {
            errorMessage = err.message;
          }
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires = Date.now() + 1000 * 60 * 30;
      }

      // if (Date.now() >= new Date(token.accessTokenExpires).getTime()) {
      //   return await refreshAccessToken(token);
      // }

      return token;
    },
    async session({ session, token }) {
      if(!token.accessToken) {
        return {} as Session;
      }
      session.user.id = token.id
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

async function refreshAccessToken(token: any) {
  try {
    console.log('called refresh token')
    const { data } = await axios.post("/auth/token/refresh", {
      refresh: token.refreshToken,
    });

    return {
      ...token,
      accessToken: data.access,
      refreshToken: data.refresh,
      accessTokenExpires: data.access_expiration || Date.now() + 1000 * 60 * 1,
    };
  } catch (error) {
    console.error("Refresh token eskirgan, logout qilinmoqda!");
    return {};
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };