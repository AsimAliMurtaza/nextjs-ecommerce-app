"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Button,
  Container,
  Flex,
  Grid,
  Box,
  Image,
  Heading,
  Text,
} from "@chakra-ui/react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { LayoutGridIcon } from "@/components/ui/icons";
import { LayoutListIcon } from "lucide-react";

interface Product {
  id: number; // Use _id for MongoDB documents
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
  date?: string;
  stock: number;
  onSale: boolean;
  featured: boolean;
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Clear previous errors
        const response = await fetch(`/api/categories/${category}`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (isMounted) {
          setProducts(data.products); // Updated to match the API response structure
        }
      } catch (err) {
        if (isMounted) {
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    if (category) {
      fetchProducts();
    }

    return () => {
      isMounted = false;
    };
  }, [category]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <Container maxW="container.xl" py={20}>
      <Flex direction="column" mb={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Heading as="h2" size="lg">
            {category}
          </Heading>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                colorScheme="teal"
                size="sm"
                rightIcon={
                  viewMode === "grid" ? <LayoutGridIcon /> : <LayoutListIcon />
                }
              >
                View
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>View as</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                onClick={() => setViewMode("grid")}
                checked={viewMode === "grid"}
              >
                <LayoutGridIcon />
                Grid
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                onClick={() => setViewMode("list")}
                checked={viewMode === "list"}
              >
                <LayoutListIcon />
                List
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Flex>
        {products.length === 0 ? (
          <Text>No products found in this category.</Text>
        ) : (
          <Grid
            templateColumns={
              viewMode === "grid"
                ? {
                    base: "repeat(2, 1fr)",
                    sm: "repeat(3, 1fr)",
                    md: "repeat(4, 1fr)",
                    lg: "repeat(5, 1fr)",
                  }
                : "1fr"
            }
            gap={6}
          >
            {products.map((product) => (
              <Box
                key={product.id} // Use _id as the key
                bg="white"
                borderRadius="md"
                boxShadow="md"
                display={viewMode === "list" ? "flex" : "block"}
                flexDirection={viewMode === "list" ? "row" : "column"}
                overflow="hidden"
              >
                <Link href={`/products/${product.id}`} passHref>
                  <Box flexShrink={0}>
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={viewMode === "list" ? 150 : 300}
                      height={viewMode === "list" ? 150 : 300}
                      objectFit="cover"
                    />
                  </Box>
                  <Box p={4} flex="1">
                    <Heading as="h3" size="md" mb={2}>
                      {product.name}
                    </Heading>
                    {viewMode === "list" && (
                      <Text color="gray.600" mb={4}>
                        {product.description}
                      </Text>
                    )}
                    <Flex direction="column" align="center">
                      <Text fontWeight="bold" mb={2}>
                        ${product.price}
                      </Text>
                      <Button size="sm" variant="outline">
                        Add to Cart
                      </Button>
                    </Flex>
                  </Box>
                </Link>
              </Box>
            ))}
          </Grid>
        )}
      </Flex>
    </Container>
  );
}
