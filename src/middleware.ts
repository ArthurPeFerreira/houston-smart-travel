import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // if (pathname == "/check-flights") {
  //   const underConstructionUrl = req.nextUrl.clone();
  //   underConstructionUrl.pathname = "/under-construction";
  //   return NextResponse.redirect(underConstructionUrl);
  // }


  if (!token && (pathname == "/admin" || pathname.startsWith("/api/admin"))) {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/login";
    return NextResponse.redirect(loginUrl);
  }

  if (token && pathname === "/login") {
    const loginUrl = req.nextUrl.clone();
    loginUrl.pathname = "/admin";
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
