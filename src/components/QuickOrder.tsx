import Link from "next/link";
import { Button } from "./ui/button";

const products = [
  {
    id: 1,
    name: "Cozy Knit Sweater",
    description: "Stay warm and stylish",
    price: 49.99,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    description: "Comfortable and supportive",
    price: 40.99,
    imageUrl: "/placeholder.svg",
  },
  // Add more products as needed
];

export default function QuickOrder() {
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
