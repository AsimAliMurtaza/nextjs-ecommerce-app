"use client";
import { Box, Button, Container, FormControl, FormLabel, Heading, Input, Stack, Text, useToast } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";

interface UserInfo {
  username: string;
  email: string;
  password: string;
  newPassword: string;
}

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    username: "john_doe",
    email: "john_doe@example.com",
    password: "",
    newPassword: "",
  });

  const toast = useToast();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleUpdate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add update logic here
    toast({
      title: "Profile updated.",
      description: "Your account information has been updated successfully.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.lg" py={20}>
      <Heading mb={6} textAlign="center">
        Account Settings
      </Heading>
      <Stack spacing={8}>
        <Box borderWidth="1px" borderRadius="lg" p={8} shadow="md">
          <Heading size="md" mb={4}>
            Personal Information
          </Heading>
          <form onSubmit={handleUpdate}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={userInfo.username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={userInfo.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Current Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={userInfo.password}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl>
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  name="newPassword"
                  value={userInfo.newPassword}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="teal" type="submit">
                Update Profile
              </Button>
            </Stack>
          </form>
        </Box>
        <Box borderWidth="1px" borderRadius="lg" p={8} shadow="md">
          <Heading size="md" mb={4}>
            Account Settings
          </Heading>
          <Stack spacing={4}>
            <Text>
              <strong>Member since:</strong> January 2021
            </Text>
            <Text>
              <strong>Subscription:</strong> Premium
            </Text>
            <Button colorScheme="red">Delete Account</Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
}
