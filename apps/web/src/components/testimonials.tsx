import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { QuoteIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "This platform has completely transformed how we build and ship products. The performance gains alone made the switch worth it.",
    author: "Alex Morgan",
    role: "CTO at TechFlow",
    avatarSrc: "https://i.pravatar.cc/150?img=1",
    initials: "AM",
  },
  {
    quote:
      "We cut our development time in half and saw a 40% improvement in user engagement after implementing this solution.",
    author: "Sarah Chen",
    role: "Product Lead at Innovate Inc",
    avatarSrc: "https://i.pravatar.cc/150?img=5",
    initials: "SC",
  },
  {
    quote:
      "The developer experience is unmatched. Our team onboarding time went from weeks to days with their documentation and tooling.",
    author: "James Wilson",
    role: "Engineering Manager at DevCorp",
    avatarSrc: "https://i.pravatar.cc/150?img=12",
    initials: "JW",
  },
];

export default function Testimonials() {
  return (
    <div className="relative py-24 sm:py-32">
      {/* Subtle background with light pattern */}
      <div className="absolute inset-0 bg-muted/20 overflow-hidden">
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-[800px] w-[800px] rounded-full opacity-[0.03]"
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
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center justify-center rounded-full bg-muted/70 px-3 py-1 text-sm font-medium text-foreground border border-border mb-4">
            Customer testimonials
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by developers worldwide
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Don't just take our word for it — hear what our customers have to say about their
            experience.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group relative">
              {/* Subtle glow effect */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-20 blur-sm bg-gradient-to-br from-foreground/5 via-muted to-background transition-opacity group-hover:opacity-40"
                aria-hidden="true"
              />

              <Card className="relative rounded-xl border border-border bg-background/80 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-all duration-300 ease-in-out hover:shadow-none hover:translate-y-px hover:border-foreground/20">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <QuoteIcon className="h-8 w-8 text-foreground/10" aria-hidden="true" />
                      {/* Decorative circle behind quote */}
                      <span className="absolute inset-0 -m-1 rounded-full bg-gradient-to-br from-background via-muted/30 to-background blur-sm -z-10"></span>
                    </div>

                    <div className="flex-1 space-y-4">
                      <p className="text-base leading-7 text-foreground italic">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex items-center gap-3 pt-2 border-t border-border/40">
                        <Avatar className="h-10 w-10 ring-2 ring-foreground/5 border border-border shadow-sm">
                          <AvatarImage src={testimonial.avatarSrc} alt={testimonial.author} />
                          <AvatarFallback className="bg-muted text-foreground/80">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            {testimonial.author}
                          </p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Subtle corner ornamentation */}
                  <svg
                    className="absolute top-4 right-4 h-16 w-16 text-foreground/[0.02]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                      fill="currentColor"
                    />
                  </svg>

                  {/* Card number */}
                  <span className="absolute bottom-5 right-5 text-sm font-medium tabular-nums tracking-widest text-foreground/20">
                    /{(index + 1).toString().padStart(2, "0")}
                  </span>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
