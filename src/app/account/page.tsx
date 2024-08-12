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
} from "@chakra-ui/react";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);
  if (status === "loading") {
    return <Text>Loading...</Text>;
  }

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
          <Flex
            direction={["column", "row"]}
            justifyContent="space-around"
            alignItems="center"
            gap={8}
          >
            <Image
              src={session?.user?.image ?? ""}
              alt="User profile picture"
              sx={{
                borderRadius: "full",
                width: "50%",
                height: "50%",
              }}
            />
            <form>
              <Stack spacing={4}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    type="text"
                    disabled
                    name="username"
                    value={session?.user?.name ?? ""}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    disabled
                    value={session?.user?.email ?? ""}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Current Password</FormLabel>
                  <Input type="password" name="password" />
                </FormControl>
                <FormControl>
                  <FormLabel>New Password</FormLabel>
                  <Input type="password" name="newPassword" />
                </FormControl>
                <Button colorScheme="teal" type="submit">
                  Update Profile
                </Button>
              </Stack>
            </form>
          </Flex>
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
