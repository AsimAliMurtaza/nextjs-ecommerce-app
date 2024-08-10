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
  Heading,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { Icon } from "@chakra-ui/icons";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Header from "@/components/Header";

export default function signInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
  };

  return (
    <div>
      <Container maxW="lg" paddingTop={70} paddingBottom={0}>
        <Box
          w="100%"
          height="86vh"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            shadow: "md",
          }}
        >
          <VStack spacing={10}>
            <Heading as="h2" size="lg" textAlign="center">
              Welcome Back
            </Heading>
            <Text fontSize="lg" textAlign="center">
              Sign in
            </Text>

            {/* Sign In Form */}
            <Box as="form" onSubmit={(e) => handleSubmit(e)} w="100%">
              <FormControl id="signIn-email" mb={4} isRequired>
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
              <FormControl id="signIn-password" mb={4} isRequired>
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
                w="100%"
                mt={4}
              >
                Sign In
              </Button>
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Button
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  colorScheme="blue"
                  size="lg"
                  marginTop="20px"
                >
                  Sign in with
                  <Icon as={FaGoogle} ml="5px" />
                </Button>
                <Button
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  colorScheme="gray"
                  size="lg"
                  marginTop="20px"
                >
                  Sign in with
                  <Icon as={FaGithub} ml="5px" />
                </Button>
              </div>
              <Text fontSize="sm" marginTop="20px">
                Don't have an account?{" "}
                <a href="/auth/signup" style={{ color: "#3182ce" }}>
                  Sign Up
                </a>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Container>
    </div>
  );
}
