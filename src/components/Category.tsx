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
import {
  LaptopIcon,
  ClubIcon,
  CaravanIcon,
  PaintbrushIcon,
  ShirtIcon,
  HomeIcon,
} from "./ui/icons";

// Example of category data
const categories = [
  {
    name: "Shoes",
    href: "/categories/Shoes",
    icon: ShirtIcon,
  },
  {
    name: "Hats",
    href: "/categories/Hats",
    icon: LaptopIcon,
  },
  {
    name: "Home",
    href: "/categories/home",
    icon: HomeIcon,
  },
  {
    name: "Beauty",
    href: "/categories/beauty",
    icon: PaintbrushIcon,
  },
  {
    name: "Sports",
    href: "/categories/sports",
    icon: ClubIcon,
  },
  {
    name: "Outdoor",
    href: "/categories/outdoor",
    icon: CaravanIcon,
  },
];

export default function Category() {
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
              <category.icon />
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
