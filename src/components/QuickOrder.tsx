"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

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

const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const data: Product[] = await response.json();
  return data;
};

export default function QuickOrder() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Quick Order</h2>
          <Link
            href="/cart"
            className="text-primary hover:underline"
            prefetch={false}
          >
            View Cart
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-background rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-4 space-y-2">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover rounded-md"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    ${product.price}
                  </span>
                  <Button
                    style={{
                      backgroundColor: "#59B9B7",
                      color: "white",
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
