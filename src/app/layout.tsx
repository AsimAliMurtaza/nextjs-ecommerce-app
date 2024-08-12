import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CartProvider } from "@/contexts/cart-context";
import { Metadata } from "next";
import Header from "@/components/Header";
import ConditionalHeader from "@/components/ConditionalHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "An e-commerce app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <CartProvider>
            <ConditionalHeader children={children} />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
