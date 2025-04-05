import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    // role: string;
    // picture: string;
    // owner: string;
    accessToken: string;
    refreshToken: string;
  }

  interface Session extends DefaultSession {
    id: string;
    user: User;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    // role: string;
    // picture: string;
    // owner: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires: number;
  }
}
