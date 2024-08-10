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
            color="teal.500"
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
          <Link
            href="/categories/Clothing"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <ShirtIcon />
            <Text fontWeight="medium" mt={2}>
              Clothing
            </Text>
          </Link>
          <Link
            href="/categories/Electronics"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <LaptopIcon />
            <Text fontWeight="medium" mt={2}>
              Electronics
            </Text>
          </Link>
          <Link
            href="/categories/Home"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <HomeIcon />
            <Text fontWeight="medium" mt={2}>
              Home
            </Text>
          </Link>
          <Link
            href="/categories/Beauty"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <PaintbrushIcon />
            <Text fontWeight="medium" mt={2}>
              Beauty
            </Text>
          </Link>
          <Link
            href="/categories/Sports"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <ClubIcon />
            <Text fontWeight="medium" mt={2}>
              Sports
            </Text>
          </Link>
          <Link
            href="/categories/Outdoor"
            bg="white"
            borderRadius="lg"
            shadow="sm"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            p={4}
            _hover={{ bg: "teal.100", color: "teal.800" }}
            transition="background-color 0.2s ease, color 0.2s ease"
          >
            <CaravanIcon />
            <Text fontWeight="medium" mt={2}>
              Outdoor
            </Text>
          </Link>
        </Grid>
      </Container>
    </Box>
  );
}
