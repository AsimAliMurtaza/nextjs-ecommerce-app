"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutGridIcon } from "@/components/ui/icons";
import { LayoutListIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Container } from "@chakra-ui/react";
import Image from "next/image";

interface CategoryDetails {
  [category: string]: {
    imageUrl: string;
    description: string;
  };
}

export default function CategoriesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [categories, setCategories] = useState<string[]>([]);
  const [categoryDetails, setCategoryDetails] = useState<CategoryDetails>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.categories);
        setCategoryDetails(data.categoryDetails);
      } catch (error) {
        setError('An error occurred while fetching categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-20 md:py-20 lg:py-22 bg-muted">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl md:text-3xl font-bold">Categories</h2>
              <div className="flex items-center gap-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LayoutGridIcon className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>View as</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onClick={() => setViewMode("grid")}
                      checked={viewMode === "grid"}
                    >
                      <LayoutGridIcon className="h-4 w-4 mr-2" />
                      Grid
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() => setViewMode("list")}
                      checked={viewMode === "list"}
                    >
                      <LayoutListIcon className="h-4 w-4 mr-2" />
                      List
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                  : "flex flex-col gap-6"
              }`}
            >
              {categories.map((category) => (
                <div
                  key={category}
                  className={`${
                    viewMode === "grid"
                      ? "bg-background rounded-lg shadow-sm overflow-hidden"
                      : "bg-background rounded-lg shadow-sm overflow-hidden flex flex-row"
                  }`}
                >
                  <Link href={`/categories/${category}`} className="block" prefetch={false}>
                    {viewMode === "list" && (
                      <div className="flex-shrink-0">
                        <Image
                          src={categoryDetails[category]?.imageUrl || "/placeholder.svg"}
                          alt={category}
                          width={150}
                          height={150}
                          className="w-48 h-48 object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`${
                        viewMode === "list"
                          ? "flex-1 p-4 flex flex-col justify-between"
                          : "p-4 space-y-2"
                      }`}
                    >
                      {viewMode === "grid" && (
                        <Image
                          src={categoryDetails[category]?.imageUrl || "/placeholder.svg"}
                          alt={category}
                          width={300}
                          height={300}
                          className="w-full aspect-square object-cover"
                        />
                      )}
                      <div
                        className={`${
                          viewMode === "list"
                            ? "flex-1 flex flex-col justify-between"
                            : ""
                        }`}
                      >
                        <h3 className="font-semibold text-lg">{category}</h3>
                        <p className="text-muted-foreground text-sm">
                          {categoryDetails[category]?.description || "Description not available"}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
}
