"use client";
import React, { useState } from "react";
import { Input, Button, Flex } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <Flex align="center" gap={2}>
      <Input
        placeholder="Search products..."
        value={query}
        sx={{
          width: "150px",
          height: "30px",
          borderRadius: "5px",
          border: "1px solid white",
          backgroundColor: "white",
          fontWeight: "thin",
          fontSize: "small",
        }}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button
        variant="outline"
        sx={{
          color: "white",
          backgroundColor: "#59B9B7",
          fontWeight: "thin",
          fontSize: "small",
          height: "30px",
          border: "1px solid white",
          borderRadius: "5px",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </Flex>
  );
};

export default SearchBar;
