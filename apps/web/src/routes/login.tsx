import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";
import { Brand } from "@/components/brand";

export const Route = createFileRoute("/login")({
  component: RouteComponent,
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
