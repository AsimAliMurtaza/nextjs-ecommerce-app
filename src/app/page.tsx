"use client";
import Category from "@/components/Category";
import Discover from "@/components/Discover";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import QuickOrder from "@/components/QuickOrder";
import TopProducts from "@/components/TopProducts";
import { Container } from "@chakra-ui/react";

export default function Home() {
  return (
    <div >
      <Container maxW="container.xl">
        <Discover />
        <TopProducts />
        <Category />
        <QuickOrder />
        <Newsletter />
      </Container>
      <Footer />
    </div>
  );
}
