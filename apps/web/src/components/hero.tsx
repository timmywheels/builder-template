import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative bg-background py-24 sm:py-32">
      {/* Circular grid paper pattern in the center with faded edges */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div
          className="absolute h-[800px] w-[800px] rounded-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
            mask: "radial-gradient(circle, black 40%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            A better way to build your SaaS
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Streamline your development process, improve collaboration, and launch faster with our
            all-in-one platform designed specifically for modern SaaS businesses.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="gap-2 shadow-sm">
              Get started
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="shadow-sm">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
