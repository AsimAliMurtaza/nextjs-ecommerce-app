"use client";
import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Stack,
  Text,
  HStack,
  Image,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "lucide-react";
import { useCart } from "@/contexts/cart-context"; // Adjust the import path as needed
import Link from "next/link";

const CartButton: React.FC = () => {
  const { cart } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="relative"
      display="inline-block"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      sx={{
        _hover: {
          cursor: "pointer",
        },
      }}
    >
      <IconButton
        icon={<ChevronDownIcon/>}
        aria-label="Cart"
        variant={"outline"}
        size="sm"
        className="hidden lg:inline-flex"
        style={{
          height: "30px",
          borderRadius: "5px",
          border: "1px solid white",
        }}
      />

      {isOpen && (
        <Card
          position="absolute"
          top="100%"
          right="0"
          zIndex="10"
          boxShadow="lg"
          bg="white"
          borderRadius="md"
          p={4}
          minW="300px"
        >
          <CardHeader>
            <Text fontWeight="bold">Cart Items</Text>
          </CardHeader>
          <CardBody>
            {cart.length === 0 ? (
              <Text>No items in the cart</Text>
            ) : (
              <Stack spacing={4}>
                {cart.map((item) => (
                  <Box key={item.id} borderBottomWidth="1px" pb={2} mb={2}>
                    <HStack>
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        boxSize="50px"
                        objectFit="cover"
                        borderRadius="md"
                      />
                      <Box>
                        <Text fontWeight="bold">{item.name}</Text>
                        <Text>
                          ${item.price} x {item.quantity}
                        </Text>
                      </Box>
                    </HStack>
                  </Box>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  w="full"
                  as={Link}
                  href="/cart"
                >
                  View Cart
                </Button>
              </Stack>
            )}
          </CardBody>
        </Card>
      )}
    </Box>
  );
};

export default CartButton;
