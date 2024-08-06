import { Button } from "./ui/button";
import Link from "next/link";
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

// Extract unique categories and pick one product per category
const getTopProducts = (products: Product[]) => {
  const categoryMap = new Map<string, Product>();

  products.forEach((product) => {
    if (!categoryMap.has(product.category)) {
      categoryMap.set(product.category, product);
    }
  });

  return Array.from(categoryMap.values());
};

// Get the top products
const topProducts = getTopProducts(SHOP_DATA);

export default function TopProducts() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
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
                <Link href={`/products/${product.id}`} className="block" prefetch={false}>
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
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
