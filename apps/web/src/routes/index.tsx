import Hero from "@/components/tailwind/hero";
import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/tailwind/header";

export const Route = createFileRoute("/")({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div>
      <Header />
      <Hero />
    </div>
  );
}
