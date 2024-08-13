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
} from "@chakra-ui/react";
import { uploadImage } from "@/lib/uploadImage"; // Ensure this path is correct
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { FaMapMarkedAlt, FaGlobe, FaCalendarAlt } from "react-icons/fa";
import { BiMaleFemale as BiGender } from "react-icons/bi";

export default function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [dob, setDob] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
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
    setAddress("");
    setGender("");
    setCountry("");
    setDob("");
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      !name ||
      !imageFile ||
      !address ||
      !gender ||
      !country ||
      !dob
    ) {
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
        body: JSON.stringify({
          email,
          password,
          name,
          imageUrl,
          address,
          gender,
          country,
          dob,
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
          <Box
            as="form"
            w="100%"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={4}>
              <Box flex="1">
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
              </Box>

              <Box flex="1">
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
              </Box>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={4} mt={4}>
              <Box flex="1">
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
              </Box>

              <Box flex="1">
                <FormControl id="signUp-address" isRequired>
                  <FormLabel>Address</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaMapMarkedAlt color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      variant="filled"
                      value={address}
                      onChange={handleInputChange(setAddress)}
                      placeholder="Enter your address"
                    />
                  </InputGroup>
                </FormControl>
              </Box>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={4} mt={4}>
              <Box flex="1">
                <FormControl id="signUp-gender" isRequired>
                  <FormLabel>Gender</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <BiGender color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      variant="filled"
                      value={gender}
                      onChange={handleInputChange(setGender)}
                      placeholder="Enter your gender"
                    />
                  </InputGroup>
                </FormControl>
              </Box>

              <Box flex="1">
                <FormControl id="signUp-country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaGlobe color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      variant="filled"
                      value={country}
                      onChange={handleInputChange(setCountry)}
                      placeholder="Enter your country"
                    />
                  </InputGroup>
                </FormControl>
              </Box>
            </Flex>

            <Flex direction={{ base: "column", md: "row" }} wrap="wrap" gap={4} mt={4}>
              <Box flex="1">
                <FormControl id="signUp-dob" isRequired>
                  <FormLabel>Date of Birth</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <FaCalendarAlt color="gray.500" />
                    </InputLeftElement>
                    <Input
                      type="date"
                      variant="filled"
                      value={dob}
                      onChange={handleInputChange(setDob)}
                    />
                  </InputGroup>
                </FormControl>
              </Box>

              <Box flex="1">
                <FormControl id="signUp-image" isRequired>
                  <FormLabel>Profile Picture</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    variant="filled"
                    onChange={handleImageChange}
                  />
                </FormControl>
              </Box>
            </Flex>

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
