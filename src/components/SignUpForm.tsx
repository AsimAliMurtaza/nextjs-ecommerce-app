import React from "react";
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

interface SignUpFormProps {
  email: string;
  password: string;
  name: string;
  imageFile: File | null;
  error: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
  handleInputChange: (
    setter: React.Dispatch<React.SetStateAction<string>>
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  router: any;
}

function SignUpForm({
  email,
  password,
  name,
  imageFile,
  error,
  setEmail,
  setPassword,
  setName,
  setImageFile,
  handleInputChange,
  handleImageChange,
  handleSubmit,
  router,
}: SignUpFormProps) {
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

export default SignUpForm;
