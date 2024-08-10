"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Carousel } from "antd";

export default function Discover() {
  const router = useRouter();

  // Image data
  const images = [
    {
      src: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      alt: "Product Image 1",
      width: 400,
      height: 400,
    },
    {
      src: "https://i.ibb.co/bPmVXyP/black-converse.png",
      alt: "Product Image 2",
      width: 400,
      height: 400,
    },
  ];

  const handleClick = () => {
    router.push("/categories");
  };
  const handleShopClick = () => {
    router.push("/products");
  };

  return (
    <section className="py-20 md:py-16 lg:py-16" style={{
      paddingTop: "7rem",
      paddingBottom: "2rem",
}}>
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
              onClick={handleShopClick}
            >
              Shop Now
            </Button>
            <Button variant="outline" size="lg" onClick={handleClick}>
              Explore Categories
            </Button>
          </div>
        </div>
        <div className="w-full md:w-3/4 lg:w-1/2 mx-auto">
          <Carousel
            autoplay
            style={{
              borderRadius: "1rem",
              overflow: "hidden",
              margin: "10px auto",
              maxWidth: "400px",
            }}
          >
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image.src}
                  alt={image.alt}
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
