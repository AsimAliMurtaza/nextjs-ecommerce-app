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
  useToast,
  Select,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import Email from "next-auth/providers/email";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [selectedOption, setSelectedOption] = useState<string>("account");
  const [formData, setFormData] = useState({
    username: session?.user?.name || "",
    email: session?.user?.email || "",
    gender: "",
    country: "",
    address: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    // Redirect if unauthenticated
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch user data and set form fields
    const fetchUser = async (email: string) => {
      try {
        const response = await fetch("/api/get-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const user = await response.json();
          setFormData({
            username: user.name || "",
            email: user.email || "",
            gender: user.gender || "",
            country: user.country || "",
            address: user.address || "",
            password: "",
            newPassword: "",
          });
        } else {
          showToast(
            "Error",
            "Failed to fetch user data. Please try again.",
            "error"
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast(
          "Error",
          "Failed to fetch user data. Please try again.",
          "error"
        );
      }
    };

    if (status === "authenticated" && session?.user?.email) {
      fetchUser(session.user.email);
    }
  }, [status, session]);

  const showToast = (
    title: string,
    description: string,
    status: "success" | "error"
  ) => {
    toast({
      title,
      description,
      status,
      duration: 5000,
      isClosable: true,
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Ensure that formData contains the email and at least one field to update
    if (!formData.email) {
      showToast("Update Failed", "Email is required to update the profile.", "error");
      return;
    }
  
    const { email, ...updates } = formData;
  
    if (Object.keys(updates).length === 0) {
      showToast(
        "Update Failed",
        "No updates provided. Please modify at least one field.",
        "error"
      );
      return;
    }
  
    try {
      const response = await fetch("/api/update-user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, updates }),
      });
  
      if (response.ok) {
        showToast(
          "Profile Updated",
          "Your profile has been updated successfully.",
          "success"
        );
      } else {
        const errorData = await response.json();
        showToast(
          "Update Failed",
          errorData.message || "An error occurred. Please try again.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(
        "Update Failed",
        "An unexpected error occurred. Please try again.",
        "error"
      );
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
            <Text>Settings pages coming soon XD</Text>
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
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="email"
                        name="email"
                        value={session?.user?.email || ""}
                        disabled
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Gender</FormLabel>
                      <Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        placeholder="Select your gender"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </Select>
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
