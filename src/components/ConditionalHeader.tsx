// src/components/ConditionalHeader.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export function ConditionalHeader({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const noHeaderRoutes = ["/api/auth/signin", "/auth/signup"];

  return (
    <>
      {/* Conditionally render the Header */}
      {!noHeaderRoutes.includes(pathname) && <Header />}
      {children}
    </>
  );
}
