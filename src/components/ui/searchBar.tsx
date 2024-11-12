"use client";
import React, { useState } from "react";
import { Input, Button, Flex, useBreakpointValue } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const inputWidth = useBreakpointValue({
    base: "100px",
    sm: "200px",
    md: "100px",
    lg: "200px",
  });

  return (
    <Flex align="center" gap={2}>
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        width={inputWidth}
        height="30px"
        borderRadius="md"
        backgroundColor="white"
        fontSize="sm"
        fontWeight="thin"
        _placeholder={{ color: "gray.500" }}
        _focus={{ borderColor: "white", boxShadow: "outline" }}
      />

      <Button
        type="submit"
        size="sm"
        color="white"
        variant="outline"
        _hover={{ bg: "white", color: "#59B9B7" }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
