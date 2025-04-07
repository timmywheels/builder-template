import { Activity, Zap, Shield, LineChart, Layers, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    name: "Performance Optimized",
    description:
      "Built for speed and efficiency from the ground up, ensuring your application runs at peak performance.",
    icon: Zap,
  },
  {
    name: "Advanced Analytics",
    description:
      "Gain insights with comprehensive analytics and data visualization tools to make informed decisions.",
    icon: LineChart,
  },
  {
    name: "Enterprise Security",
    description:
      "Enterprise-grade security with end-to-end encryption and advanced access controls to protect your data.",
    icon: Shield,
  },
  {
    name: "Seamless Integration",
    description:
      "Easily connect with your existing tools and services through our extensive API and plugin ecosystem.",
    icon: Layers,
  },
  {
    name: "Developer Friendly",
    description:
      "Built with developers in mind, featuring comprehensive documentation and customizable components.",
    icon: Code,
  },
  {
    name: "24/7 Monitoring",
    description:
      "Constant monitoring and automated alerts ensure your systems are always running smoothly.",
    icon: Activity,
  },
];

export default function Features() {
  return (
    <div className="relative py-24 sm:py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 h-[800px] w-[800px] rounded-full opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, currentColor 1px, transparent 1px),
              linear-gradient(to bottom, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-muted/70 px-3 py-1 text-sm font-medium text-foreground border border-border mb-4">
            Everything you need
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful features for modern SaaS
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Our platform provides all the tools you need to build, deploy, and scale your SaaS
            application with confidence.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={feature.name}
                className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-background/70 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 ease-in-out hover:shadow-none hover:translate-y-px hover:border-border/80"
              >
                {/* Top hairline border */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                <div className="p-6 grow flex flex-col">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-border/80 bg-background shadow-sm">
                    <feature.icon className="h-6 w-6 text-foreground/80" aria-hidden="true" />
                  </div>
                  <div className="flex flex-auto flex-col">
                    <h3 className="text-lg font-semibold leading-8 text-foreground">
                      {feature.name}
                    </h3>
                    <p className="mt-2 flex text-base leading-7 text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>

                  {/* Subtle corner detailing - top right */}
                  <svg
                    className="absolute top-4 right-4 h-8 w-8 text-muted-foreground/5"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 0C7.163 0 0 7.163 0 16C0 24.837 7.163 32 16 32C24.837 32 32 24.837 32 16C32 7.163 24.837 0 16 0ZM16 30C8.268 30 2 23.732 2 16C2 8.268 8.268 2 16 2C23.732 2 30 8.268 30 16C30 23.732 23.732 30 16 30Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Feature number */}
                  <span className="absolute bottom-4 right-4 text-4xl font-extrabold tabular-nums tracking-tight text-foreground/[0.015]">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
