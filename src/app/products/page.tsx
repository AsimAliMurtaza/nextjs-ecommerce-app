"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilterIcon, LayoutGridIcon } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Container } from "@chakra-ui/react";
import { LayoutList } from "lucide-react";

// Define the type for product data
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
  specifications: {
    material: string;
    sleeveLength: string;
    fit: string;
    careInstructions: string;
  };
  reviews: {
    name: string;
    date: string;
    rating: number;
    comment: string;
  }[];
}
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filters, setFilters] = useState({
    featured: false,
    onSale: false,
    inStock: false,
    priceLowToHigh: false,
    priceHighToLow: false,
    newest: false,
    oldest: false,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const applyFilters = (products: Product[]) => {
    let filteredProducts = products;

    if (filters.featured) {
      filteredProducts = filteredProducts.filter((product) => product.featured);
    }
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((product) => product.stock > 0);
    }

    if (filters.priceLowToHigh) {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.priceHighToLow) {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filters.newest) {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
      );
    } else if (filters.oldest) {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime()
      );
    }

    return filteredProducts;
  };

  const filteredProducts = applyFilters(products);

  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-20 md:py-20 lg:py-22 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">All Products</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, featured: checked }))
                      }
                    >
                      Featured
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, onSale: checked }))
                      }
                    >
                      On Sale
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, inStock: checked }))
                      }
                    >
                      In Stock
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceLowToHigh: checked,
                        }))
                      }
                    >
                      Price: Low to High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({
                          ...prev,
                          priceHighToLow: checked,
                        }))
                      }
                    >
                      Price: High to Low
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, newest: checked }))
                      }
                    >
                      Newest
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onCheckedChange={(checked) =>
                        setFilters((prev) => ({ ...prev, oldest: checked }))
                      }
                    >
                      Oldest
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                      <LayoutList className="h-4 w-4 mr-2" />
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
                <p>No products found.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className={`${
                      viewMode === "grid"
                        ? "bg-background rounded-lg shadow-sm overflow-hidden flex flex-col"
                        : "bg-background rounded-lg shadow-sm overflow-hidden flex md:flex-row"
                    }`}
                  >
                    <Link
                      href={`/products/${product.id}`}
                      className="block"
                      prefetch={false}
                    >
                      <div
                        className={`${
                          viewMode === "list" ? "flex flex-row" : ""
                        }`}
                      >
                        {viewMode === "list" && (
                          <div className="flex-shrink-0 mr-4">
                            <img
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
                            <img
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
                          <div className="mt-4 flex flex-col items-start">
                            <span className="font-semibold text-lg mb-2">
                              ${product.price}
                            </span>
                            <Button
                              size="sm"
                              style={{
                                backgroundColor: "#59B9B7",
                              }}
                            >
                              Buy
                            </Button>
                          </div>
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
