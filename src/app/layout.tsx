import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import CartDrawerClient from "@/components/modules/card/CartDrawerClient";
import { Suspense } from "react";
import LoginSuccessToast from "@/components/modules/AuthLogin/LoginSuccessToast";
import LogoutSuccessToast from "@/components/modules/AuthLogin/LogoutSuccessToast";

export const metadata: Metadata = {
  title: "Colourrose",
  description: "The Ultimate Fashion Destination Colourrose",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
          <CartDrawerClient />
        </Providers>
        <Suspense fallback={null}>
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
