"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button, Container, Flex, Grid, Heading, Box, Image, Text, useBreakpointValue, useDisclosure, IconButton, Skeleton, SkeletonText } from "@chakra-ui/react";
import { LayoutGridIcon, LayoutListIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

interface CategoryDetails {
  [category: string]: {
    imageUrl: string;
    description: string;
  };
}

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
        setCategoryDetails(data.categoryDetails);
      } catch (error) {
        setError('An error occurred while fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.xl" py={20}>
        <Flex direction="column" align="center" mb={8}>
          <Heading as="h2" size="lg" mb={4}>Categories</Heading>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" colorScheme="teal" rightIcon={viewMode === "grid" ? <LayoutGridIcon /> : <LayoutListIcon />}>
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
        <Grid
          templateColumns={viewMode === "grid" ? { base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" } : "1fr"}
          gap={6}
          mb={8}
        >
           {Array.from({ length: 10 }).map((_, index) => (
            <Box
              key={index}
              bg="white"
              borderRadius="md"
              overflow="hidden"
              boxShadow="md"
              display={viewMode === "list" ? "flex" : "block"}
              flexDirection={viewMode === "list" ? "row" : "column"}
            >
              <Skeleton height={viewMode === "list" ? 150 : 300} width={viewMode === "list" ? 150 : 300} />
              <Box p={4} flex="1">
                <SkeletonText noOfLines={2} spacing="4" />
              </Box>
            </Box>
          ))}
        </Grid>
      </Container>
    );
  }

  if (error) return <Text>{error}</Text>;

  return (
    <Container maxW="container.xl" py={20}>
      <Flex direction="column" align="center" mb={8}>
        <Heading as="h2" size="lg" mb={4}>Categories</Heading>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" colorScheme="teal" rightIcon={viewMode === "grid" ? <LayoutGridIcon /> : <LayoutListIcon />}>
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
      <Grid
        templateColumns={viewMode === "grid" ? { base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)", lg: "repeat(5, 1fr)" } : "1fr"}
        gap={6}
        mb={8}
      >
        {categories.map((category) => (
          <Box
            key={category}
            bg="white"
            borderRadius="md"
            overflow="hidden"
            boxShadow="md"
            display={viewMode === "list" ? "flex" : "block"}
            flexDirection={viewMode === "list" ? "row" : "column"}
            _hover={{ shadow: "md", cursor: "pointer", transform: "scale(1.04)", transition: "all 0.2s ease-in-out" }}
          >
            <Link href={`/categories/${category}`} passHref>
              <Box flexShrink={0}>
                <Image
                  src={categoryDetails[category]?.imageUrl || "/placeholder.svg"}
                  alt={category}
                  width={viewMode === "list" ? 150 : 300}
                  height={viewMode === "list" ? 150 : 300}
                  objectFit="cover"
                />
              </Box>
              <Box p={4} flex="1">
                <Heading as="h3" size="md" mb={2}>{category}</Heading>
                <Text color="gray.600">
                  {categoryDetails[category]?.description || "Description not available"}
                </Text>
              </Box>
            </Link>
          </Box>
        ))}
      </Grid>
    </Container>
  );
}
