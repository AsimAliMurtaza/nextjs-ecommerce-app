"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FilterIcon, LayoutGridIcon } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { LayoutList } from "lucide-react";
import Image from "next/image";
import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Button,
  Text,
  Stack,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Checkbox,
} from "@chakra-ui/react";
import Loader from "@/components/ui/loader";

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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState({
    featured: false,
    onSale: false,
    inStock: false,
    priceLowToHigh: false,
    priceHighToLow: false,
    newest: false,
    oldest: false,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        if (isMounted) {
          setProducts(data);
          setError(null); // Clear any previous errors
        }
      } catch (err) {
        if (isMounted) {
          console.error("Failed to fetch products:", err);
          setError("Failed to load products. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Ensure loading is set to false even if an error occurs
        }
      }
    };

    fetchProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={20}>
        <Heading as="h1" size="xl" textAlign="center" color="red.500">
          {error}
        </Heading>
      </Container>
    );
  }
  const applyFilters = (products: Product[]) => {
    let filteredProducts = products;

    if (filters.featured) {
      filteredProducts = filteredProducts.filter((product) => product.featured);
    }
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.onSale);
    }
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter(
        (product) => product.stock > 0
      );
    }

    if (filters.priceLowToHigh) {
      filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
    } else if (filters.priceHighToLow) {
      filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
    }

    if (filters.newest) {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(b.date ?? "").getTime() - new Date(a.date ?? "").getTime()
      );
    } else if (filters.oldest) {
      filteredProducts = filteredProducts.sort(
        (a, b) =>
          new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime()
      );
    }

    return filteredProducts;
  };

  const filteredProducts = applyFilters(products);

  return (
    <Container maxW="container.xl" py={{ base: 8, md: 12, lg: 16 }}>
      <main>
        <Box py={{ base: 8, md: 12, lg: 10 }} borderRadius="md">
          <Flex
            direction={{ base: "row", md: "row" }}
            justify="space-between"
            align="center"
            border="1px solid #e2e8f0"
            borderRadius="md"
            p={4}
            mb={4}
            shadow={"md"}
          >
            <Heading as="h2" size="lg">
              All Products
            </Heading>
            <Flex gap={4} align="right">
              <Button
                variant="ghost"
                colorScheme="teal"
                size="sm"
                onClick={onOpen}
              >
                <FilterIcon />
                Filter
              </Button>
              <Button
                variant="ghost"
                colorScheme="teal"
                size="sm"
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "list" : "grid")
                }
              >
                {viewMode === "grid" ? (
                  <>
                    <LayoutList />
                    List
                  </>
                ) : (
                  <>
                    <LayoutGridIcon />
                    Grid
                  </>
                )}
              </Button>
            </Flex>
          </Flex>

          <Grid
            templateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={6}
            templateRows={{ base: "auto", lg: "1fr" }}
            alignItems="start"
            display={viewMode === "grid" ? "grid" : "flex"}
            flexDirection={viewMode === "list" ? "column" : "row"}
          >
            {filteredProducts.length === 0 ? (
              <Text>No products found.</Text>
            ) : (
              filteredProducts.map((product) => (
                <Box
                  key={product.id}
                  bg="white"
                  borderRadius="md"
                  boxShadow="md"
                  overflow="hidden"
                  width={viewMode === "list" ? "100%" : "auto"}
                  height={viewMode === "list" ? "auto" : "100%"}
                  display="flex"
                  flexDirection={viewMode === "list" ? "row" : "column"}
                >
                  <Link href={`/products/${product.id}`}>
                    <Flex
                      direction={viewMode === "list" ? "row" : "column"}
                      align="center"
                      p={4}
                    >
                      {viewMode === "list" && (
                        <Box flexShrink={0} mr={4}>
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={200}
                            height={200}
                            objectFit="cover"
                          />
                        </Box>
                      )}
                      <Box
                        display="flex"
                        flexDirection="column"
                        textAlign={viewMode === "list" ? "left" : "center"}
                        flex={1}
                      >
                        {viewMode === "grid" && (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={200}
                            height={200}
                            objectFit="cover"
                          />
                        )}
                        <Heading as="h3" size="md" mb={2}>
                          {product.name}
                        </Heading>
                        <Text mb={2} color="gray.600">
                          {product.description}
                        </Text>
                        <Flex direction="column" align="center" mt={4}>
                          <Text fontWeight="bold" mb={2}>
                            ${product.price}
                          </Text>
                          <Button
                            size="sm"
                            bg="teal.500"
                            color="white"
                            _hover={{ bg: "teal.600" }}
                          >
                            Buy
                          </Button>
                        </Flex>
                      </Box>
                    </Flex>
                  </Link>
                </Box>
              ))
            )}
          </Grid>
        </Box>

        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Filter by</DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        featured: e.target.checked,
                      }))
                    }
                  >
                    Featured
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        onSale: e.target.checked,
                      }))
                    }
                  >
                    On Sale
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        inStock: e.target.checked,
                      }))
                    }
                  >
                    In Stock
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceLowToHigh: e.target.checked,
                      }))
                    }
                  >
                    Price: Low to High
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        priceHighToLow: e.target.checked,
                      }))
                    }
                  >
                    Price: High to Low
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        newest: e.target.checked,
                      }))
                    }
                  >
                    Newest
                  </Checkbox>
                  <Checkbox
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        oldest: e.target.checked,
                      }))
                    }
                  >
                    Oldest
                  </Checkbox>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </main>
    </Container>
  );
}
