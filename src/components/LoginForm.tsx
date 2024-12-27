import React from "react";
import {
  Input,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  VStack,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Button } from "antd";
import { FaGithub, FaGoogle } from "react-icons/fa";

interface LoginFormProps {
  email: string;
  password: string;
  error: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  signIn: (provider: string, options?: Record<string, unknown>) => void;
  clearFormData?: () => void;
}

function LoginForm({
  email,
  password,
  error,
  setEmail,
  setPassword,
  handleInputChange,
  handleSubmit,
  signIn,
  clearFormData,
}: LoginFormProps) {
  return (
    <Container maxW="lg" py={{ base: "20", md: "20", lg: "20" }}>
      <Box
        w="full"
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
              htmlType="submit"
              size="large"
              style={{
                backgroundColor: "#fff",
                color: "#333",
                width: "100%",
              }}
            >
              Sign In
            </Button>
            <VStack spacing={4} mt={4}>
              <Text fontSize="sm">Or sign in with</Text>
              <Button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                type="primary"
                style={{
                  width: "100%",
                }}
                icon={<FaGoogle />}
              >
                Google
              </Button>
              <Button
                onClick={() => signIn("github", { callbackUrl: "/" })}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  width: "100%",
                }}
                icon={<FaGithub />}
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

export default LoginForm;
