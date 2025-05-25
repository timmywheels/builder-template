import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import Icon from "@/assets/icon.svg";

// Logo cloud component with horizontal scrolling
function LogoCloud() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let startTime: number;

    const scroll = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Slow scroll speed - 10px per second
      const position = (elapsed / 100) % scrollContainer.scrollWidth;
      scrollContainer.scrollLeft = position;

      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden bg-muted/30 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-muted-foreground mb-6">
          Trusted by the world's leading AI companies
        </p>
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex space-x-12 overflow-x-auto pb-4 hide-scrollbar"
            style={{ scrollbarWidth: "none" }}
          >
            {/* These logos will scroll horizontally */}
            <Logo name="OpenAI" />
            <Logo name="Google DeepMind" />
            <Logo name="Anthropic" />
            <Logo name="Microsoft AI" />
            <Logo name="NVIDIA" />
            <Logo name="Hugging Face" />
            <Logo name="OpenAI" />
            <Logo name="Google DeepMind" />
            <Logo name="Anthropic" />
            <Logo name="Microsoft AI" />
            <Logo name="NVIDIA" />
            <Logo name="Hugging Face" />
          </div>

          {/* Gradient fades on edges */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
        </div>
      </div>
    </div>
  );
}

// Simple logo placeholder
function Logo({ name }: { name: string }) {
  return (
    <div className="flex h-16 w-40 flex-none items-center justify-center rounded-lg border border-border bg-background px-4 transition-colors hover:border-muted-foreground/20">
      <span className="text-sm font-medium text-muted-foreground">{name}</span>
    </div>
  );
}

export default function Hero() {
  return (
    <>
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
            <div className="flex items-center justify-center">
              <img src={Icon} alt="icon" className="h-36 w-36" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              This changes everything
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

      {/* Logo cloud section */}
      <LogoCloud />
    </>
  );
}
