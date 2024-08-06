'use client';
// Import necessary components and data
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilterIcon, LayoutGridIcon } from "@/components/ui/icons";
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
import { useState } from "react";
import SHOP_DATA from "@/shop_data"; // Adjust the path according to your project structure

// Define the type for product data
interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  description?: string; // Optional if not every product has a description
  category: string;
  date?: string; // Optional property for date
  stock: number; // Number of items in stock
  onSale: boolean; // Indicates if the product is on sale
  featured: boolean; // Indicates if the product is featured
}


// Extract unique categories from SHOP_DATA
const getUniqueCategories = (products: Product[]) => {
  const categoriesSet = new Set(products.map((product) => product.category));
  return Array.from(categoriesSet);
};

// Get representative product details for each category
const getCategoryDetails = (products: Product[], categories: string[]) => {
  const details: Record<string, { imageUrl: string; description: string }> = {};

  categories.forEach((category) => {
    const categoryProducts = products.filter((product) => product.category === category);
    if (categoryProducts.length > 0) {
      details[category] = {
        imageUrl: categoryProducts[0].imageUrl, // Use the first product's image for simplicity
        description: categoryProducts[0].description || "Description not available",
      };
    }
  });

  return details;
};

export default function CategoriesPage() {
  // State for view mode
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Get unique categories from SHOP_DATA
  const uniqueCategories = getUniqueCategories(SHOP_DATA);

  // Get category details
  const categoryDetails = getCategoryDetails(SHOP_DATA, uniqueCategories);

  return (
    <Container maxW="container.xl">
      <main className="flex-1">
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
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
              {uniqueCategories.map((category) => (
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
                        <img
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
                        <img
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
