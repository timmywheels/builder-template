import { AuthState } from "@/lib/auth";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";

interface AppContext {
  auth: AuthState;
}

export const Route = createRootRouteWithContext<AppContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
