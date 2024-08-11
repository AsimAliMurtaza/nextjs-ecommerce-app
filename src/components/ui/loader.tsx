import { Center, Flex, Spinner, Text, Box } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="rgba(255, 255, 255, 0.1)" // Semi-transparent white background
      zIndex="9999" // High z-index to ensure it overlays everything
      sx={{
        transition: "opacity 0.5s ease-in-out", // Smooth transition for opacity
        opacity: 1,
      }}
    >
      <Center h="100%">
        <Flex direction="column" align="center">
          <Spinner size="xl" color="teal.500" />
          <Text mt={6} fontSize="xl" color="teal.700">
            Loading... Please wait
          </Text>
        </Flex>
      </Center>
    </Box>
  );
};

export default Loader;
