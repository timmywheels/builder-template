import Hero from "@/components/hero";
import Features from "@/components/features";
import Testimonials from "@/components/testimonials";
import CTA from "@/components/cta";
import Footer from "@/components/footer";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <Header />
      <Hero />
      <Features />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
