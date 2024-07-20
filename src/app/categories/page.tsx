import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilterIcon, LayoutGridIcon } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Container } from "@chakra-ui/react";

const categories = [
  {
    name: "Clothing",
    description: "Shirts, pants, dresses, and more",
    image: "/placeholder.svg",
    alt: "Clothing Category",
  },
  {
    name: "Electronics",
    description: "Phones, laptops, TVs, and more",
    image: "/placeholder.svg",
    alt: "Electronics Category",
  },
  {
    name: "Home",
    description: "Furniture, decor, kitchen, and more",
    image: "/placeholder.svg",
    alt: "Home Category",
  },
  {
    name: "Outdoor",
    description: "Camping, gardening, and more",
    image: "/placeholder.svg",
    alt: "Outdoor Category",
  },
  {
    name: "Beauty",
    description: "Makeup, skincare, and more",
    image: "/placeholder.svg",
    alt: "Beauty Category",
  },
  {
    name: "Sports",
    description: "Fitness, equipment, and more",
    image: "/placeholder.svg",
    alt: "Sports Category",
  },
  {
    name: "Toys",
    description: "Games, puzzles, and more",
    image: "/placeholder.svg",
    alt: "Toys Category",
  },
  {
    name: "Pets",
    description: "Food, toys, and more",
    image: "/placeholder.svg",
    alt: "Pets Category",
  },
  {
    name: "Books",
    description: "Fiction, non-fiction, and more",
    image: "/placeholder.svg",
    alt: "Books Category",
  },
  {
    name: "Automotive",
    description: "Parts, accessories, and more",
    image: "/placeholder.svg",
    alt: "Automotive Category",
  },
];

export default function CategoriesPage() {
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
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>
                      Featured
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>On Sale</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      In Stock
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>
                      Price: Low to High
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Price: High to Low
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem>Newest</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>Oldest</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    <DropdownMenuCheckboxItem>Grid</DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>List</DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {categories.map((category, index) => (
                <div key={index} className="bg-background rounded-lg shadow-sm overflow-hidden">
                  <Link href="#" className="block" prefetch={false}>
                    <img
                      src={category.image}
                      alt={category.alt}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="p-4 space-y-2">
                      <h3 className="font-semibold text-lg">{category.name}</h3>
                      <p className="text-muted-foreground text-sm">
                        {category.description}
                      </p>
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
