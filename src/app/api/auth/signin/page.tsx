"use client";
import {
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  Box,
  Heading,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import React from "react";

export default function SignInForm() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const clearFormData = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email: email,
      password: password,
      redirect: true,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <Container maxW="lg" py={{ base: "6", md: "6", lg: "10" }} sx={{}}>
      <Box
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
          <Heading as="h2" size="lg" textAlign="center">
            Welcome Back
          </Heading>
          <Text fontSize="lg" textAlign="center">
            Sign in
          </Text>

          <Box as="form" onSubmit={(e) => handleSubmit(e)} w="full">
            <FormControl id="signIn-email" mb={2} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                variant="filled"
                value={email}
                onChange={handleInputChange(setEmail)}
                isInvalid={!!error}
                placeholder="Enter your email address"
              />
            </FormControl>
            <FormControl id="signIn-password" mb={2} isRequired>
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
              <FormHelperText textAlign="center" color="red.500">
                {error}
              </FormHelperText>
            )}
            <Button
              type="submit"
              colorScheme="teal"
              variant="solid"
              w="full"
              mt={2}
            >
              Sign In
            </Button>
            <VStack spacing={4} mt={4}>
              <Text fontSize="sm">Or sign in with</Text>
              <Button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                colorScheme="blue"
                size="lg"
                w="full"
                leftIcon={<FaGoogle />}
              >
                Google
              </Button>
              <Button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                colorScheme="gray"
                size="lg"
                w="full"
                leftIcon={<FaGithub />}
              >
                GitHub
              </Button>
            </VStack>
            <Text fontSize="sm" mt={4} textAlign="center">
              Don&apos;t have an account?{" "}
              <a href="/auth/signup" style={{ color: "#3182ce" }}>
                Sign Up
              </a>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}
