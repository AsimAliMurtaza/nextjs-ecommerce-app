"use client";

import { Container, Heading, Text, Button, Box, useBreakpointValue, Stack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaTimesCircle } from "react-icons/fa"; // Error icon for visual impact

const CancelPage: React.FC = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleGoBackToShopping = () => {
    router.push("/products"); // Redirect back to the products page
  };

  const handleTryAgain = () => {
    router.push("/checkout"); // Redirect to the checkout page to try payment again
  };

  return (
    <Container maxW="container.md" py={{ base: 16, lg: 32 }} textAlign="center">
      <Box
        p={{ base: 6, lg: 12 }}
        bg="red.50"
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="500px"
        margin="auto"
      >
        <Stack spacing={4} align="center">
          {/* Icon for visual impact */}
          <Icon as={FaTimesCircle} color="red.600" w={12} h={12} />

          <Heading as="h2" size="xl" mb={4} color="red.600">
            Payment Cancelled
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" mb={6}>
            Unfortunately, your payment was not completed. You can either try again or continue shopping.
          </Text>

          <Stack direction={{ base: "column", md: "row" }} spacing={4} w="full" justify="center">
            {/* Button to go back to shopping */}
            <Button
              colorScheme="teal"
              size={isMobile ? "lg" : "md"}
              onClick={handleGoBackToShopping}
              width="full"
              variant="outline"
            >
              Continue Shopping
            </Button>

            {/* Button to retry payment */}
            <Button
              colorScheme="red"
              size={isMobile ? "lg" : "md"}
              onClick={handleTryAgain}
              width="full"
              variant="solid"
            >
              Try Again
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default CancelPage;
