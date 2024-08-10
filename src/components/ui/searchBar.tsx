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

  const inputWidth = useBreakpointValue({ base: "120px", sm: "150px" });

  return (
    <Flex align="center" gap={2}>
      <Input
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        width={inputWidth}
        height="30px"
        borderRadius="md"
        borderColor="white"
        backgroundColor="white"
        fontSize="sm"
        fontWeight="normal"
        _placeholder={{ color: "gray.500" }}
        _focus={{ borderColor: "teal.500", boxShadow: "outline" }}
      />
      <Button
        onClick={handleSearch}
        variant="outline"
        colorScheme="teal"
        size="sm"
        height="30px"
        borderRadius="md"
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
