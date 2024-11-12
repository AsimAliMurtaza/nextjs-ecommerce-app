"use client";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  Link,
} from "@chakra-ui/react";

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
const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await fetch("/api/products");

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data: Product[] = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error; // Re-throw the error so it can be handled by the caller
  }
};

const getTopProducts = (products: Product[]) => {
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
    <Box as="section" width="100%">
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <Flex direction="row" align="center" justify="space-between" mb={8}>
          <Heading as="h2" size={{ base: "lg", md: "xl" }} fontWeight="bold">
            Top Products
          </Heading>
          <Link
            href="/products"
            color="#59B9B7"
            _hover={{ textDecoration: "underline" }}
          >
            View All
          </Link>
        </Flex>
        <Grid
          templateColumns={{
            base: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
            md: "repeat(4, 1fr)",
            lg: "repeat(5, 1fr)",
          }}
          gap={6}
        >
          {topProducts.map((product) => (
            <Box
              key={product.id}
              bg="white"
              borderRadius="lg"
              shadow="sm"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              border="1px solid #e2e8f0"
              p={4}
              _hover={{
                shadow: "md",
                cursor: "pointer",
                transform: "scale(1.04)",
                transition: "all 0.2s ease-in-out",
              }}
            >
              <Link href={`/products/${product.id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  borderRadius="md"
                  objectFit="cover"
                  width="100%"
                  height={{ base: "auto", sm: "200px" }}
                />
                <Box mt={4}>
                  <Heading as="h3" size="md" mb={2} fontWeight="semibold">
                    {product.name}
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    {product.description}
                  </Text>
                </Box>
                <Text mt={2} fontSize="sm" fontWeight="thin" textAlign="center">
                  Avg Rating:{" "}
                  {calculateAverageRating(product.reviews).toFixed(1)}
                </Text>
              </Link>
              <Flex direction="column" align="center" mt={4}>
                <Text fontSize="lg" fontWeight="semibold" mb={2}>
                  ${product.price}
                </Text>
                <Button
                  size="sm"
                  color="white"
                  onClick={() => handleOnClick(product.id)}
                >
                  Buy
                </Button>
              </Flex>
            </Box>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
