import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ArrowRight, Sparkles, PlayCircle } from "lucide-react";
import { Link } from "react-router";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 sm:py-20 lg:pb-24 xl:pb-28">
      {/* Background gradient effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary/20 to-purple-600/20 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[300px] rounded-full bg-gradient-to-l from-blue-600/20 to-cyan-600/20 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-3 gap-1 text-[11px] font-normal animate-pulse">
            <Sparkles className="h-2.5 w-2.5" />
            AI-Powered Brand Monitoring • Trusted by 500+ brands
          </Badge>

          {/* Main Headline */}
          <h1 className="mt-4 text-3xl font-light tracking-tight sm:text-4xl lg:text-5xl">
            Get your company mentioned by{" "}
            <span className="font-medium text-primary">ChatGPT, Claude,</span> and other AI
            platforms
          </h1>

          {/* Subheadline with specific benefit */}
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg font-light">
            Join 500+ brands seeing{" "}
            <span className="font-medium text-foreground">3.4x more qualified traffic</span> from AI
            search engines. Monitor mentions and ensure your business stays top of mind.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="default"
              className="gap-2 text-xs font-medium px-5 border border-gray-900 dark:border-gray-100 hover:border-gray-700 dark:hover:border-gray-300 transition-all"
              asChild
            >
              <Link to="/register">
                Start free 7-day trial
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button
              size="default"
              variant="outline"
              className="gap-2 text-xs font-medium px-5"
              asChild
            >
              <Link to="/demo">
                <PlayCircle className="h-3.5 w-3.5" />
                Watch 2-min demo
              </Link>
            </Button>
          </div>

          {/* Social Proof Stats */}
          <div className="mt-8 flex items-center justify-center gap-8 text-center">
            <div>
              <p className="text-2xl font-light">500+</p>
              <p className="text-[11px] text-muted-foreground">Active brands</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-light">2M+</p>
              <p className="text-[11px] text-muted-foreground">AI mentions tracked</p>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-2xl font-light">87%</p>
              <p className="text-[11px] text-muted-foreground">Avg visibility boost</p>
            </div>
          </div>

          {/* Alternative CTA */}
          <p className="mt-6 text-xs text-muted-foreground font-light">
            No credit card required •{" "}
            <Link to="/demo" className="font-normal text-primary hover:underline">
              Book a demo
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
