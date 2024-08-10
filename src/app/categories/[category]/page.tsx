"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
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
import SHOP_DATA from "@/shop_data";
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
}

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = SHOP_DATA.filter(
    (product) => product.category === category
  );

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
        {filteredProducts.length === 0 ? (
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
            {filteredProducts.map((product) => (
              <Box
                key={product.id}
                bg="white"
                borderRadius="md"
                boxShadow="md"
                display={viewMode === "list" ? "flex" : "block"}
                flexDirection={viewMode === "list" ? "row" : "column"}
                overflow="hidden"
              >
                <Link href={`/products/${product.id}`} passHref>
                  <a>
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
                  </a>
                </Link>
              </Box>
            ))}
          </Grid>
        )}
      </Flex>
    </Container>
  );
}
