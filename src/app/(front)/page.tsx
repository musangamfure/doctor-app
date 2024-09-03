import Brands from "@/components/frontend/Brands";
import Container from "@/components/frontend/Container";
import Hero from "@/components/frontend/Hero";
import TabledSection from "@/components/frontend/TabledSection";
import TabsComponent from "@/components/frontend/TabsComponent";

export default function Home() {
  return (
    <section className="">
      <Container className="bg-blue-950">
        <Hero />
      </Container>

      <Container className="bg-blue-100">
        <Brands />
      </Container>

      <Container>
        <TabledSection />
      </Container>
    </section>
  );
}
