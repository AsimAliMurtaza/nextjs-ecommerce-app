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
import { uploadImage } from "@/lib/uploadImage"; // Import the uploadImage function
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null); // State to hold the selected file
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setter(event.target.value);
    };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
    }
  };

  const clearFormData = () => {
    setEmail("");
    setPassword("");
    setName("");
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name || !imageFile) {
      setError("All fields are required");
      return;
    }

    try {
      const imageUrl = await uploadImage(imageFile);

      const response = await fetch("/api/auth/signup/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name, imageUrl }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      setError("");
      clearFormData();
      router.push("/auth/signin");
    } catch (error) {
      setError("Something went wrong");
    }
  };

  return (
    <Container maxW="lg" py={{ base: "20", md: "20", lg: "20" }}>
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
            <FormControl>
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
              <FormControl id="signUp-image" mb={4} isRequired>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  variant="filled"
                  onChange={handleImageChange}
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
            </FormControl>
            <Text fontSize="sm" mt={4} textAlign="center">
              Already have an account?{" "}
              <span
                onClick={() => {
                  router.back();
                }}
                style={{
                  color: "#3182CE",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Sign In
              </span>
            </Text>
          </Box>
        </VStack>
      </Box>
    </Container>
  );
}
