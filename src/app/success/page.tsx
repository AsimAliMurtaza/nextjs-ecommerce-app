"use client";

import { Container, Heading, Text, Button, Box, useBreakpointValue, Stack, Icon } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FaCheckCircle } from "react-icons/fa"; // Success checkmark icon for visual impact

const SuccessPage: React.FC = () => {
  const router = useRouter();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const handleGoToHome = () => {
    router.push("/"); // Redirect to the home page after success
  };

  return (
    <Container maxW="container.md" py={{ base: 16, lg: 32 }} textAlign="center">
      <Box
        p={{ base: 6, lg: 12 }}
        bg="teal.50"
        borderRadius="lg"
        boxShadow="lg"
        maxWidth="500px"
        margin="auto"
      >
        <Stack spacing={4} align="center">
          {/* Icon for visual impact */}
          <Icon as={FaCheckCircle} color="teal.600" w={12} h={12} />

          <Heading as="h2" size="xl" mb={4} color="teal.600">
            Payment Successful!
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" mb={6}>
            Thank you for your purchase! Your order has been successfully processed.
          </Text>

          <Button
            colorScheme="teal"
            size={isMobile ? "lg" : "md"}
            onClick={handleGoToHome}
            width="full"
            variant="solid"
          >
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SuccessPage;
