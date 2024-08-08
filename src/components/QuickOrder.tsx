'use client';
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";

// Define the type for product data
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string; // Optional if not every product has a description
  category: string;
  date?: string; // Optional property for date
  stock: number; // Number of items in stock
  onSale: boolean; // Indicates if the product is on sale
  featured: boolean; // Indicates if the product is featured
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

// Fetch products from the API
const fetchProducts = async () => {
  const response = await fetch('/api/products'); // Adjust the API endpoint as needed
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
            <div key={product.id} className="bg-background rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 space-y-2">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full aspect-square object-cover rounded-md"
                />
                <h3 className="font-semibold text-lg">{product.name}</h3>
                <p className="text-muted-foreground text-sm">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">${product.price}</span>
                  <Button
                    style={{
                      backgroundColor: "#59B9B7",
                      color: "white",
                    }}
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
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

// Function to handle adding a product to the cart
const handleAddToCart = (product: Product) => {
  // Implement the functionality to add the product to the cart
  console.log("Adding product to cart:", product);
};
