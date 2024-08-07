"use client";
import React, { useEffect } from "react";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Container,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";

// Define the type for products in the cart
interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
}

const CheckoutPage: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();

  const increaseQuantity = (product: CartProduct) => {
    addToCart(product, 1/2);
  };

  const decreaseQuantity = (product: CartProduct) => {
    if (product.quantity > 1) {
      addToCart(product, -1/2);
    } else {
      removeFromCart(product.id);
    }
  };

  const calculateOrderSummary = () => {
    const subtotal = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const shipping = 5.0; // Example flat rate
    const tax = subtotal * 0.08; // Example tax rate (8%)
    const total = subtotal + shipping + tax;

    return [
      { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
      { label: "Shipping", value: `$${shipping.toFixed(2)}` },
      { label: "Tax", value: `$${tax.toFixed(2)}` },
      { label: "Total", value: `$${total.toFixed(2)}`, isTotal: true },
    ];
  };

  const orderSummary = calculateOrderSummary();

  return (
    <Container maxW="container.xl" py={20}>
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Cart
        </Heading>
        <Stack spacing={4}>
          {cart.map((product) => (
            <Box
              key={product.id}
              display="grid"
              gridTemplateColumns="80px 1fr 150px"
              alignItems="center"
              gap={4}
              p={4}
              borderWidth={1}
              borderRadius="md"
              shadow="md"
              bg="white"
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                boxSize="80px"
                borderRadius="md"
                objectFit="cover"
              />
              <Box>
                <Heading as="h3" size="md">
                  {product.name}
                  <Text fontSize="lg" fontWeight="thin">
                    ${product.price} x {product.quantity}
                  </Text>
                </Heading>
              </Box>
              <Flex alignItems="center" gap={4}>
                <Button
                  variant="outline"
                  size="sm"
                  borderRadius="40%"
                  p={1}
                  onClick={() => decreaseQuantity(product)}
                >
                  <MinusIcon />
                </Button>
                <Text fontSize="lg">{product.quantity}</Text>
                <Button
                  variant="outline"
                  size="sm"
                  borderRadius="40%"
                  p={1}
                  onClick={() => increaseQuantity(product)}
                >
                  <PlusIcon />
                </Button>
              </Flex>
            </Box>
          ))}
          <Box bg="gray.50" borderRadius="lg" shadow="md" p={6}>
            <Flex alignItems="center" justifyContent="space-between" mb={4}>
              <Heading as="h3" size="md">
                Order Summary
              </Heading>
              <Button variant="outline" as={Link} href="/cart/edit">
                Edit
              </Button>
            </Flex>
            <Stack spacing={2} mb={4}>
              {orderSummary.map((item) => (
                <Flex
                  key={item.label}
                  alignItems="center"
                  justifyContent="space-between"
                  fontWeight={item.isTotal ? "bold" : "normal"}
                >
                  <Text>{item.label}</Text>
                  <Text>{item.value}</Text>
                </Flex>
              ))}
            </Stack>
            <Separator my={4} />
            <Button
              bg="black"
              color="white"
              style={{
                width: "100%",
              }}
              _hover={{ bg: "gray.700" }}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
