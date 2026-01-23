/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signInSchema } from "@/zod/user.validation";
import { setCookie } from "./tokenHandlers";
import { getDefaultDashboardRoute, isValidRedirectForRole } from "@/lib/auth-utils";

export const loginUser = async (_currentState: any, formData: any): Promise<any> => {
    try {
        const redirectTo = formData.get('redirect') || null;
        console.log(redirectTo);

        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        }
        const validatedFields = signInSchema.safeParse(loginData);
        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map(issue => {
                    return {
                        field: issue.path[0],
                        message: issue.message
                    }
                })
            }
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const result = await res.json();

        const setCookieHeaders = res.headers.getSetCookie();

        if (setCookieHeaders && setCookieHeaders.length > 0) {
            setCookieHeaders.forEach((cookie: string) => {
                const parsedCookie = parse(cookie);

                if (parsedCookie['accessToken']) {
                    accessTokenObject = parsedCookie;
                }
                if (parsedCookie['refreshToken']) {
                    refreshTokenObject = parsedCookie;
                }
            });
        }
        if (!accessTokenObject) {
            throw new Error("Tokens not found in cookies")
        }
        if (!refreshTokenObject) {
            throw new Error("Tokens not found in cookies")
        }

        const cookieStore = await cookies();

        await setCookie("accessToken", accessTokenObject.accessToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60,
            path: accessTokenObject.Path || "/",
        });
        await setCookie("refreshToken", refreshTokenObject.refreshToken, {
            secure: true,
            httpOnly: true,
            maxAge: parseInt(accessTokenObject['Max-Age']) || 1000 * 60 * 60 * 24 * 90,
            path: refreshTokenObject.Path || "/",
        });
        type UserRole = "ADMIN" | "CUSTOMER" | "SHOP_MANAGER";


        // 1. Wrap the verification in a try-catch block
        let verifiedToken: JwtPayload | null = null;

        try {
            const decoded = jwt.verify(
                accessTokenObject.accessToken,
                process.env.JWT_SECRET as string
            );

            if (typeof decoded !== "string") {
                verifiedToken = decoded as JwtPayload;
            }
        } catch (error) {
            console.error("JWT Verification Error inside loginUser:", error);
            return {
                success: false,
                message: "Your session token is invalid. Please try logging in again."
            };
        }

        // 2. Proceed only if verifiedToken exists
        if (!verifiedToken) {
            throw new Error("Invalid token structure");
        }

        const userRole = verifiedToken.role as UserRole;
        // const redirectPath = redirectTo ? redirectTo.toString() : getDefaultDashboardRoute(userRole as UserRole);
        // redirect(redirectPath);

        if (!result.success) {
            throw new Error("Login Failed");
        }

        let redirectPath = getDefaultDashboardRoute(userRole );

        if (redirectTo) {
            const requestedPath = redirectTo.toString();

            if (isValidRedirectForRole(requestedPath, userRole)) {
                redirectPath = requestedPath;
            }
        }
        redirect(`${redirectPath}?loggedIn=true`);
    } catch (error: any) {
        // Re-throw NEXT_REDIRECT errors so Next.js can handle them
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error;
        }
        console.log(error);
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Login Failed. You might have entered incorrect email or password."}` };
    }
}
