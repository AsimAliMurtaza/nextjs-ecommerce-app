"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  Stack,
  Spinner,
  useBreakpointValue,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaCheckCircle } from "react-icons/fa";

interface Transaction {
  receiptId: string;
  totalAmount: number;
}

const SuccessPage = () => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useBreakpointValue({ base: true, lg: false });
  const toast = useToast();

  useEffect(() => {
    const fetchTransaction = async () => {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );
      if (!sessionId) return;

      try {
        // Call your API to fetch session details
        const res = await fetch(
          `/api/get-session-details?sessionId=${sessionId}`
        );
        const data = await res.json();

        if (data.success) {
          setTransaction(data.transaction);
        } else {
          toast({
            title: "Error",
            description:
              "Could not fetch transaction details. Please try again later.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error fetching transaction details:", error);
        toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [toast]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" color="teal.400" />
      </Container>
    );
  }

  if (!transaction) {
    return (
      <Container centerContent>
        <Text color="gray.600" fontSize="lg">
          Transaction details not found. Please try again.
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={{ base: 16, lg: 32 }} textAlign="center">
      <Box
        p={{ base: 6, lg: 12 }}
        bg="teal.50"
        borderRadius="lg"
        boxShadow="xl"
        maxWidth="500px"
        margin="auto"
        transition="all 0.3s ease"
        _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
      >
        <Stack spacing={6} align="center">
          <Icon as={FaCheckCircle} color="teal.600" w={20} h={20} />

          <Heading as="h2" size="xl" mb={4} color="teal.600" fontWeight="bold">
            Payment Successful!
          </Heading>

          <Text fontSize={{ base: "lg", md: "xl" }} color="gray.600" mb={6}>
            Thank you for your purchase! Your order has been successfully
            processed.
          </Text>

          <Box mb={6} textAlign="left">
            <Text fontSize="md" color="gray.700" fontWeight="medium">
              Receipt ID:{transaction.receiptId}
            </Text>
            <Text fontSize="md" color="gray.700" fontWeight="medium">
              Total Amount:{" "}
              <span style={{ fontWeight: "bold" }}>
                ${transaction.totalAmount}
              </span>
            </Text>
          </Box>

          <Button
            colorScheme="teal"
            size={isMobile ? "lg" : "md"}
            onClick={() => (window.location.href = "/")} // Redirect to home page
            width="full"
            variant="solid"
            _hover={{
              bg: "teal.600",
              color: "white",
            }}
            transition="all 0.3s ease"
          >
            Go to Home
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default SuccessPage;
