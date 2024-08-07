"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import {
  SearchIcon,
  UserIcon,
  ShoppingCartIcon,
  MenuIcon,
  HomeIcon,
  PackageIcon,
  LayoutGridIcon,
} from "./ui/icons";

import { useRouter } from "next/navigation";
import CartButton from "./ui/cart-card";
import SearchBar from "./ui/searchBar";

export default function Header() {
  const router = useRouter();
  return (
    <header
      style={{
        backgroundColor: "#59B9B7",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        zIndex: 1000,
      }}
      className="px-4 lg:px-6 py-3 flex items-center justify-between fixed w-full"
    >
      <Link href="/" className="flex items-center gap-2" prefetch={false}>
        <ShoppingBag className="h-6 w-6" />
        <span className="font-semibold text-lg">Ecommerce</span>
      </Link>
      <nav className="hidden lg:flex items-center gap-6">
        <Link href="/" className="font-medium hover:underline" prefetch={false}>
          Home
        </Link>
        <Link
          href="/products"
          className="font-medium hover:underline"
          prefetch={false}
        >
          Products
        </Link>
        <Link
          href="/categories"
          className="font-medium hover:underline"
          prefetch={false}
        >
          Categories
        </Link>

        <Link
          href="/cart"
          className="font-medium hover:underline"
          prefetch={false}
        >
          Cart
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <CartButton />

        <SearchBar/>
        <Button
          variant={"outline"}
          size="sm"
          className="hidden lg:inline-flex"
          style={{
            color: "black",
          }}
          onClick={() => {
            router.push("/account");
          }}
        >
          <UserIcon className="h-4 w-4 mr-2" />
          Account
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs mt-16">
            <nav className="grid gap-4 text-lg font-medium">
              <Link
                href="/"
                className="flex items-center gap-4"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="/products"
                className="flex items-center gap-4"
                prefetch={false}
              >
                <PackageIcon className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="/categories"
                className="flex items-center gap-4"
                prefetch={false}
              >
                <LayoutGridIcon className="h-5 w-5" />
                Categories
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-4"
                prefetch={false}
              >
                <ShoppingCartIcon className="h-5 w-5" />
                Cart
              </Link>
              <Link
                href="/account"
                className="flex items-center gap-4"
                prefetch={false}
              >
                <UserIcon className="h-5 w-5" />
                Account
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
