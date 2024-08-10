// src/app/search/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Stack,
  Heading,
  Text,
  Image,
  Flex,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

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

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const products: Product[] = await response.json();

        const results = products.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(results);
      } catch (error) {
        setError("An error occurred while fetching products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Container maxW="container.xl" py={20}>
      <Heading as="h2" size="xl" mb={6}>
        Search Results
      </Heading>
      {filteredProducts.length > 0 ? (
        <Stack spacing={4}>
          {filteredProducts.map((product) => (
            <Link
              href={`/products/${product.id}`}
              key={product.id} // Move key here to avoid React key warnings
              className="block"
              prefetch={false}
            >
              <Box
                display="grid"
                alignItems="center"
                gridTemplateColumns="80px 1fr"
                gap={4}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                bg="white"
                shadow="md"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  boxSize="80px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <Flex direction="column" ml={4}>
                  <Heading as="h3" size="md" mb={2}>
                    {product.name}
                  </Heading>
                  <Text fontSize="lg" color="gray.600">
                    ${product.price.toFixed(2)}
                  </Text>
                  <Button colorScheme="blue" mt={2}>
                    View Details
                  </Button>
                </Flex>
              </Box>
            </Link>
          ))}
        </Stack>
      ) : (
        <Text>No products found for "{query}".</Text>
      )}
    </Container>
  );
};

export default SearchPage;
