"use client";

import React, { use } from "react";
import { useCart } from "@/contexts/cart-context";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Separator } from "@/components/ui/separator";
import {
  Container,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Heading,
  Button,
  useBreakpointValue,
  IconButton,
  Divider,
  Badge,
} from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";
import { useRouter } from "next/navigation";
interface CartProduct {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  description?: string;
}
// Make sure to load the Stripe public key

const CheckoutPage: React.FC = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const increaseQuantity = (product: CartProduct) => {
    addToCart(product, 1 / 2);
  };

  const decreaseQuantity = (product: CartProduct) => {
    if (product.quantity > 1) {
      addToCart(product, -1 / 2);
    } else {
      removeFromCart(product.id);
    }
  };

  const calculateOrderSummary = () => {
    const subtotal = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const shipping = subtotal > 50 ? 0 : 5.0;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    return [
      { label: "Subtotal", value: `$${subtotal.toFixed(2)}` },
      { label: "Shipping", value: `$${shipping.toFixed(2)}` },
      { label: "Tax", value: `$${tax.toFixed(2)}` },
      { label: "Total", value: `$${total.toFixed(2)}`, isTotal: true },
    ];
  };

  const orderSummary = calculateOrderSummary();

  const handleCheckout = async () => {
    // Send the cart data to your backend to create a session
    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    });

    const { sessionId } = await response.json();

    console.log(sessionId);

    if (stripe && elements) {
      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <Container maxW="container.lg" py={32}>
      <Heading as="h2" size="lg" mb={8} textAlign="center" color="teal.500">
        Cart Items
      </Heading>
      {cart.length === 0 ? (
        <Box
          width="full"
          borderWidth={1}
          borderRadius="md"
          shadow="sm"
          p={8}
          bg="gray.50"
          textAlign="center"
        >
          <Text color="gray.500">Your cart is empty.</Text>
          <Button
            mt={4}
            colorScheme="teal"
            onClick={() => {
              router.push("/products");
            }}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={8}
          border={"1px solid"}
          borderColor="gray.200"
          shadow={10}
          borderRadius="lg"
        >
          {/* Cart Items */}
          <Box flex={2}>
            <Stack spacing={4}>
              {cart.map((product) => (
                <Flex
                  key={product.id}
                  borderWidth={1}
                  borderRadius="lg"
                  p={4}
                  bg="white"
                  align="center"
                  justify="space-between"
                  shadow="sm"
                >
                  <Flex gap={4} align="center">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      boxSize="80px"
                      borderRadius="md"
                      objectFit="cover"
                    />
                    <Box>
                      <Heading as="h3" size="sm" noOfLines={1}>
                        {product.name}
                      </Heading>
                      <Text color="gray.600" fontSize="sm">
                        ${product.price.toFixed(2)} x {product.quantity}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <IconButton
                      aria-label="Decrease quantity"
                      icon={<MinusIcon />}
                      onClick={() => decreaseQuantity(product)}
                      size="sm"
                    />
                    <Text fontSize="md" fontWeight="medium">
                      {product.quantity}
                    </Text>
                    <IconButton
                      aria-label="Increase quantity"
                      icon={<PlusIcon />}
                      onClick={() => increaseQuantity(product)}
                      size="sm"
                    />
                  </Flex>
                </Flex>
              ))}
            </Stack>
          </Box>

          {/* Order Summary */}
          <Box flex={1} bg="gray.50" p={6} borderRadius="lg" shadow="sm">
            <Heading as="h3" size="md" mb={4}>
              Order Summary
            </Heading>
            <Stack spacing={3} mb={6}>
              {orderSummary.map((item) => (
                <Flex
                  key={item.label}
                  justify="space-between"
                  fontWeight={item.isTotal ? "bold" : "normal"}
                  fontSize={item.isTotal ? "lg" : "sm"}
                  color={item.isTotal ? "teal.500" : "gray.700"}
                >
                  <Text>{item.label}</Text>
                  <Text>{item.value}</Text>
                </Flex>
              ))}
            </Stack>
            <Divider mb={6} />
            <Button
              colorScheme="teal"
              size="lg"
              width="full"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </Box>
        </Flex>
      )}
    </Container>
  );
};

export default CheckoutPage;
