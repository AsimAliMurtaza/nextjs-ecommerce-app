"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Button,
  Box,
  Container,
  Grid,
  Heading,
  Image,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCart } from "@/contexts/cart-context";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
  date?: string;
  stock: number;
  onSale: boolean;
  featured: boolean;
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

const fetchProducts = async () => {
  const response = await fetch("/api/products");
  const data: Product[] = await response.json();
  return data;
};

export default function QuickOrder() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const toast = useToast();

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const quantity = 1; // Default quantity
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      },
      quantity
    );
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box as="section" py={{ base: 4, md: 8, lg: 20 }} width="100%">
      <Container maxW="container.xl">
        <Box
          mb={8}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} fontWeight="bold">
            Quick Order
          </Heading>
          <Link href="/cart">
            <Text
              color="teal.500"
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
            >
              View Cart
            </Text>
          </Link>
        </Box>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={6}
        >
          {products.map((product) => (
            <Box
              key={product.id}
              bg="white"
              borderRadius="lg"
              shadow="md"
              border="1px solid #e2e8f0"
              overflow="hidden"
              p={4}
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="space-between"
              _hover={{
                shadow: "md",
                cursor: "pointer",
                transform: "scale(1.04)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Image
                src={product.imageUrl}
                alt={product.name}
                boxSize="200px"
                objectFit="cover"
                borderRadius="md"
                mb={4}
              />
              <Heading as="h3" size="md" fontWeight="semibold" mb={2}>
                {product.name}
              </Heading>
              <Text color="gray.600" fontSize="sm" mb={4}>
                {product.description}
              </Text>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                width="full"
              >
                <Text fontWeight="semibold" fontSize="lg">
                  ${product.price}
                </Text>

                <Button
                  type="submit"
                  colorScheme="teal"
                  variant="outline"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
