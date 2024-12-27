"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Text,
  Button as ChakraButton,
  Box,
  Flex,
  useDisclosure,
  Image,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
} from "@chakra-ui/react";
import { useSession, signOut, signIn } from "next-auth/react";
import CartButton from "./ui/cart-card";
import SearchBar from "./ui/searchBar";
import { ShoppingBag } from "lucide-react";
import {
  MenuIcon,
  HomeIcon,
  PackageIcon,
  LayoutGridIcon,
  ShoppingCartIcon,
  UserIcon,
} from "./ui/icons";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useCart } from "@/contexts/cart-context";
import { Button } from "antd";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart } = useCart();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleRoute = () => {
    router.push("/account");
  };

  const handleBillingRoute = () => {
    router.push("/payments");
  };

  return (
    <Box
      as="header"
      bg="#ffffff"
      boxShadow="md"
      position="fixed"
      width="100%"
      zIndex="1000"
      px={{ base: 2, lg: 4 }}
      py={4}
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Title and Burger Menu */}
        <Flex
          align="center"
          gap={0}
          display={{ base: "flex", md: "none" }}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <ShoppingBag size={24} />
              <Box fontWeight="bold" fontSize="lg">
                Ecommerce
              </Box>
            </Flex>
          </Link>
          <ChakraButton
            onClick={onOpen}
            variant="outline"
            colorScheme="teal"
            size="sm"
            aria-label="Menu"
          >
            <MenuIcon />
          </ChakraButton>
        </Flex>
        <Flex
          display={{ base: "none", md: "flex" }}
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <ShoppingBag size={32} />
              <Box fontWeight="bold" fontSize="2xl">
                Ecommerce
              </Box>
            </Flex>
          </Link>

          {/* Full Menu for larger screens */}
          <Flex
            align="center"
            gap={4}
            display={{ base: "none", md: "flex" }}
            sx={{
              flexDirection: "row",
              justifyContent: "right",
              width: "100%",
            }}
          >
            <Link href="/" passHref>
              <ChakraButton
                variant="link"
                fontSize="xl"
                _hover={{ textDecoration: "none", color: "white" }}
                colorScheme="gray.800"
              >
                Home
              </ChakraButton>
            </Link>
            <Link href="/products" passHref>
              <ChakraButton
                variant="link"
                fontSize="xl"
                _hover={{ textDecoration: "none", color: "white" }}
                colorScheme="gray.800"
              >
                Products
              </ChakraButton>
            </Link>
            <Link href="/categories" passHref>
              <ChakraButton
                variant="link"
                fontSize="xl"
                _hover={{ textDecoration: "none", color: "white" }}
                colorScheme="gray.800"
              >
                Categories
              </ChakraButton>
            </Link>

            <Link href="/cart" passHref>
              <ChakraButton
                variant="link"
                fontSize="xl"
                _hover={{ textDecoration: "none", color: "white" }}
                colorScheme="gray.800"
              >
                Cart
              </ChakraButton>
            </Link>

            <CartButton />

            <SearchBar />

            {session ? (
              <Menu>
                <MenuButton>
                  <Image
                    src={session?.user?.image || ""}
                    alt="user"
                    boxSize="35px"
                    borderRadius="full"
                    width="35px"
                    _hover={{ cursor: "pointer" }}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={handleSignOut}>
                    <ChakraButton
                      colorScheme="teal"
                      variant="ghost"
                      w="100%"
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Sign Out
                    </ChakraButton>
                  </MenuItem>
                  <MenuItem onClick={handleRoute}>
                    <ChakraButton
                      colorScheme="teal"
                      variant="ghost"
                      w="100%"
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      My Account
                    </ChakraButton>
                  </MenuItem>
                  <MenuItem onClick={handleBillingRoute}>
                    <ChakraButton
                      colorScheme="teal"
                      variant="ghost"
                      w="100%"
                      sx={{
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Billing &amp; Payments
                    </ChakraButton>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                htmlType="submit"
                size="small"
                style={{
                  color: "#000000",
                  backgroundColor: "#ffffff",
                  height: "30px",
                  fontSize: "normal",
                }}
                onClick={handleSignIn}
              >
                Sign In
              </Button>
            )}
          </Flex>
        </Flex>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay
          sx={{
            backdropFilter: "blur(4px)",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        />
        <DrawerContent
          sx={{
            backdropFilter: "blur(4px)",
            background: "rgba(180, 244, 236, 0.5)",
          }}
        >
          <DrawerCloseButton />

          {session ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: 4,
              }}
            >
              <Image
                src={session.user?.image || ""}
                alt="image"
                boxSize="200px"
                borderRadius="full"
              />
              <Text
                sx={{
                  fontSize: "xl",
                  fontWeight: "bold",
                  color: "teal",
                }}
              >
                Welcome, {session.user?.name}!
              </Text>
            </Box>
          ) : (
            <DrawerHeader
              sx={{
                fontSize: "2xl",
                fontWeight: "bold",
                color: "teal",
              }}
            >
              Menu
            </DrawerHeader>
          )}
          <DrawerBody>
            <Flex direction="column" gap={2}>
              {session ? (
                <ChakraButton
                  fontSize="lg"
                  colorScheme="teal"
                  leftIcon={<FaSignOutAlt />}
                  onClick={handleSignOut}
                >
                  Sign Out
                </ChakraButton>
              ) : (
                <ChakraButton
                  type="submit"
                  size="lg"
                  color="#59B9B7"
                  variant="outline"
                  _hover={{ bg: "#59B9B7", color: "white" }}
                  leftIcon={<FaSignInAlt />}
                  onClick={handleSignIn}
                >
                  Sign In
                </ChakraButton>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 4,
                  padding: 4,
                }}
              >
                <SearchBar />
              </Box>
              <Link href="/" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<HomeIcon />}
                  onClick={onClose}
                >
                  Home
                </ChakraButton>
              </Link>
              <Link href="/products" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<PackageIcon />}
                  onClick={onClose}
                >
                  Products
                </ChakraButton>
              </Link>
              <Link href="/categories" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<LayoutGridIcon />}
                  onClick={onClose}
                >
                  Categories
                </ChakraButton>
              </Link>
              <Link href="/cart" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<ShoppingCartIcon />}
                  onClick={onClose}
                >
                  Cart &nbsp;
                  <span
                    style={{
                      fontSize: "sm",
                      color: "teal",
                    }}
                  >
                    {cart.length > 0 ? `(${cart.length})` : ""}
                  </span>
                </ChakraButton>
              </Link>
              <Link href="/account" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<UserIcon />}
                  onClick={onClose}
                >
                  Account
                </ChakraButton>
              </Link>
              <Link href="/payments" passHref>
                <ChakraButton
                  variant="ghost"
                  fontSize="lg"
                  colorScheme="teal"
                  w="full"
                  p="0.5rem"
                  borderRadius="lg"
                  justifyContent="flex-start"
                  _hover={{ bg: "teal.200", cursor: "pointer" }}
                  leftIcon={<UserIcon />}
                  onClick={onClose}
                >
                  Payments
                </ChakraButton>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
