"use client";

import { useState } from "react";
import {
  Input,
  Button,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Flex,
  Box,
  Text,
  InputGroup,
  InputLeftElement,
  Divider,
  VStack,
  Image,
  Center,
} from "@chakra-ui/react";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/lib/uploadImage"; // Import the uploadImage function

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null); // To store the uploaded image URL
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
    setImageURL(null); // Clear the uploaded image URL
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("All fields are required");
      return;
    }

    try {
      let imageUrl = imageURL;
      if (imageFile) {
        // Upload the image to Firebase Storage and get the URL
        imageUrl = await uploadImage(imageFile);
        setImageURL(imageUrl); // Update the state with the uploaded image URL
      }

      // Send the data to your API
      const response = await fetch("/api/auth/signup/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          name,
          imageUrl, // Include the uploaded image URL in the request
        }),
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
    <Container maxW="xl" py={{ base: "12", md: "16", lg: "20" }}>
      <Box
        w="full"
        maxW="100%"
        mx="auto"
        borderWidth={1}
        borderRadius="lg"
        shadow="lg"
        p={6}
        bg="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <VStack spacing={6} w="100%">
          <Text
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            color="teal.600"
          >
            Sign Up
          </Text>
          <Divider />
          <Box as="form" w="100%" onSubmit={(e) => handleSubmit(e)}>
            <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={6}>
              {/* Left side - Image Upload */}
              <Box flex="1" minW="200px">
                <FormControl id="image-upload" isRequired>
                  <FormLabel>Profile Image</FormLabel>
                  <Center
                    w="full"
                    h="200px"
                    borderWidth={1}
                    borderStyle="dashed"
                    borderRadius="md"
                    bg="gray.100"
                    cursor="pointer"
                    onClick={() =>
                      document.getElementById("image-upload-input")?.click()
                    }
                  >
                    {imageFile ? (
                      <Image
                        src={URL.createObjectURL(imageFile)}
                        alt="Uploaded Image"
                        objectFit="cover"
                        w="full"
                        h="full"
                        borderRadius="md"
                      />
                    ) : (
                      <Text color="gray.500">Click to upload image</Text>
                    )}
                    <input
                      id="image-upload-input"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                  </Center>
                </FormControl>
              </Box>

              {/* Right side - Input Fields */}
              <Box flex="2">
                <Flex direction="column" gap={4}>
                  <FormControl id="signUp-email" isRequired>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AiOutlineMail color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="email"
                        variant="filled"
                        value={email}
                        onChange={handleInputChange(setEmail)}
                        placeholder="Enter your email address"
                        isInvalid={!!error}
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl id="signUp-name" isRequired>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AiOutlineUser color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="text"
                        variant="filled"
                        value={name}
                        onChange={handleInputChange(setName)}
                        placeholder="Enter your name"
                      />
                    </InputGroup>
                  </FormControl>

                  <FormControl id="signUp-password" isRequired>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none">
                        <AiOutlineLock color="gray.500" />
                      </InputLeftElement>
                      <Input
                        type="password"
                        variant="filled"
                        value={password}
                        onChange={handleInputChange(setPassword)}
                        placeholder="Enter your password"
                      />
                    </InputGroup>
                  </FormControl>

                  {error && (
                    <FormHelperText textAlign="center" color="red.500" mt={4}>
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
                    Sign Up
                  </Button>
                </Flex>
              </Box>
            </Flex>
          </Box>

          <Text fontSize="sm" mt={6} textAlign="center">
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
        </VStack>
      </Box>
    </Container>
  );
}
