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
import SHOP_DATA from "@/shop_data";
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

  useEffect(() => {
    // Filter products based on the search query
    const results = SHOP_DATA.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  }, [query]);

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
              className="block"
              prefetch={false}
            >
              <Box
                key={product.id}
                display="grid"
                gridTemplateColumns="80px 1fr"
                alignItems="center"
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
