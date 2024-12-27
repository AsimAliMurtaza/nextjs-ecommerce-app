"use client";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

interface CategoryDetail {
  imageUrl: string;
  description: string;
}

interface CategoryData {
  name: string;
  href: string;
  imageUrl: string;
  description: string;
}

export default function Category() {
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        const combinedCategories = data.categories.map(
          (categoryName: string) => {
            const details: CategoryDetail = data.categoryDetails[categoryName];
            return {
              name: categoryName,
              href: `/categories/${categoryName}`, 
              imageUrl: details.imageUrl,
              description: details.description,
            };
          }
        );

        setCategories(combinedCategories);
      } catch (error) {
        setError("An error occurred while fetching categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text color="red.500">{error}</Text>;
  }

  return (
    <Box as="section" py={{ base: 12, md: 16, lg: 20 }} width="100%">
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between" mb={8}>
          <Heading as="h2" size={{ base: "lg", md: "xl" }} fontWeight="bold">
            Shop by Category
          </Heading>
          <Link
            href="/categories"
            color="#59B9B7"
            fontWeight="medium"
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
            lg: "repeat(6, 1fr)",
          }}
          gap={6}
        >
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              bg="white"
              borderRadius="lg"
              shadow="sm"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              _hover={{ bg: "#59B9B7", color: "white" }}
              transition="background-color 0.2s ease, color 0.2s ease"
            >
              <img
                src={category.imageUrl}
                alt={category.name}
                style={{
                  maxWidth: "60px",
                  height: "auto",
                  marginBottom: "10px",
                }}
              />
              <Text fontWeight="medium" mt={2}>
                {category.name}
              </Text>
            </Link>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
