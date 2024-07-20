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

const products = [
  {
    name: "Cozy Knit Sweater",
    description: "Stay warm and stylish",
    image: "/placeholder.svg",
    price: "$49.99",
  },
  {
    name: "Ergonomic Office Chair",
    description: "Comfortable and supportive",
    image: "/placeholder.svg",
    price: "$199.99",
  },
  {
    name: "Wireless Noise-Cancelling Headphones",
    description: "Immersive audio experience",
    image: "/placeholder.svg",
    price: "$99.99",
  },
  {
    name: "Bamboo Cutting Board",
    description: "Durable and eco-friendly",
    image: "/placeholder.svg",
    price: "$29.99",
  },
  {
    name: "Outdoor Camping Tent",
    description: "Durable and weatherproof",
    image: "/placeholder.svg",
    price: "$99.99",
  },
  {
    name: "Stainless Steel Cookware Set",
    description: "Durable and easy to clean",
    image: "/placeholder.svg",
    price: "$149.99",
  },
  {
    name: "Leather Messenger Bag",
    description: "Stylish and durable",
    image: "/placeholder.svg",
    price: "$79.99",
  },
  {
    name: "Smart Home Thermostat",
    description: "Intelligent climate control",
    image: "/placeholder.svg",
    price: "$99.99",
  },
  {
    name: "Fitness Tracker Watch",
    description: "Monitor your activity",
    image: "/placeholder.svg",
    price: "$59.99",
  },
  {
    name: "Organic Cotton Sheets",
    description: "Soft and sustainable",
    image: "/placeholder.svg",
    price: "$89.99",
  },
];

export default function ProductsPage() {
  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
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
                    <DropdownMenuCheckboxItem>
                      Featured
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>On Sale</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      In Stock
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>
                      Price: Low to High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Price: High to Low
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>Newest</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
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
                    <DropdownMenuCheckboxItem>Grid</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>List</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col"
                >
                  <div
                    key={index}
                    className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col"
                  >
                    <Link href="#" className="block" prefetch={false}>
                      <img
                        src={product.image}
                        alt="Product Image"
                        width={300}
                        height={300}
                        className="w-full aspect-square object-cover"
                      />
                      <div className="p-4 space-y-2 flex flex-col flex-1">
                        <h3 className="font-semibold text-lg">
                          {product.name}
                        </h3>
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
      </main>
    </Container>
  );
}
