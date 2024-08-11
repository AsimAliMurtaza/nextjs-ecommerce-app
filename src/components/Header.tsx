"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Button,
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

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const handleSignIn = () => {
    signIn();
  };

  return (
    <Box
      as="header"
      bg="#59B9B7"
      boxShadow="md"
      position="fixed"
      width="100%"
      top="0"
      zIndex="1000"
      px={{ base: 4, lg: 6 }}
      py={3}
    >
      <Flex align="center" justify="space-between" wrap="wrap">
        {/* Title and Burger Menu */}
        <Flex align="center" gap={2} display={{ base: "flex", md: "none" }}>
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <ShoppingBag size={24} />
              <Box fontWeight="bold" fontSize="lg">
                Ecommerce
              </Box>
            </Flex>
          </Link>
          <Button
            onClick={onOpen}
            variant="outline"
            colorScheme="teal"
            size="sm"
            aria-label="Menu"
          >
            <MenuIcon />
          </Button>
        </Flex>

        {/* Full Menu for larger screens */}
        <Flex align="center" gap={4} display={{ base: "none", md: "flex" }}>
          <Link href="/" passHref>
            <Flex align="center" gap={2}>
              <ShoppingBag size={24} />
              <Box fontWeight="bold" fontSize="lg">
                Ecommerce
              </Box>
            </Flex>
          </Link>
          <Link href="/" passHref>
            <Button
              variant="link"
              fontSize="md"
              _hover={{ textDecoration: "underline" }}
              colorScheme="gray.800"
            >
              Home
            </Button>
          </Link>
          <Link href="/products" passHref>
            <Button
              variant="link"
              fontSize="md"
              _hover={{ textDecoration: "underline" }}
              colorScheme="gray.800"
            >
              Products
            </Button>
          </Link>
          <Link href="/categories" passHref>
            <Button
              variant="link"
              fontSize="md"
              _hover={{ textDecoration: "underline" }}
              colorScheme="gray.800"
            >
              Categories
            </Button>
          </Link>
          <Link href="/cart" passHref>
            <Button
              variant="link"
              fontSize="md"
              _hover={{ textDecoration: "underline" }}
              colorScheme="gray.800"
            >
              Cart
            </Button>
          </Link>
        </Flex>

        <Flex
          align="center"
          gap={4}
          display={{ base: "none", md: "flex" }} // Hide on small screens
        >
          <CartButton />
          <SearchBar />

          {session ? (
            <Button
              variant="outline"
              colorScheme="teal"
              size="sm"
              onClick={handleSignOut}
              rightIcon={
                <Image
                  src={session.user?.image || ""}
                  alt="Pfp"
                  alignItems="center"
                  border="2px solid teal"
                  boxSize="25px"
                  borderRadius="full"
                  mr={0}
                />
              }
            >
              Sign Out
            </Button>
          ) : (
            <Button
              variant="outline"
              colorScheme="teal"
              size="sm"
              onClick={handleSignIn}
            >
              Sign In
            </Button>
          )}
        </Flex>
      </Flex>

      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay
          sx={{
            backdropFilter: "blur(4px)",
            background: "rgba(255, 255, 255, 0.5)",
          }}
        />
        <DrawerContent>
          <DrawerCloseButton />

          {session ? (
            <DrawerHeader
              sx={{
                fontSize: "xl",
                fontWeight: "bold",
                color: "teal",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                p: 4,
                gap: 2,
              }}
            >
              <Image
                src={session.user?.image || ""}
                alt="Pfp"
                boxSize="50px"
                borderRadius="full"
                border="2px solid teal"
                mr={2}
              />
              {session.user?.name}
            </DrawerHeader>
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
            <Flex direction="column" gap={4}>
              {session ? (
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<FaSignOutAlt />}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<FaSignInAlt />}
                  onClick={handleSignIn}
                >
                  Sign In
                </Button>
              )}
              <Link href="/" passHref>
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<HomeIcon />}
                >
                  Home
                </Button>
              </Link>
              <Link href="/products" passHref>
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<PackageIcon />}
                >
                  Products
                </Button>
              </Link>
              <Link href="/categories" passHref>
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<LayoutGridIcon />}
                >
                  Categories
                </Button>
              </Link>
              <Link href="/cart" passHref>
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<ShoppingCartIcon />}
                >
                  Cart
                </Button>
              </Link>
              <Link href="/account" passHref>
                <Button
                  variant="link"
                  fontSize="lg"
                  colorScheme="teal"
                  _hover={{ textDecoration: "underline" }}
                  leftIcon={<UserIcon />}
                >
                  Account
                </Button>
              </Link>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
