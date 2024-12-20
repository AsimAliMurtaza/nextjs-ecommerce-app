'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CartProvider } from "@/contexts/cart-context";
import Header from "@/components/Header";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const inter = Inter({ subsets: ["latin"] });
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_API_KEY?.toString() || "");


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Elements stripe={stripePromise}>
          <CartProvider>
            <Header />
            {children}
          </CartProvider>
          </Elements>
        </Providers>
      </body>
    </html>
  );
}
