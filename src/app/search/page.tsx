"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Spinner,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";

interface Product {
    id: number;
  name: string;
  description: string;
  imageUrl: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const fetchProducts = async () => {
        setLoading(true);
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      };
      fetchProducts();
    }
  }, [query]);

  return (
    <Box p={4} maxW="800px" mx="auto">
      <Heading as="h1" size="lg" mb={4} textAlign="center">
        Search Results for &quot;{query}&quot;
      </Heading>

      {loading ? (
        <Flex justify="center" align="center" h="200px">
          <Spinner size="lg" />
        </Flex>
      ) : products.length > 0 ? (
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {products.map((product: Product) => (
            <LinkBox
              key={product.id}
              as="article"
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              backgroundColor="white"
              boxShadow="md"
              _hover={{ boxShadow: "lg" }}
              transition="box-shadow 0.2s"
            >
              <NextLink href={`/products/${product.id}`} passHref>
                <LinkOverlay>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    mb={4}
                    borderRadius="md"
                    objectFit="cover"
                    height="200px"
                    width="100%"
                  />
                  <Heading as="h2" size="md" mb={2}>
                    {product.name}
                  </Heading>
                  <Text color="gray.600" noOfLines={2}>
                    {product.description}
                  </Text>
                </LinkOverlay>
              </NextLink>
            </LinkBox>
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="lg" color="gray.500" textAlign="center">
          No products found.
        </Text>
      )}
    </Box>
  );
};

export default SearchPage;
