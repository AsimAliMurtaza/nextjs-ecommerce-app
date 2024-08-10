import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  Stack,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.100"
      py={{ base: 8, md: 12, lg: 16 }}
      width="100%"
    >
      <Container maxW="container.xl">
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(4, 1fr)",
          }}
          gap={8}
        >
          {/* About Section */}
          <GridItem>
            <Heading as="h3" size="lg" color="green.600" mb={4}>
              Ecommerce
            </Heading>
            <Text color="gray.700" mb={4}>
              Discover convenience redefined at our multipurpose store. You can
              find everything you need under one roof. Your one-stop shopping
              destination for a diverse range of products.
            </Text>
            <Text color="gray.700" mb={2}>
              <strong>Address:</strong> 1234 Street Name, City, Country
            </Text>
            <Text color="gray.700">
              <strong>Email:</strong> support@lalala.com
            </Text>
          </GridItem>

          {/* Useful Links Section */}
          <GridItem>
            <Heading as="h4" size="md" mb={4}>
              Useful Links
            </Heading>
            <Stack spacing={2} color="gray.700">
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/offers">Offers</Link>
              <Link href="/search">Search</Link>
            </Stack>
          </GridItem>

          {/* Quick Pages Section */}
          <GridItem>
            <Heading as="h4" size="md" mb={4}>
              Quick Pages
            </Heading>
            <Stack spacing={2} color="gray.700">
              <Link href="/account">My Account</Link>
              <Link href="/orders">My Orders</Link>
              <Link href="/wishlist">Wishlist</Link>
              <Link href="/compare">Compare</Link>
              <Link href="/faqs">FAQ's</Link>
              <Link href="/contact">Contact Us</Link>
            </Stack>
          </GridItem>

          {/* Contact Us Section */}
          <GridItem>
            <Heading as="h4" size="md" mb={4}>
              Contact Us
            </Heading>
            <Text color="gray.700" mb={4}>
              <strong>Hotline 24/7:</strong> +1-555-186-5359
            </Text>
            <Text color="gray.700" mb={4}>
              <strong>Email Address:</strong> support@lmao.com
            </Text>
            <Heading as="h4" size="md" mb={4}>
              Download App:
            </Heading>
            <Link color="teal.500" href="https://youtu.be/dQw4w9WgXcQ">
              Link to our android app
            </Link>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
