import DoctorList from "@/components/frontend/DoctorList";
import Brands from "@/components/frontend/Brands";
import Container from "@/components/frontend/Container";
import Hero from "@/components/frontend/Hero";
import TabledSection from "@/components/frontend/TabledSection";

export default function Home() {
  return (
    <section className="">
      <Container className="bg-blue-950  dark:bg-slate-950">
        <Hero />
      </Container>

      <Container className="bg-blue-100 dark:bg-neutral-900">
        <Brands />
      </Container>

      <Container className=" dark:bg-slate-950">
        <TabledSection />
      </Container>
      <Container className="bg-blue-100 p-8 lg:p-24 dark:bg-neutral-900">
        <DoctorList title="Telehealth Visit" isInPersonal={false} />
      </Container>
      <Container className=" p-8 lg:p-24 dark:bg-slate-950">
        <DoctorList title="In-Person Doctors Visit" isInPersonal={true} />
      </Container>
    </section>
  );
}
