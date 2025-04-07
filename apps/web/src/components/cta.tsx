import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  {
    title: "90%",
    description: "Faster development time",
  },
  {
    title: "24/7",
    description: "Dedicated support",
  },
  {
    title: "99.9%",
    description: "Uptime guarantee",
  },
];

export default function CTA() {
  return (
    <section className="relative py-24 sm:py-32 bg-foreground text-background">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Elegant top edge instead of scalloped border */}
      <div className="absolute top-0 inset-x-0 h-px w-full overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-background/30 to-transparent"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-40 h-px bg-background/40 blur-sm"></div>
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-16 h-px bg-background/60"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative mx-auto max-w-5xl">
          {/* Decorative elements */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 -top-16 flex justify-center transform blur-sm opacity-30 mix-blend-overlay"
          >
            <div className="h-px w-1/2 bg-gradient-to-r from-transparent via-background to-transparent"></div>
          </div>

          <div className="relative lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
            <div className="lg:pr-8">
              <div className="max-w-xl text-center sm:text-left">
                <span className="inline-flex items-center rounded-full border border-background/30 px-3 py-1 text-xs font-medium bg-background/10 backdrop-blur-sm mb-4">
                  Limited time offer
                </span>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Ready to boost your productivity?
                </h2>
                <p className="mt-6 text-lg leading-8 text-background/80">
                  Start building better SaaS applications today. Get started with our platform and
                  join thousands of developers worldwide.
                </p>

                {/* Feature list */}
                <div className="mt-8 space-y-3">
                  {["No credit card required", "Cancel anytime", "Free 14-day trial"].map(
                    (feature) => (
                      <div key={feature} className="flex items-center gap-2.5">
                        <CheckCircle
                          className="h-5 w-5 flex-none text-background/70"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium">{feature}</span>
                      </div>
                    )
                  )}
                </div>

                <div className="mt-10 flex items-center gap-x-6">
                  <Button
                    className="gap-2 relative overflow-hidden group bg-background text-foreground hover:bg-background/90"
                    size="lg"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Get started
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </span>
                  </Button>
                  <Button variant="link" size="lg" className="text-primary-foreground">
                    Contact sales
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats cards with refined styling */}
            <div className="mt-16 grid gap-5 sm:mt-20 lg:mt-8 lg:flex-none">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-background/20 backdrop-blur-sm p-8 flex flex-col justify-center bg-gradient-to-br from-background/[0.08] to-transparent">
                <div
                  className="absolute inset-0 -left-48 -top-48 opacity-20"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
                    width: "200%",
                    height: "200%",
                  }}
                />

                <div className="relative flex flex-col items-center text-center">
                  {benefits.map((stat, index) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <div className="flex items-center justify-center">
                        <span className="flex flex-col">
                          <span className="text-5xl font-bold tracking-tight tabular-nums">
                            {stat.title}
                          </span>
                          <span className="mt-1 text-base font-medium text-background/70">
                            {stat.description}
                          </span>
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Decorative elements */}
                  <svg
                    className="absolute bottom-2 right-2 h-24 w-24 text-background/[0.03]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.306 0L9.306 24M0 9.306L24 9.306"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative bottom edge */}
      <div className="absolute bottom-0 inset-x-0 h-12 bg-background/[0.02]">
        <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-background/20 to-transparent"></div>
      </div>
    </section>
  );
}
