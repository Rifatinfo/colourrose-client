/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { parse } from "cookie";
import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import jwt, { JwtPayload } from "jsonwebtoken";
import { signInSchema } from "@/zod/user.validation";
import { setCookie } from "./tokenHandlers";

export const loginUser = async (_currentState: any, formData: FormData) => {
    try {
        const redirectTo = formData.get("redirect") || null;
        let accessTokenObject: null | any = null;
        let refreshTokenObject: null | any = null;
        const loginData = {
            email: formData.get("email"),
            password: formData.get("password"),
        };

        const validatedFields = signInSchema.safeParse(loginData);

        if (!validatedFields.success) {
            return {
                success: false,
                errors: validatedFields.error.issues.map((issue) => ({
                    field: issue.path[0],
                    message: issue.message,
                })),
            };
        }

        // Call your backend API
        const res = await fetch(`http://localhost:5000/api/v1/auth/login`, {
            method: "POST",
            body: JSON.stringify(loginData),
            headers: { "Content-Type": "application/json" },
        });

        const result = await res.json();
        console.log(result);
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

        // Decode JWT to get user role
        let verifiedToken: JwtPayload | null = null;

        try {
            const decoded = jwt.verify(accessTokenObject.accessToken, process.env.JWT_SECRET as string);
            if (typeof decoded !== "string") verifiedToken = decoded as JwtPayload;
        } catch (err) {
            console.log(err);
            throw new Error("Invalid session token");
        }

        // const userRole = verifiedToken?.role as "ADMIN" | "CLIENT";
        // let redirectPath = getDefaultDashboardRoute(userRole);

        // if (redirectTo) {
        //   const requestedPath = redirectTo.toString();
        //   if (isValidRedirectForRole(requestedPath, userRole)) redirectPath = requestedPath;
        // }

        // redirect(`${redirectPath}?loggedIn=true`);
        //  Return success response
        return {
            success: true,
            message: "Login successful",
            user: verifiedToken,
            data: result,
        };
    } catch (error: any) {
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        console.error(error);
        return {
            success: false,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Login failed. Email or password may be incorrect.",
        };
    }
};
