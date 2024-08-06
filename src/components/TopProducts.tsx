import { Button } from "./ui/button";
import Link from "next/link";

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
    price: 199.99,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Wireless Noise-Cancelling Headphones",
    description: "Immersive audio experience",
    price: 99.99,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Bamboo Cutting Board",
    description: "Durable and eco-friendly",
    price: 29.99,
    imageUrl: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Outdoor Camping Tent",
    description: "Durable and weatherproof",
    price: 99.99,
    imageUrl: "/placeholder.svg",
  },
];

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
          {products.map((product) => (
            <div className="flex flex-col justify-between " key={product.id}>
              <div className="bg-background rounded-lg shadow-sm overflow-hidden">
                <Link href="#" className="block" prefetch={false}>
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
                  {product.price}
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
