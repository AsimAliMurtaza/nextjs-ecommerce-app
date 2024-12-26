'use client';
import {
  Container,
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Link,
  Stack,
} from "@chakra-ui/react";

import { useSearchParams  } from "next/navigation";

const errors = {
  Signin: "There was a problem signing in. Try signing with a different account.",
  OAuthSignin: "There was an issue signing in with OAuth. Try signing with a different account.",
  OAuthCallback: "An error occurred during the OAuth callback process. Please try again.",
  OAuthCreateAccount: "An issue occurred while creating an account using OAuth. Try signing with a different account.",
  EmailCreateAccount: "There was a problem creating an account using email. Please try again.",
  Callback: "An error occurred during the sign-in callback process. Please try again.",
  OAuthAccountNotLinked:
    "To confirm your identity, please sign in with the same account you used originally.",
  EmailSignin: "We couldn't find an account with that email address. Please check your email address and try again, or create a new account.",
  CredentialsSignin:
    "Sign in failed. Please double-check that your email address and password are correct.",
  default: "Unable to sign in. Please try again later.",
};

const Error = () => {
  
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const errorMessage = errors[error as keyof typeof errors] || errors.default;

  return (
    <Container maxW="container.lg" py={80}>
      <Stack spacing={8}>
        <Alert status="error" variant="subtle">
          <AlertIcon boxSize={5} />
          <Heading as="h2" size="md">
            Uh oh, something went wrong!
          </Heading>
          <Text mt={2}>{errorMessage}</Text>
        </Alert>

        <Text fontSize="sm">
          Here are some things you can try:
        </Text>
        <Stack spacing={2} direction={["column", "row"]}>
          <Link href="/" color="teal.500">
            Forgot your password?
          </Link>
          {error !== "OAuthAccountNotLinked" && (
            <Link href="/auth/signup" color="teal.500">
              Create a new account
            </Link>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Error;