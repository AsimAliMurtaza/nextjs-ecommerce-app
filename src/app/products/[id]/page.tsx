"use client";

import { useRouter } from "next/navigation"; // Updated import
import {
  Container,
  Box,
  Image,
  Text,
  Heading,
  VStack,
  Button,
  HStack,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
} from "@chakra-ui/react";
import SHOP_DATA from "@/shop_data"; // Adjust the path according to your project structure
import { useState } from "react";

// Define the type for product data
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string;
  category: string;
}

// Define the type for the params object
interface Params {
  params: {
    id: string;
  };
}

// Product detail component
const ProductDetail: React.FC<Params> = ({ params }) => {
  const router = useRouter();
  const toast = useToast();
  const { id } = params;

  // Convert id to number
  const productId = parseInt(id, 10);

  // Find the product based on the parsed id
  const product = SHOP_DATA.find(
    (product: Product) => product.id === productId
  );

  if (!product) {
    return <div>Product not found</div>; // Or handle as needed
  }

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={20} centerContent>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        border={0}
        p={6}
        textAlign="center"
        w="full"
      >
        <VStack spacing={6} align="center">
          <Heading as="h1" size="xl">
            {product.name}
          </Heading>
          <Image src={product.imageUrl} alt={product.name} borderRadius="md" />
          <Text fontSize="md">{product.description}</Text>
          <Text fontSize="2xl" fontWeight="bold">
            Price: ${product.price}
          </Text>

          <HStack spacing={4} align="center">
            <Text>Quantity:</Text>
            <Slider
              aria-label="quantity-slider"
              defaultValue={1}
              min={1}
              max={10}
              step={1}
              value={quantity}
              onChange={(val) => setQuantity(val)}
              w="300px"
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
              <SliderMark value={1} mt="1" ml="-2.5" fontSize="sm">
                1
              </SliderMark>
              <SliderMark value={10} mt="1" ml="-2.5" fontSize="sm">
                10
              </SliderMark>
            </Slider>
          </HStack>

          <HStack spacing={4}>
            <Button colorScheme="teal" onClick={handleAddToCart}>
              Buy
            </Button>
            <Button colorScheme="blue" onClick={() => router.push("/cart")}>
              Go to Cart
            </Button>
          </HStack>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default ProductDetail;
