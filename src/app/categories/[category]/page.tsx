"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "@chakra-ui/react";
import SHOP_DATA from "@/shop_data"; // Adjust the path according to your project structure

// Define the type for product data
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

export default function CategoryPage() {
  // Access the category parameter from the URL
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products based on the selected category
  const filteredProducts = SHOP_DATA.filter(
    (product) => product.category === category
  );

  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">{category}</h2>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                >
                  {viewMode === "grid" ? "List View" : "Grid View"}
                </Button>
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
                    <Link href={`/products/${product.id}`} className="block" prefetch={false}>
                      {viewMode === "list" && (
                        <div className="flex-shrink-0">
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
                          <h3 className="font-semibold text-lg">{product.name}</h3>
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
