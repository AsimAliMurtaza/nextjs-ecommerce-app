"use client";

import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
  Stack,
  Text,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [selectedOption, setSelectedOption] = useState<string>("account");
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    email: session?.user?.email || "",
    password: "",
    newPassword: "",
    address: "",
    gender: "",
    country: "",
    dob: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const renderContent = () => {
    switch (selectedOption) {
      case "settings":
        return (
          <Box borderWidth="1px" borderRadius="lg" p={8} shadow="md">
            <Heading size="md" mb={4}>
              Settings
            </Heading>
            <Text>Settings content goes here.</Text>
          </Box>
        );
      case "account":
        return (
          <Box borderWidth="1px" borderRadius="lg" p={8} shadow="md">
            <Heading size="md" mb={4}>
              Personal Information
            </Heading>
            <Flex
              direction={["column", "row"]}
              justifyContent="space-between"
              alignItems="start"
              gap={8}
            >
              <Image
                src={session?.user?.image ?? ""}
                alt="User profile picture"
                borderRadius="full"
                boxSize={["100px", "150px"]}
                objectFit="cover"
              />
              <Box flex="1">
                <form onSubmit={handleSubmit}>
                  <Stack spacing={4}>
                    <FormControl>
                      <FormLabel>Username</FormLabel>
                      <Input
                        type="text"
                        name="username"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        disabled
                        value={session?.user?.email || ""}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <Input
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Country</FormLabel>
                      <Input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Current Password</FormLabel>
                      <Input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <Button colorScheme="teal" type="submit">
                      Update Profile
                    </Button>
                  </Stack>
                </form>
              </Box>
            </Flex>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={8}
              shadow="md"
              mt={8}
              bg="red.50"
              borderColor="red.300"
            >
              <Stack spacing={4}>
                <Heading size="md" color="red.600">
                  Delete Your Account
                </Heading>
                <Text color="red.500">
                  This action is irreversible. All your data will be permanently
                  deleted.
                </Text>
                <Button
                  colorScheme="red"
                  size="lg"
                  onClick={() => console.log("Delete Account")}
                >
                  Delete Account
                </Button>
              </Stack>
            </Box>
          </Box>
        );
      case "moreOptions":
        return (
          <Box borderWidth="1px" borderRadius="lg" p={8} shadow="md">
            <Heading size="md" mb={4}>
              More Options
            </Heading>
            <Text>More options content goes here.</Text>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxW="100vw" h="100vh" py={16} px={0}>
      <Flex direction={["column", "row"]} h="full" w="full" overflow="hidden">
        {/* Sidebar */}
        <VStack
          as="nav"
          align="start"
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          w={["full", "250px"]}
          h="full"
          spacing={4}
          shadow="md"
          display={{ base: "none", md: "flex" }}
        >
          <Button
            variant={selectedOption === "account" ? "solid" : "ghost"}
            colorScheme="teal"
            w="full"
            onClick={() => setSelectedOption("account")}
          >
            Account
          </Button>
          <Button
            variant={selectedOption === "settings" ? "solid" : "ghost"}
            colorScheme="teal"
            w="full"
            onClick={() => setSelectedOption("settings")}
          >
            Settings
          </Button>
          <Button
            variant={selectedOption === "moreOptions" ? "solid" : "ghost"}
            colorScheme="teal"
            w="full"
            onClick={() => setSelectedOption("moreOptions")}
          >
            More Options
          </Button>
        </VStack>

        {/* Main Content */}
        <Flex
          direction="column"
          alignItems="center"
          justifyContent="start"
          h="full"
          w="full"
          p={8}
          overflowY="auto"
        >
          <Stack spacing={8} w="full">
            {renderContent()}
          </Stack>
        </Flex>
      </Flex>
    </Container>
  );
}
