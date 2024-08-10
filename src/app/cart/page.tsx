"use client";
import React from "react";
import { useCart } from "@/contexts/cart-context";
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
} from "@chakra-ui/react";
import { MinusIcon, PlusIcon } from "@/components/ui/icons";

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
    addToCart(product, 1);
  };

  const decreaseQuantity = (product: CartProduct) => {
    if (product.quantity > 1) {
      addToCart(product, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  const calculateOrderSummary = () => {
    const subtotal = cart.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );
    const shipping = 5.0;
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
  const cardWidth = useBreakpointValue({ base: "full", sm: "md" });

  return (
    <Container maxW="container.xl" py={20}>
      <Box mb={8}>
        <Heading as="h2" size="xl" mb={4}>
          Cart
        </Heading>
        {cart.length === 0 ? (
          <Box
            width="full"
            borderWidth={1}
            borderRadius="md"
            shadow="md"
            p={10}
            bg="white"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">The cart is empty.</Text>
          </Box>
        ) : (
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
                  <IconButton
                    aria-label="Decrease quantity"
                    icon={<MinusIcon />}
                    onClick={() => decreaseQuantity(product)}
                    variant="outline"
                    size="sm"
                  />
                  <Text fontSize="lg">{product.quantity}</Text>
                  <IconButton
                    aria-label="Increase quantity"
                    icon={<PlusIcon />}
                    onClick={() => increaseQuantity(product)}
                    variant="outline"
                    size="sm"
                  />
                </Flex>
              </Box>
            ))}
            <Box bg="gray.50" borderRadius="lg" shadow="md" p={6}>
              <Flex alignItems="center" justifyContent="space-between" mb={4}>
                <Heading as="h3" size="md">
                  Order Summary
                </Heading>
                <Button variant="outline">Edit</Button>
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
              <Separator />
              <Button colorScheme="teal" variant="solid" width="full">
                Proceed to Checkout
              </Button>
            </Box>
          </Stack>
        )}
      </Box>
    </Container>
  );
};

export default CheckoutPage;
