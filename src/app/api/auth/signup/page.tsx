"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  Box,
  Text,
} from "@chakra-ui/react";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // State to hold the Base64 string
  const [error, setError] = useState("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const clearFormData = () => {
    setEmail("");
    setPassword("");
    setName("");
    setImage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, image }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setError("");
      clearFormData();
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Container maxW="md" paddingTop={76} paddingBottom={0}>
      <Box
        w="full"
        maxW="100%"
        mx="auto"
        borderWidth={1}
        borderRadius="lg"
        shadow="md"
        p={4}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <VStack spacing={6}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
          <Box
            as="form"
            w="100%"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <FormControl id="signUp-email" mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                variant="filled"
                value={email}
                onChange={handleInputChange(setEmail)}
                placeholder="Enter your email address"
                isInvalid={!!error}
              />
            </FormControl>
            <FormControl id="signUp-name" mb={4} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                variant="filled"
                value={name}
                onChange={handleInputChange(setName)}
                placeholder="Enter your name"
              />
            </FormControl>
            <FormControl id="signUp-password" mb={4} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                variant="filled"
                value={password}
                onChange={handleInputChange(setPassword)}
                placeholder="Enter your password"
              />
            </FormControl>
            {error && (
              <FormHelperText textAlign="center" color="red.500" mb={4}>
                {error}
              </FormHelperText>
            )}
            <Button type="submit" colorScheme="teal" variant="solid" w="100%">
              Sign Up
            </Button>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}
