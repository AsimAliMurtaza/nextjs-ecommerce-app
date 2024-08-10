import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box
      as="footer"
      bg="gray.100"
      py={{ base: 12, md: 16, lg: 20 }}
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
          <GridItem>
            <Heading as="h3" size="xl" color="green.600" mb={4}>
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

          <GridItem>
            <Heading as="h4" size="lg" mb={4}>
              Useful Links
            </Heading>
            <Box as="ul" color="gray.700" gap={2}>
              <Text as="li">
                <Link href="/">Home</Link>
              </Text>
              <Text as="li">
                <Link href="/about">About</Link>
              </Text>
              <Text as="li">
                <Link href="/blogs">Blogs</Link>
              </Text>
              <Text as="li">
                <Link href="/offers">Offers</Link>
              </Text>
              <Text as="li">
                <Link href="/search">Search</Link>
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Heading as="h4" size="lg" mb={4}>
              Quick Pages
            </Heading>
            <Box as="ul" color="gray.700" gap={2}>
              <Text as="li">
                <Link href="/account">My Account</Link>
              </Text>
              <Text as="li">
                <Link href="/orders">My Orders</Link>
              </Text>
              <Text as="li">
                <Link href="/wishlist">Wishlist</Link>
              </Text>
              <Text as="li">
                <Link href="/compare">Compare</Link>
              </Text>
              <Text as="li">
                <Link href="/faqs">FAQ&apos;s</Link>
              </Text>
              <Text as="li">
                <Link href="/contact">Contact Us</Link>
              </Text>
            </Box>
          </GridItem>

          <GridItem>
            <Heading as="h4" size="lg" mb={4}>
              Contact Us
            </Heading>
            <Text color="gray.700" mb={4}>
              <strong>Hotline 24/7:</strong> +1-555-186-5359
            </Text>
            <Text color="gray.700" mb={4}>
              <strong>Email Address:</strong> support@lmao.com
            </Text>
            <Heading as="h4" size="lg" mb={4}>
              Download App:
            </Heading>
            <Box
              sx={{
                display: "flex",
                gap: "1rem",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Link href="https://youtu.be/dQw4w9WgXcQ">
                Link to our android app
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
