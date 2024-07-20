import Link from "next/link";
import {
  LaptopIcon,
  ClubIcon,
  CaravanIcon,
  PaintbrushIcon,
  ShirtIcon,
  HomeIcon,
} from "./ui/icons";

export default function Category() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Shop by Category</h2>
          <Link
            href="/categories"
            className="text-primary hover:underline"
            prefetch={false}
          >
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <ShirtIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Clothing</span>
          </Link>
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <LaptopIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Electronics</span>
          </Link>
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <HomeIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Home</span>
          </Link>
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <PaintbrushIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Beauty</span>
          </Link>
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <ClubIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Sports</span>
          </Link>
          <Link
            href="#"
            className="bg-background rounded-lg shadow-sm overflow-hidden flex flex-col items-center justify-center gap-2 p-4 hover:bg-accent hover:text-accent-foreground transition-colors"
            prefetch={false}
          >
            <CaravanIcon className="h-8 w-8" />
            <span className="font-medium text-sm">Outdoor</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
