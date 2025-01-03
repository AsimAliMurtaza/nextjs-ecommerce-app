"use client";

import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
  FormControl,
  Avatar,
  Flex,
  useToast,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Container,
  HStack,
  VStack,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import SHOP_DATA from "@/transformed_data.json";
import { StarIcon } from "@/components/ui/icons";
import { useCart } from "@/contexts/cart-context";
import Footer from "@/components/Footer";

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

interface Params {
  params: {
    id: string;
  };
}

const ProductDetail: React.FC<Params> = ({ params }) => {
  const toast = useToast();
  const { id } = params;
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500); 
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productId = parseInt(id, 10);
        const response = await fetch(`/api/get-product`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productId }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setProduct(data);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("An error occurred while fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        imageUrl: product.imageUrl,
      },
      quantity
    );
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box as="section" width="100%">
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        p={4}
        mx="auto"
        templateRows="auto"
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            borderRadius: "lg",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <Skeleton
              borderRadius="lg"
              mt={{ base: 20, md: 20 }}
              width={{ base: "50%", md: "80%" }}
              height={{ base: "auto", md: "500px" }}
            />
          ) : (
            <Image
              src={product.imageUrl}
              alt={product.name}
              borderRadius="lg"
              mt={{ base: 20, md: 20 }}
              width={{ base: "50%", md: "80%" }}
              height={{ base: "auto", md: "500px" }}
              objectFit="cover"
            />
          )}
        </Box>
        <Box>
          {loading ? (
            <>
              <Skeleton
                height="32px"
                sx={{
                  mt: "80px",
                }}
                mb={4}
              />
              <Skeleton height="24px" mb={4} />
              <Skeleton height="24px" mb={4} />
              <Skeleton height="24px" mb={4} />
              <Skeleton height="20px" mb={4} />
              <Skeleton height="20px" mb={4} />
              <Skeleton height="20px" mb={4} />
              <Skeleton height="40px" />
            </>
          ) : (
            <Container
              maxW="container.lg"
              sx={{
                mt: "80px",
              }}
            >
              <Heading as="h1" size={{ base: "lg", md: "xl" }} mb={4}>
                {product.name}
              </Heading>
              {product.description && <Text mb={4}>{product.description}</Text>}
              <Flex align="center" mb={4}>
                <Text
                  fontSize={{ base: "xl", md: "2xl" }}
                  fontWeight="bold"
                  mr={4}
                >
                  ${product.price}
                </Text>
              </Flex>
              <form>
                {product.category === "Clothing" && (
                  <>
                    <FormControl id="color" mb={4}>
                      <FormLabel>Color</FormLabel>
                      <RadioGroup defaultValue="black">
                        <Stack spacing={2} direction="row">
                          {["black", "white", "blue"].map((color) => (
                            <Radio key={color} value={color} colorScheme="blue">
                              {color.charAt(0).toUpperCase() + color.slice(1)}
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    <FormControl id="size" mb={4}>
                      <FormLabel>Size</FormLabel>
                      <RadioGroup defaultValue="m">
                        <Stack spacing={2} direction="row">
                          {["xs", "s", "m", "l", "xl"].map((size) => (
                            <Radio key={size} value={size} colorScheme="blue">
                              {size.toUpperCase()}
                            </Radio>
                          ))}
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                  </>
                )}
                <Flex align="center" mb={4}>
                  <Text>
                    Stock: {loading ? <Skeleton width="50px" /> : product.stock}
                  </Text>
                </Flex>
                <FormControl id="quantity" mb={4}>
                  <FormLabel>Quantity</FormLabel>
                  {loading ? (
                    <Skeleton height="30px" />
                  ) : (
                    <>
                      <Slider
                        defaultValue={1}
                        min={1}
                        max={product.stock}
                        step={1}
                        onChangeEnd={(val) => handleQuantityChange(val)}
                      >
                        <SliderTrack>
                          <SliderFilledTrack />
                        </SliderTrack>
                        <SliderThumb />
                      </Slider>
                      <Text mt={2}>Quantity: {quantity}</Text>
                    </>
                  )}
                </FormControl>
                <VStack spacing={6} align="left">
                  <HStack spacing={10}>
                    {loading ? (
                      <Skeleton height="40px" width="100px" />
                    ) : (
                      <Button colorScheme="teal" onClick={handleAddToCart}>
                        Buy
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </form>
            </Container>
          )}
        </Box>
      </Grid>

      <Box
        gridColumn={{ base: "1 / -1", md: "span 2" }}
        mt={{ base: 6, md: 0 }}
      >
        <Container
          maxW="container.lg"
          display="flex"
          flexDirection="column"
          marginTop="40px"
          marginBottom="40px"
        >
          <Heading as="h3" size="lg" mb={6} color="black">
            Product Specifications
          </Heading>
          <Box
            mb={6}
            sx={{
              border: "1px solid",
              borderColor: "gray.200",
              borderRadius: "md",
            }}
          >
            {loading ? (
              <Skeleton height="250px" />
            ) : (
              <Container maxW="container.lg" p={4}>
                <Box>
                  <Text fontWeight="bold" color="gray.700" mb={2}>
                    Material
                  </Text>
                  <Text color="gray.600">
                    {product.specifications.material}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700" mb={2}>
                    Sleeve Length
                  </Text>
                  <Text color="gray.600">
                    {product.specifications.sleeveLength}
                  </Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700" mb={2}>
                    Fit
                  </Text>
                  <Text color="gray.600">{product.specifications.fit}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold" color="gray.700" mb={2}>
                    Care Instructions
                  </Text>
                  <Text color="gray.600">
                    {product.specifications.careInstructions}
                  </Text>
                </Box>
              </Container>
            )}
          </Box>
        </Container>

        <Container
          maxW="container.lg"
          display="flex"
          flexDirection="column"
          marginTop="40px"
        >
          <Heading as="h3" size="lg" mb={6} color="gray.700">
            Customer Reviews
          </Heading>
          {loading ? (
            <>
              <Skeleton height="100px" mb={4} />
              <Skeleton height="100px" mb={4} />
              <Skeleton height="100px" mb={4} />
            </>
          ) : (
            product.reviews.map((review, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="md"
                p={4}
                mb={4}
                bg="white"
                shadow="sm"
              >
                <Flex align="center" mb={4}>
                  <Avatar name={review.name} src="/placeholder-user.jpg" />
                  <Box ml={4} flex="1">
                    <Flex align="center" mb={2}>
                      <Heading as="h4" size="md" mr={2} color="gray.700">
                        {review.name}
                      </Heading>
                      <Text fontSize="sm" color="gray.500" mr={2}>
                        {review.date}
                      </Text>
                      <Flex ml="auto">
                        {[...Array(5)].map((_, starIndex) => (
                          <StarIcon
                            key={starIndex}
                            color={
                              starIndex < review.rating
                                ? "yellow.500"
                                : "gray.300"
                            }
                          />
                        ))}
                      </Flex>
                    </Flex>
                    <Text fontSize="sm" color="gray.600">
                      {review.comment}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            ))
          )}
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetail;
