"use client";
import { useRouter } from "next/navigation";
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
  Select,
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
} from "@chakra-ui/react";
import { useState } from "react";
import SHOP_DATA from "@/shop_data"; // Adjust the path according to your project structure
import { StarIcon } from "@/components/ui/icons"; // Use Chakra UI's built-in star icon
import { useCart } from "@/contexts/cart-context"; // Import the custom hook

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
  const router = useRouter();
  const toast = useToast();
  const { id } = params;
  const { addToCart } = useCart();

  const productId = parseInt(id, 10);
  const product = SHOP_DATA.find(
    (product: Product) => product.id === productId
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(
      { id: product.id, name: product.name, price: product.price, quantity },
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

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
  };

  return (
    <Container maxW="container.xl" py={20}>
      <Grid
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={6}
        p={4}
        maxW="6xl"
        mx="auto"
        alignItems="start"
      >
        <Box>
          <Image
            src={product.imageUrl}
            alt={product.name}
            borderRadius="lg"
            boxSize="450px" // Fixed size for the image
            objectFit="cover"
          />
        </Box>
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            {product.name}
          </Heading>
          {product.description && <Text mb={4}>{product.description}</Text>}
          <Flex align="center" mb={4}>
            <Text fontSize="2xl" fontWeight="bold" mr={4}>
              ${product.price}
            </Text>
          </Flex>
          <form>
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
            <Flex align="center" mb={4}>
              <Text>Stock: {product.stock}</Text>
            </Flex>
            <FormControl id="quantity" mb={4}>
              <FormLabel>Quantity</FormLabel>
              <Slider
                defaultValue={1}
                min={1}
                max={product.stock} // Limiting the max to available stock
                step={1}
                onChangeEnd={handleQuantityChange} // Using onChangeEnd to ensure it updates once
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Text mt={2}>Quantity: {quantity}</Text>
            </FormControl>
            <VStack spacing={6} align="left">
              <HStack spacing={10}>
                <Button colorScheme="teal" onClick={handleAddToCart}>
                  Buy
                </Button>
                <Button colorScheme="blue" onClick={() => router.push("/cart")}>
                  Go to Cart
                </Button>
                <Button variant="outline" onClick={() => router.back()}>
                  Go Back
                </Button>
              </HStack>
            </VStack>
          </form>
        </Box>
        <Box gridColumn="span 2">
          <Container
            maxW="container.xl"
            display="flex"
            flexDirection="column"
            marginTop="40px" // Ensure there's space above the newsletter section
            marginBottom="40px" // Ensure there's space below the newsletter section
          >
            <Heading as="h3" size="lg" mb={6} color="black">
              Product Specifications
            </Heading>
            <Grid
              templateColumns="1fr 2fr"
              gap={6}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg="white"
              shadow="sm"
            >
              <Box>
                <Text fontWeight="bold" color="gray.700" mb={2}>
                  Material
                </Text>
                <Text color="gray.600">{product.specifications.material}</Text>
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
            </Grid>
          </Container>

          <Container
            maxW="container.xl"
            display="flex"
            flexDirection="column"
            marginTop="40px" // Ensure there's space above the newsletter section
          >
            <Heading as="h3" size="lg" mb={6} color="gray.700">
              Customer Reviews
            </Heading>
            {product.reviews.map((review, index) => (
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
                            boxSize={5} // Adjust size if needed
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
            ))}
          </Container>
          <Container
            maxW="container.xl"
            display="flex"
            flexDirection="column"
            marginTop="40px" // Ensure there's space above the newsletter section
          >
            <Heading as="h3" size="lg" mb={6} color="gray.700">
              Subscribe to Our Newsletter
            </Heading>
            <Box
              borderWidth="1px"
              borderRadius="md"
              p={4}
              bg="white"
              shadow="sm"
            >
            </Box>
          </Container>
        </Box>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
