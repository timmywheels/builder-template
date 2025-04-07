import { LoginForm } from "@/components/login-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { Brand } from "@/components/brand";
import { z } from "zod";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
  validateSearch: z.object({
    token: z.string().optional(),
    redirect: z.string().optional(),
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
        <LoginForm />
      </div>
    </div>
  );
}
