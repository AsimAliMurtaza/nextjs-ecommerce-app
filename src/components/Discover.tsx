"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Carousel } from "antd";

export default function Discover() {
  const router = useRouter();

  // Image data
  const images = [
    { src: "/placeholder.svg", alt: "Product Image", width: 400, height: 400 },
    { src: "/placeholder.svg", alt: "Product Image", width: 400, height: 400 },
  ];

  const handleClick = () => {
    router.push("/categories");
  };

  return (
    <section className="py-20 md:py-16 lg:py-20">
      <div className="container grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Discover the Best Products for Your Lifestyle
          </h1>
          <p className="text-muted-foreground text-lg">
            Browse our curated collection of top-rated products across various
            categories.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              style={{
                backgroundColor: "#59B9B7",
              }}
            >
              Shop Now
            </Button>
            <Button variant="outline" size="lg" onClick={handleClick}>
              Explore Categories
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Carousel autoplay>
            {images.map((image, index) => (
              <div
                key={index}
                className={`col-span-2 ${
                  index === 0 ? "md:col-span-1" : "md:col-span-1"
                }`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className="rounded-lg object-cover w-full aspect-square"
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}
