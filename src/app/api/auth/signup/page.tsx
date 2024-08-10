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
  };

  return (
    <Container maxW="md" paddingTop={76} paddingBottom={0}>
      <Box
        w="100%"
        height="80vh"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #e2e8f0",
          borderRadius: "10px",
          shadow: "md",
        }}
      >
        <VStack spacing={6}>
          <Text fontSize="xl" fontWeight="bold" textAlign="center">
            Sign Up
          </Text>
          <Box as="form" w="100%">
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
