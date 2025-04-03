import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  async function middleware(req) {

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/auth/login",
    },
  },
);

export const config = {
  matcher: [
    "/profile/:path*"
    // "/dashboard/:path*",
    // "/api/dashboard/:path*",
  ],
};
