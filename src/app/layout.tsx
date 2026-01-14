import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import CartDrawerClient from "@/components/modules/card/CartDrawerClient";


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
          <CartDrawerClient/>
        </Providers>
      </body>
    </html>
  );
}
