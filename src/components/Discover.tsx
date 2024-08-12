"use client";
import { Button, Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { Carousel } from "antd";
import Image from "next/image";
import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";

export default function Discover() {
  const router = useRouter();

  const images = [
    {
      src: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      alt: "Product Image 1",
      width: 400,
      height: 400,
    },
    {
      src: "https://i.ibb.co/bPmVXyP/black-converse.png",
      alt: "Product Image 2",
      width: 400,
      height: 400,
    },
  ];

  const handleClick = () => {
    router.push("/categories");
  };

  const handleShopClick = () => {
    router.push("/products");
  };

  return (
    <Box as="section" py={{ base: 20, md: 20, lg: 20 }} width="100%">
      <Container maxW="container.xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          gap={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flex="1">
            <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={4}>
              Discover the Best Products for Your Lifestyle
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} mb={6}>
              Browse our curated collection of top-rated products across various
              categories.
            </Text>
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Button
                type="submit"
                size="lg"
                colorScheme="teal"
                variant="outline"
                onClick={handleShopClick}
              >
                Shop Now
                <FaCartPlus style={{ marginLeft: "0.5rem" }} />
              </Button>
              <Button variant="outline" size="lg" onClick={handleClick}>
                Explore Categories
              </Button>
            </Flex>
          </Box>
          <Box
            justifyContent="center"
            alignItems="center"
            marginTop={{ base: 8, md: 8, lg: 0 }}
          >
            <Carousel
              autoplay
              style={{
                borderRadius: "1rem",
                overflow: "hidden",
                width: "300px",
                height: "300px",
              }}
            >
              {images.map((image, index) => (
                <div key={index}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </Carousel>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}
