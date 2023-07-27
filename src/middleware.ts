import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("user-token")?.value;

  const verifiedToken =
    token &&
    (await verifyAuth(token).catch((err) => {
      console.log(err);
    }));

  if (req.url.includes("/login") && !verifiedToken) {
    return;
  }

  if (req.url.includes("/signin") && !verifiedToken) {
    return;
  }

  if (!verifiedToken) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (req.url.includes("/login") && verifiedToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (req.nextUrl.pathname === "/admin" && verifiedToken) {
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  if (verifiedToken) {
    return;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/admin"],
};
