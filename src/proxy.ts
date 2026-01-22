import jwt, { JwtPayload } from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDefaultDashboardRoute, getRouteOwner, isAuthRoutes, UserRole } from './lib/auth-utils';

export async function proxy(request: NextRequest) {
    const cookieStore = await cookies();
    const pathname = request.nextUrl.pathname;

    const accessToken = request.cookies.get('accessToken')?.value || null;

    let userRole: UserRole | null = null;

    if (accessToken) {
        try {
            //============== Verify the token ================//
            const verifiedToken = jwt.verify(
                accessToken,
                process.env.JWT_SECRET as string
            ) as JwtPayload;

            userRole = verifiedToken.role as UserRole;
        } catch (error) {
            // If signature is invalid or token is expired, it comes here
            console.error("JWT Error:", error);

            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete("accessToken");
            response.cookies.delete("refreshToken");
            return response;
        }
    }

    const routerOwner = getRouteOwner(pathname);
    const isAuth = isAuthRoutes(pathname);

    // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
    if (accessToken && isAuth) {
        return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
    }

    // Rule 2 : User is trying to access open public route
    if (routerOwner === null) {
        return NextResponse.next();
    }

    if (!accessToken) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (routerOwner === "COMMON") {
        return NextResponse.next();
    }

    if (routerOwner === "ADMIN" || routerOwner === "SHOP_MANAGER") {
        if (userRole !== routerOwner) {
            return NextResponse.redirect(new URL(getDefaultDashboardRoute(userRole as UserRole), request.url))
        }
        return NextResponse.next();
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)',
    ],
}