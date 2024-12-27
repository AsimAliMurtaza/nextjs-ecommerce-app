"use client";
import React, { useState } from "react";
import { Input, Flex, useBreakpointValue } from "@chakra-ui/react";
import { Button } from "antd";
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
    base: "180px",
    sm: "200px",
    md: "100px",
    lg: "200px",
  });
  const inputColor = useBreakpointValue({
    base: "black",
    sm: "black",
    md: "black",
    lg: "black",
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
        htmlType="submit"
        size="small"
        style={{
          color: "#000000",
          backgroundColor: "#ffffff",
          height: "30px",
          fontSize: "normal",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
