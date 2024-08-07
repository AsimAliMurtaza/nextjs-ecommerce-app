import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Text,
  Image,
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
          {/* Company Info */}
          <GridItem>
            <Heading as="h3" size="xl" color="green.600" mb={4}>
              Ecommerce
            </Heading>
            <Text color="gray.700" mb={4}>
              Discover convenience redefined at our multipurpose store. From
              fresh groceries to the latest fashion trends, find everything you
              need under one roof. Your one-stop shopping destination for a
              diverse range of products.
            </Text>
            <Text color="gray.700" mb={2}>
              <strong>Address:</strong> 1418 Riverwood Drive, CA 96052, US
            </Text>
            <Text color="gray.700">
              <strong>Email:</strong> support@lalala.com
            </Text>
          </GridItem>

          {/* Useful Links */}
          <GridItem>
            <Heading as="h4" size="lg" mb={4}>
              Useful Links
            </Heading>
            <Box as="ul" color="gray.700" gap={2}>
              <Text as="li">
                <Link href="/">Home</Link>
              </Text>
              <Text as="li">
                <Link href="/collections">Collections</Link>
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

          {/* Quick Pages */}
          <GridItem>
            <Heading as="h4" size="lg" mb={4}>
              Quick Pages
            </Heading>
            <Box as="ul" color="gray.700" gap={2}>
              <Text as="li">
                <Link href="/my-account">My Account</Link>
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
                <Link href="/faqs">FAQ's</Link>
              </Text>
              <Text as="li">
                <Link href="/contact">Contact Us</Link>
              </Text>
            </Box>
          </GridItem>

          {/* Contact Us */}
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
              <Link href="#">
                <Image
                  src="https://storage.googleapis.com/pe-portal-consumer-prod-wagtail-static/images/visual-identity_badges_880x572-1.width-1440.format-webp.webp?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=wagtail%40pe-portal-consumer-prod.iam.gserviceaccount.com%2F20240719%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240719T063537Z&X-Goog-Expires=86400&X-Goog-SignedHeaders=host&X-Goog-Signature=9ea6ce8916bf14238bfd73b49419899fa9c97be9948cc9945b7b7f1359c3070863ef5f831f8492fbb3eeed6234df55c08fe46fddcff0b08cfd9fd15cbfacccb97c5c8a818becbff9b7eae7772f2497e6fde6822954e3df6a80af294520edaeda7eaae4811e628dfffbc1b8d28bc472c2ffce2ec1a3ba8c9aa7654bbd344cb49cf8733c5eb278406851cab1b649f49bdb293c4eafb02d81caba0f2efeffc695cc2c593d3f6d1a6495cedf0dd0198c717c5509e9d135340e9bde364d4295caafc54b58fabd2149ced40e2e6683bd25b8c0e92618732510226ebf5fddfc4ea5f2815b5961d2ae3e59dba64f3a9b9fb795295cbd9b50b5be6948ed333798a6f016d1"
                  alt="Get it on Google Play"
                  height="100"
                  width="100"
                />
              </Link>
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
