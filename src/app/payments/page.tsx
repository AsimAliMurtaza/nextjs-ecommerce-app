'use client';

import { useEffect, useState } from "react";
import {
  Container,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Divider,
  Button,
  HStack,
} from "@chakra-ui/react";

// Define a type for transaction data
interface TransactionProduct {
  productId: number;
  name: string;
  quantity: number;
  price: number;
  imageUrl: string;
}

interface Transaction {
  receiptId: string;
  username: string;
  email: string;
  products: TransactionProduct[];
  totalAmount: number;
  transactionDate: string;
  paymentStatus: string;
}

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  // Fetch transactions when the component mounts
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/get-user-transactions");
        const data = await res.json();

        if (data.success) {
          setTransactions(data.transactions);
        } else {
          setError(data.error || "Failed to load transactions");
        }
      } catch (err) {
        setError("Error fetching transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Container maxW="container.md" py={{ base: 16, lg: 32 }} textAlign="center">
        <Spinner size="xl" color="teal.400" />
        <Text mt={4}>Loading your transaction history...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.md" py={{ base: 16, lg: 32 }} textAlign="center">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  // Calculate the current transactions based on the page
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions?.slice(indexOfFirstTransaction, indexOfLastTransaction);

  // Pagination controls
  const pageCount = Math.ceil((transactions?.length || 0) / transactionsPerPage);

  // Change page function
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Container maxW="container.lg" py={{ base: 16, lg: 32 }} textAlign="center">
      <Heading as="h2" size="xl" mb={8}>
        Your Transaction History
      </Heading>
      {transactions?.length === 0 ? (
        <Text>No transactions found.</Text>
      ) : (
        <>
          <SimpleGrid columns={1} spacing={8}>
            {currentTransactions?.map((transaction) => (
              <Card
                key={transaction.receiptId}
                variant="elevated"
                bg="gray.50"
                boxShadow="lg"
                borderRadius="md"
                p={4}
              >
                <CardBody>
                  <Stack spacing={4} align="flex-start">
                    {/* Receipt ID with wrapping and truncation */}
                    <Text
                      size="md"
                      noOfLines={1}
                      overflowWrap="break-word"
                      wordBreak="break-word"
                    >
                      Receipt ID: {transaction.receiptId}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      noOfLines={1}
                      overflowWrap="break-word"
                      wordBreak="break-word"
                    >
                      Email: {transaction.email}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      noOfLines={1}
                      overflowWrap="break-word"
                      wordBreak="break-word"
                    >
                      Transaction Date:{" "}
                      {new Date(transaction.transactionDate).toLocaleDateString()}
                    </Text>
                    <Text
                      fontSize="sm"
                      color="gray.500"
                      noOfLines={1}
                      overflowWrap="break-word"
                      wordBreak="break-word"
                    >
                      Payment Status: {transaction.paymentStatus}
                    </Text>
                    <Text
                      fontWeight="bold"
                      fontSize="lg"
                      noOfLines={1}
                      overflowWrap="break-word"
                      wordBreak="break-word"
                    >
                      Total Amount: ${transaction.totalAmount}
                    </Text>
                    <Divider />
                    <Stack spacing={2} mt={2}>
                      <Text fontSize="sm" fontWeight="semibold">
                        Purchased Products:
                      </Text>
                      {transaction.products.map((product, index) => (
                        <Text key={index} fontSize="sm" isTruncated>
                          {product.name} (x{product.quantity}) - ${product.price}{" "}
                          each
                        </Text>
                      ))}
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
          {/* Pagination Controls */}
          <HStack justify="center" spacing={4} mt={8}>
            <Button
              isDisabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <Text>
              Page {currentPage} of {pageCount}
            </Text>
            <Button
              isDisabled={currentPage === pageCount}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </HStack>
        </>
      )}
    </Container>
  );
};

export default TransactionHistory;
