"use client";
import { Button } from "./ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

// Fetch products from an API or database
const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const data: Product[] = await response.json();
  return data;
};

// Get top products based on rating
const getTopProducts = (products: Product[]) => {
  // Sort products by the highest average rating and pick the top 5-6
  const topRatedProducts = products
    .sort((a, b) => {
      const avgRatingA =
        a.reviews.reduce((sum, review) => sum + review.rating, 0) /
          a.reviews.length || 0;
      const avgRatingB =
        b.reviews.reduce((sum, review) => sum + review.rating, 0) /
          b.reviews.length || 0;
      return avgRatingB - avgRatingA; // Highest rating first
    })
    .slice(0, 5); // Limit to top 5-6 products

  return topRatedProducts;
};
export default function TopProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch and set products when the component mounts
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
      setTopProducts(getTopProducts(fetchedProducts));
    };

    loadProducts();
  }, []);

  const handleOnClick = (productId: number) => {
    router.push(`/products/${productId}`);
  };
  const calculateAverageRating = (reviews: { rating: number }[]): number => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  return (
    <section className="py-8 md:py-12 lg:py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Top Products</h2>
          <Link
            href="/products"
            className="text-primary hover:underline"
            prefetch={false}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {topProducts.map((product) => (
            <div className="flex flex-col justify-between" key={product.id}>
              <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                <Link
                  href={`/products/${product.id}`}
                  className="block"
                  prefetch={false}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4 space-y-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div>
                    <span className="font-thin text-sm mb-2 mt-auto mb-5 flex flex-col items-center">
                      Avg Rating:{" "}
                      {calculateAverageRating(product.reviews).toFixed(1)}
                    </span>
                  </div>
                </Link>
              </div>
              <div className="mt-auto mb-5 flex flex-col items-center">
                <span className="font-semibold text-lg mb-2">
                  ${product.price}
                </span>
                <Button
                  size="sm"
                  style={{
                    backgroundColor: "#59B9B7",
                  }}
                  onClick={() => handleOnClick(product.id)}
                >
                  Buy
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
