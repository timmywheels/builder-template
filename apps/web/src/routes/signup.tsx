import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignupForm } from "@/components/signup-form";
import { Brand } from "@/components/brand";
import { z } from "zod";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
  validateSearch: z.object({
    pending: z.boolean().optional(),
  }),
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Brand />
        <SignupForm />
      </div>
    </div>
  );
}
