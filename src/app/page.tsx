import Category from "@/components/Category";
import Discover from "@/components/Discover";
import QuickOrder from "@/components/QuickOrder";
import TopProducts from "@/components/TopProducts";
import { Container } from "@chakra-ui/react";


export default function Home() {
  return (
    <Container maxW="container.xl">
      <Discover />
      <TopProducts />
      <Category />
      <QuickOrder />
    </Container>
  );
}
