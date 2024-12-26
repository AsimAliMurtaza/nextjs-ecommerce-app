'use client';

import {
  Container,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Link,
  Stack,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

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

const ErrorPage = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  // Dynamically handle error state on mount
  useEffect(() => {
    const errorParam = searchParams.get("error");
    setError(errorParam);
  }, [searchParams]);

  const errorMessage = errors[error as keyof typeof errors] || errors.default;

  return (
    <Container maxW="container.md" py={32}>
      <Suspense fallback={<Text>Loading...</Text>}>
        <VStack spacing={8} align="center">
          <Alert status="error" variant="subtle" width="100%">
            <AlertIcon boxSize={5} />
            <Heading as="h2" size="md" color="red.600">
              Uh oh, something went wrong!
            </Heading>
            <Text mt={2} fontSize="lg" color="red.500">
              {errorMessage}
            </Text>
          </Alert>

          <Text fontSize="md" color="gray.600">
            Here are some things you can try:
          </Text>
          <Stack spacing={2} direction={["column", "row"]}>
            <Link href="/" color="teal.500" fontWeight="bold">
              Forgot your password?
            </Link>
            {error !== "OAuthAccountNotLinked" && (
              <Link href="/auth/signup" color="teal.500" fontWeight="bold">
                Create a new account
              </Link>
            )}
          </Stack>

          <Button
            as="a"
            href="/"
            variant="solid"
            colorScheme="teal"
            size="lg"
            mt={6}
            _hover={{ bg: "teal.600" }}
          >
            Go Back to Homepage
          </Button>
        </VStack>
      </Suspense>
    </Container>
  );
};

export default ErrorPage;
