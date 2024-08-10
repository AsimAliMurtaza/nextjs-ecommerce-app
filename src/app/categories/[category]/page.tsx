"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@chakra-ui/react";
import Image from "next/image";
import SHOP_DATA from "@/shop_data";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { LayoutGridIcon } from "@/components/ui/icons";
import { LayoutListIcon } from "lucide-react";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
  date?: string;
  stock: number;
  onSale: boolean;
  featured: boolean;
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = SHOP_DATA.filter(
    (product) => product.category === category
  );

  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-20 md:py-20 lg:py-22 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LayoutGridIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>View as</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onClick={() => setViewMode("grid")}
                      checked={viewMode === "grid"}
                    >
                      <LayoutGridIcon className="h-4 w-4 mr-2" />
                      Grid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => setViewMode("list")}
                      checked={viewMode === "list"}
                    >
                      <LayoutListIcon className="h-4 w-4 mr-2" />
                      List
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  : "flex flex-col gap-6"
              }`}
            >
              {filteredProducts.length === 0 ? (
                <p>No products found in this category.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`${
                      viewMode === "grid"
                        ? "bg-background rounded-lg shadow-sm overflow-hidden"
                        : "bg-background rounded-lg shadow-sm overflow-hidden flex flex-row"
                    }`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="block"
                      prefetch={false}
                    >
                      {viewMode === "list" && (
                        <div className="flex-shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={150}
                            height={150}
                            className="w-48 h-48 object-cover"
                          />
                        </div>
                      )}
                      <div
                        className={`${
                          viewMode === "list"
                            ? "flex-1 p-4 flex flex-col justify-between"
                            : "p-4 space-y-2"
                        }`}
                      >
                        {viewMode === "grid" && (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={300}
                            height={300}
                            className="w-full aspect-square object-cover"
                          />
                        )}
                        <div
                          className={`${
                            viewMode === "list"
                              ? "flex-1 flex flex-col justify-between"
                              : ""
                          }`}
                        >
                          <h3 className="font-semibold text-lg">
                            {product.name}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {product.description}
                          </p>
                        </div>
                        <div className="mt-4 flex flex-col items-center">
                          <span className="font-semibold text-lg mb-2">
                            ${product.price}
                          </span>
                          <Button
                            size="sm"
                            style={{
                              backgroundColor: "#59B9B7",
                            }}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
