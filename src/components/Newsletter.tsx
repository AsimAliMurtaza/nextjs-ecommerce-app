"use client";
import { Input, Button, useToast } from "@chakra-ui/react";
import { FormEventHandler, useState } from "react";
import {
  FormControl,
  FormLabel,
  Container,
  FormHelperText,
} from "@chakra-ui/react";

export default function Newsletter() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const clearFormData = () => {
    setEmail("");
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (!email) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address");
      return;
    }

    setError("");
    showToast();
    clearFormData();
  };

  const showToast = () => {
    toast({
      title: "Subscribed!",
      description: "You have successfully subscribed to our newsletter.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container
      maxW="container.lg"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding="40px"
      marginTop="20px"
      marginBottom="20px"
    >
      <FormControl as="form" onSubmit={handleSubmit}>
        <FormLabel fontSize="20px" textAlign="center" marginBottom="10px">
          Subscribe to our Newsletter
        </FormLabel>
        <Input
          type="email"
          colorScheme="teal"
          variant="filled"
          value={email}
          onChange={handleInputChange}
          isInvalid={!!error}
          placeholder="Enter your email address"
        />
        <FormHelperText textAlign="center" color="red.500">
          {error}
        </FormHelperText>
        <Button
          type="submit"
          color="#59B9B7"
          _hover={{ bg: "#59B9B7", color: "white" }}
          variant="ghost"
          marginTop="10px"
        >
          Subscribe
        </Button>
      </FormControl>
    </Container>
  );
}
