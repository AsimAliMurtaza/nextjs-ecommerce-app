import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Container } from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";

const products = [
  {
    name: "Product Name",
    description: "Product description goes here",
    image: "/placeholder.svg",
    quantity: 1,
  },
  {
    name: "Another Product",
    description: "Another product description",
    image: "/placeholder.svg",
    quantity: 2,
  },
];

const orderSummary = [
  { label: "Subtotal", value: "$99.98" },
  { label: "Shipping", value: "$5.00" },
  { label: "Tax", value: "$8.00" },
  { label: "Total", value: "$112.98", isTotal: true },
];

export default function CheckoutPage() {
  return (
    <Container maxW="container.lg">
      <section className="py-20 md:py-20 lg:py-22">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Cart</h2>
          </div>
          <div className="grid gap-8">
            <div className="grid gap-4">
              {products.map((product, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[80px_1fr_80px] items-center gap-4"
                >
                  <img
                    src={product.image}
                    alt="Product Image"
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {product.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon">
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span>{product.quantity}</span>
                    <Button variant="outline" size="icon">
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-background rounded-lg shadow-sm p-6 grid gap-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Order Summary</h3>
                <Button variant="outline">Edit</Button>
              </div>
              <div className="grid gap-2">
                {orderSummary.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between ${
                      item.isTotal ? "font-semibold" : ""
                    }`}
                  >
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                ))}
              </div>
              <Separator />
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}
