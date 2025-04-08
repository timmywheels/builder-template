import { createFileRoute } from "@tanstack/react-router";
import { ForgotPasswordForm } from "@/components/forgot-password-form";
import { Brand } from "@/components/brand";
import { z } from "zod";

export const Route = createFileRoute("/forgot-password")({
  component: RouteComponent,
  validateSearch: z.object({
    pending: z.boolean().optional(),
  }),
});

function RouteComponent() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Brand />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
